import { request } from '@umijs/max';

export async function queryList() {
    return request('/api/monitor/list');
}
