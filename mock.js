// import Mock from 'mockjs'
let Mock = require('mockjs')
let mocktitles = new Array(7).fill().map(function(){ return Mock.Random.title(1,7) })
let mockAvatars = new Array(10).fill().map(v => Mock.Random.image())
Mock.Random.extend({
  mytitles: mocktitles,
  mytitle: function(date){
      return this.pick(this.mytitles)
  }
})
Mock.Random.extend({
  myImgs: mockAvatars,
  myImg: function(date){
      return this.pick(this.myImgs)
  }
})

var data = Mock.mock(/\/api\.*/, req => {
  console.log(req)
  let { url } = req
  let queryStr = url.replace(/.*\?/, '')
  let queryObj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')))
  let { page, num = 1 } = queryObj
  if (num < 0 || !num) { num = 1 }
  let key = `data|${num}`
  console.log(key)
  return Mock.mock({
    'status': 0,
    [key]: [
      {
        'tid|+1': 1,
        'title': '@mytitle',
        'catalog': 'index',
        'fav|20-30000': 0,
        'created': '@date("yyyy-MM-dd HH:mm:ss")',
        'isEnd': 0,
        'answer|1-100': 0,
        'user': {
          'avatar': '@myImg',
          'name': '@cname',
          "isVip": "1",
          "level|0-10": 0
        }
      }
    ]
  })
})

console.log('test', data)

export default data