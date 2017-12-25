import fs from 'fs'
const zlib = require('zlib')
const contentTypes = require("./content-type.json")
import etag from 'etag'
import path from 'path'
const util = require('util')
const stat = util.promisify(fs.stat)
const readFile = util.promisify(fs.readFile)
const etagCache = {}
export default async function (ctx) {
  const body = await readFile(path.resolve(__dirname, '../files/page.html'))
  ctx.body = body.toString()
}

export async function cacheAsset (ctx) {
  const filePath = path.resolve(__dirname, '../files/' + ctx.params.filename)
  const fileType = path.extname(filePath).replace(/^\./, '')
  console.log('--------->>>>cache')

  const modifiedSince = ctx.get('If-Modified-Since')
  const noneMatch = ctx.get('If-None-Match')
  const stats = await stat(filePath)
  if (etagCache[filePath] !== noneMatch || modifiedSince !== stats.ctime.toUTCString()) {
    console.log('----update-----')
    // const body = await readFile(filePath, 'binary')
    const raw = fs.createReadStream(filePath)
    ctx.body = raw.pipe(zlib.createGzip())
    // ETag的值，默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行base64后得到的
    etagCache[filePath] = etag(stats.ino + stats.size + stats.mtime)
  } else {
    ctx.status = 304
  }

  if (fileType && contentTypes[fileType]) {
    ctx.set('Content-Type', contentTypes[fileType])
  } else {
    ctx.set('Content-Type', 'text/html')
  }
  ctx.set('Content-Encoding', 'gzip')
  ctx.set('Last-Modified', new Date(stats.ctime).toUTCString())
  ctx.set('Expires', new Date(Date.now() + 1000 * 60 * 60 * 24 * 3 /* 3天 */).toUTCString())
  ctx.set('Cache-Control', 'max-age=' + 60 * 60 * 24 * 3 /* 3天 */)
  ctx.set('ETag', etagCache[filePath])

  console.log('----End----')
}

function byFilename (filename) {
  return contentTypes[path.extname(filename).replace(/^\./, "")]
}