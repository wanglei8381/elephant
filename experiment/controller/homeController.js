import {
  Controller,
  RequestMapping
} from '../spring'

@Controller
@RequestMapping('/')
class HomeController {
  @RequestMapping('home')
  index (cxt) {
    cxt.body = JSON.stringify({
      "data": 'home',
      "success": true,
      "message": null,
      "code": "200"
    })
  }
}