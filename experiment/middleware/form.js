let parse = require('co-body');

module.exports = function* parseBody(next) {
    console.log(this.method);
    if ('POST' !== this.method) return yield next;
    let body = yield parse(this, {limit: '1kb'});
    this.req.body = body;
    yield next;
}