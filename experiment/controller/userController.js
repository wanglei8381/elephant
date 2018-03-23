import {
  Controller,
  RequestMapping
} from '../spring'

@Controller
@RequestMapping('/user')
class UserController {

  constructor () {
    this.name = 'user'
  }

  @RequestMapping('/login')
  async login (cxt) {
    console.log(this.name)
    cxt.body = await getUser()
  }

  @RequestMapping('/:id')
  getUser (cxt) {
    this.name = 'hello'
    cxt.body = JSON.stringify({
      'data': true,
      'success': true,
      'message': null,
      'code': '200'
    })
  }
}

function getUser () {
  return new Promise((resolve, reject) => {
    resolve(JSON.stringify({
      'data': true,
      'success': true,
      'message': null,
      'code': '200'
    }))
  })
}