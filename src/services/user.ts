// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
export async function getUserInfo(options?: { [key: string]: any }) {
    return request<API.UserResult>('/api/management/users/getUserInfoDetail', {
        method: 'GET',
        ...(options || {}),
    });
}