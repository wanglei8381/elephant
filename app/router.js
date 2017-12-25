import Router from 'koa-router'
import api, { admin } from './controller/api'
import view from './controller/view'
import cache, { cacheAsset } from './controller/cache'

const router = new Router()

router.post('/api/search', api);

router.get('/view', view);
router.get('/cache', cache);
router.get('/cache/:filename', cacheAsset);

// router.post('/admin/setting/hasAlreadySetting', admin);

export default router

