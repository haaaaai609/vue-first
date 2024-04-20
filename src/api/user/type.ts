// 用户登录接口携带数据类型
export interface loginDataForm {
  username: string;
  password: string;
}
// 所有接口返回数据ts类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
// 登录接口返回数据类型
export interface loginResponsedata extends ResponseData {
  data: string;
}

// 获取用户信息接口返回数据类型
export interface UserInfoResData extends ResponseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}
