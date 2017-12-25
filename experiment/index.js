import Koa from 'koa'
import session from 'koa-session'
import config from './config'
import router from './spring'
import views from 'koa-views'
import bodyParser from 'koa-bodyparser'
import middleware from './middleware'
import './controller'

let app = new Koa();

app.keys = config.keys;
app.use(session({
  prefix: 'koa:sess:',
  key: 'sid',
  maxAge: 30 * 60 * 1000
}, app));

app.use(bodyParser());

// 添加中间件
middleware(app);

app.use(views(__dirname + '/views', { extension: 'hbs', map: { hbs: 'handlebars' } }));

// 添加路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port);

app.on('error', function (err) {
  if (process.env.NODE_ENV !== 'development') {
    console.log('sent error %s to the cloud', err.message);
    console.log(err);
  }
});

module.exports = app;

