// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
export async function getUserInfo(options?: { [key: string]: any }) {
    return request<API.CurrentUser>('/api/currentUser', {
        method: 'GET',
        ...(options || {}),
    });
}