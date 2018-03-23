import Router from 'koa-router'
import api, { admin } from './controller/api'
import view from './controller/view'
import cache, { cacheAsset } from './controller/cache'

const router = new Router()

router.post('/api/search', api);

router.get('/view', view);
router.get('/cache', cache);
router.get('/cache/:filename', cacheAsset);

// :id ctx.params中取值，?可以标示是否可以省略
router.get('/app/:id?', function (ctx, next) {
  console.log(ctx.params)
  ctx.body = Object.assign({ code: 200 }, ctx.params, {app: 1})
  // 调用后续的匹配的路由
  return next()
})

router.get('/app/(.*)', function (ctx) {
  ctx.body = Object.assign({ status: 'ok' }, ctx.body, {app: 2})
})

// router.post('/admin/setting/hasAlreadySetting', admin);

export default router

