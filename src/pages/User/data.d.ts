declare namespace API {

  type ApiResponse<T> = {
    code?: number;      // 状态码
    message?: string;   // 消息描述
    data?: T;           // 响应数据
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
  };

  type CaptchaData = {
    imageUrl?: string;
    token?: string;
  };

  type CaptchaResult = ApiResponse<CaptchaData>;

  type LoginParams = {
    username?: string;
    password?: string;
    captcha?: string;
    captchaToken?: string;
  };

  type UserData = {
    userId: string;
    username: string;
    email: string;
  };

  type LoginResult = ApiResponse<UserData>;

}
