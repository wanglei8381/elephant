import WebSocket from 'ws'
import http from 'http'
import url from 'url'
import Client from './client'

class WebSocketServer {
  constructor (callback) {
    this.port = process.env.PORT || '3000'
    this.http = http.createServer(callback)
    this.io = new WebSocket.Server({ server: this.http })
    this.io.on('connection', (socket, req) => {
      // const location = url.parse(req.url, true)
      console.log('connection')
      new Client(socket)
    })
  }

  start () {
    this.http.listen(this.port)
  }
}

export default WebSocketServer