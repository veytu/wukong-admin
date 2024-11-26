import { request } from '@umijs/max';

export async function queryList(
    params: {
        // query
        /** 当前的页码 */
        current?: number;
        /** 页面的容量 */
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return request<ClassroomManagement.DataList>('/api/management/room/getRoomList', {
        method: 'GET',
        params: {
            ...params,
            pageSize: params.pageSize,
            pageIndex: params.current
        },
        ...(options || {}),
    });
}


export async function addClassRoom(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/management/room/createRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}