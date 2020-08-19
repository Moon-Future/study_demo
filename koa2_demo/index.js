const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()

router.get('/getName', async (ctx) => {
  let { callback } = ctx.request.query
  ctx.body = `${callback}("Leon")`
})

app.use(router.routes())

// app.use(async ctx => {
//   ctx.body = 'Hello World'
// })

app.listen(3000, () => {
  console.log('listen at port 3000...')
})
