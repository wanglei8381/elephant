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

  @RequestMapping('/:id')
  getUser (cxt) {
    cxt.body = JSON.stringify({
      "data": true,
      "success": true,
      "message": null,
      "code": "200"
    })
  }
}