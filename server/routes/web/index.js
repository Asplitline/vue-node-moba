module.exports = app => {
    const Category = require('../../models/Category')
    const Article = require('../../models/Article')
    const router = require('express').Router()
    router.get('/news/init', async (req, res) => {
        const rowNewsTitle = [
            "狄某有话说｜中路水太深，你把握不住",
            "峡谷甜蜜520，周瑜小乔最新情侣皮肤送不停",
            "甄姬-冰雪圆舞曲优化海报票选活动开启",
            "老亚瑟的答疑时间：甄姬-冰雪圆舞曲优化设计稿、青白蛇重做后续计划公布",
            "小乔周瑜新皮肤抢先直播测评！更有百套新皮肤在线抽送",
            "5月21日全服不停机更新公告",
            "体验服专区福利升级，专区功能恢复使用公告",
            "5月20日部分活动入口显示异常说明公告",
            "5月20日动作异常说明公告",
            "5月20日周瑜“音你心动”皮肤局内特效异常说明",
            "音乐扭蛋机活动限时上线",
            "【微信用户专属】“游戏礼品站”购买“周瑜-音你心动“/“小乔-音你心动”抽免单",
            "【助力5:20-音乐制作人】活动公告",
            "甜蜜时光携手共度，音你心动爱在峡谷",
            "“初夏超值福利卡”活动公告",
            "看决赛直播赢好礼！全国大赛合作赛道—CEST春季总决赛，4强开战",
            "十六强集结，骚白战队首亮相！斗鱼大师赛S3精彩揭幕",
            "四周超四万人报名，女选手当仁不让!全国大赛合作赛道海选赛数据回顾",
            "赛点搬到家门口|第三届王者荣耀全国大赛城市赛道盛况空前，王者人生助力全民绽放电竞",
            "集合，目标武汉总决赛！全国大赛城市赛道第一期晋级资格赛战队巡礼"
        ]
        const parent = await Category.findOne({ name: '新闻分类' })
        // lean() - result to JsObject
        const categories = await Category.find().where({ parent: parent }).lean()
        const newsList = rowNewsTitle.map(i => {
            const c = categories.slice(0).sort(() => Math.random() - 0.5)
            return {
                title: i,
                categories: c.slice(0, 2)
            }
        })
        // await Article.deleteMany({})
        // await Article.insertMany(newsList)
        res.send()
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
    app.use('/web/api', router)
}