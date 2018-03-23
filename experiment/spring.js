import Router from 'koa-router'
const routerMap = new Map()
const router = new Router()
export function Controller (target) {
  const basePath = target.__basePath || '/'
  for (let [key, value] of routerMap) {
    if (key.constructor === target) {
      value.forEach(({ path, method, controller }) => {
        const url = (basePath + path).replace(/\/(\/)+/g, '/')
        router[method](url, controller)
      })
      break;
    }
  }
}

export function RequestMapping (path, method = 'get') {
  return function (target, key) {
    const stack = routerMap.get(target) || []
    if (key) {
      stack.push({
        path,
        method,
        controller: target[key].bind(target)
      })
      routerMap.set(target, stack)
    } else {
      // 修饰类
      target.__basePath = path
      target.__baseMethod = method
    }
  }
}

export default router