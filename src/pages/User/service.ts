// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/management/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getCaptcha() {
  return request<API.CaptchaResult>('/api/management/captcha', {
    method: 'GET',
  });
}


export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}


