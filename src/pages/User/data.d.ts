declare namespace API {

  type ApiResponse<T> = {
    code?: number;      // 状态码
    message?: string;   // 消息描述
    data?: T;           // 响应数据
    timestamp?: number
  };


  type CurrentUser = {
    userName: string,
    userId: string,
    token: string,
    avatar?: string,
    roleResponseList: any[]
  }
  type UserResult = ApiResponse<CurrentUser>

  type CaptchaData = {
    imageUrl?: string;
    token?: string;
  };

  type CaptchaResult = ApiResponse<CaptchaData>;

  type LoginParams = {
    userName?: string;
    password?: string;
    captcha?: string;
    captchaToken?: string;
  };

  type Permission = {
    permissionId: string;
    permissionName: string;
    description: string;
  };

  type Role = {
    roleId: string;
    roleName: string;
    description: string;
    permissions: Permission[];
  };

  type UserData = {
    userName: string;
    userId: string;
    token: string | null;
    roleResponseList: Role[];
  };

  type LoginResult = ApiResponse<UserData>;

}
