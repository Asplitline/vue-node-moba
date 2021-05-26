module.exports = app => {
    const Category = require('../../models/Category')
    const Article = require('../../models/Article')
    const Hero = require('../../models/Hero')
    const router = require('express').Router()
    /**
     * 导入新闻书籍
     */
    router.get('/news/init', async (req, res) => {
        const _ = require('./data').news
        const parent = await Category.findOne({ name: '新闻分类' })
        // lean() - result to JsObject
        const categories = await Category.find().where({ parent: parent }).lean()
        const newsList = _.map(i => {
            const c = categories.slice(0).sort(() => Math.random() - 0.5)
            return {
                title: i,
                categories: c.slice(0, 2)
            }
        })
        // await Article.deleteMany({})
        // await Article.insertMany(newsList)
        res.send(newsList)
    })

    router.get('/news/list', async (req, res) => {
        /* tag 联合查询
         * 通过 virtual 实现联合查询
         * children - 先查分类下子分类
         * newsList - 根据子分类查文章
         * 缺陷：不能指定具体文章数
         */
        /* const parent = await Category.findOne({
            name: '新闻分类'
        }).populate({
            path: 'children',
            populate: { path: 'newsList' }
        }).lean()
        res.send(parent) */
        /* tag 聚合查询
         */
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },
            {
                /* tag
                 * from - 查询集合名
                 * localField
                 * foreignField
                 * as - 输出字段
                 */
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                // 增加 字段 newsList -> 获取$newsList前5个
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])
        // 热门文章
        const subCats = cats.map(i => i._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate('categories').limit(5).lean()
        })
        cats.map(cat => {
            return cat.newsList.map(news => {
                news.categoryName = (cat.name === '热门') ?
                    news.categories[0].name : cat.name
                return news
            })
            // return cat
        })
        res.send(cats)
    })
    /**
     * 导入英雄数据
     */
    router.get('/heroes/init', async (req, res) => {
        await Hero.deleteMany({})
        const _ = require('./data').heroes
        for (const val of _) {
            if (val.name === '热门') continue
            const category = await Category.findOne({ name: val.name })
            val.heroes.map(hero => {
                hero.categories = [category._id]
                return hero
            })
            await Hero.insertMany(val.heroes.slice(1))
        }
        res.send(await Hero.find({}))
    })

    router.get('/heroes/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '英雄分类'
        })
        const cats = await Category.aggregate(
            [
                { $match: { parent: parent._id } },
                {
                    $lookup: {
                        from: 'heroes',
                        localField: '_id',
                        foreignField: 'categories',
                        as: 'heroList'
                    }
                }
            ],

        )
        const subCats = cats.map(i => i._id)
        cats.unshift({
            name: '热门',
            heroList: await Hero.find().where({
                categories: { $in: subCats }
            }).limit(10).lean()
        })
        res.send(cats)
    })

    /**
     * 文章详情
     */
    router.get('/article/:id', async (req, res) => {
        const data = await Article.findById({ _id: req.params.id }).lean()
        data.related = await Article.find().where({ categories: { $in: data.categories } }).limit(2)
        res.send(data)
    })
    app.use('/web/api', router)
}