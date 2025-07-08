export const SUCCESS_MSG = 'success';
export const TOKEN_INVALID_CODE = 10002;
export const SUCCESS_CODE = 200;

export const CODE_TO_MSG: Recordable<string> = {
  200: SUCCESS_MSG,
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',

  10001: '用户名或密码错误',
  10002: '登录无效，请重新登录',
  10003: '无操作权限，请联系管理员',

  23505: '当前记录已存在',
};
