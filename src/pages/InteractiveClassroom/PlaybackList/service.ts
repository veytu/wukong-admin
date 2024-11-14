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
    return request<PlaybackList.DataList>('/api/playbacklist/list', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}