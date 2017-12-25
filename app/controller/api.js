export default async (cxt, next) => {
  cxt.body = JSON.stringify({ code: 2000, msg: 'ok' })
};

export const admin = async (cxt, next) => {
  cxt.body = JSON.stringify({
    "data": true,
    "success": true,
    "message": null,
    "code": "200"
  })
};