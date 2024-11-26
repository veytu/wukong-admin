declare namespace API {

  type ApiResponse<T> = {
    code?: number;      // 状态码
    message?: string;   // 消息描述
    data?: T;           // 响应数据
    timestamp?: number
  };


  type CurrentUser = {
    data: any,
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  }

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
