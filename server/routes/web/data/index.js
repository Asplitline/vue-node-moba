/*
    $$('.news_list .title').map(i=>i.innerHTML).slice(5)
 */

const news = require('./news.json')

/*
   $$(".hero-nav li").map((li,i)=>{
    return {
        name:li.innerText,
        heroes:$$('li',$$('.hero-list')[i]).map(v=>{
            return {
                avatar:$$('img',v)[0].src,
                name:$$('h3',v)[0].innerHTML
            }
        })
    }
    }) 
*/
const heroes = require('./heroes.json')

module.exports = {
    news,
    heroes
}
