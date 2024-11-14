import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Radio, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { queryList } from './service';

const PlaybackList: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const [position, setPosition] = useState<'start' | 'end'>('start');
    const handlePlay = (record) => {

    }
    const columns: ProColumns<PlaybackListMockData>[] = [
        {
            title: "上课时间",
            dataIndex: 'classTime',
            valueType: 'dateRange',
            hideInTable: true,
        },
        {
            title: "教室号",
            dataIndex: 'classroomId',
            valueType: 'text',
        },
        {
            title: "状态",
            dataIndex: 'status',
            hideInTable: true,
            valueEnum: {
                1: {
                    text: "正常",
                    status: 'Processing',
                },
                2: {
                    text: "归档激活中",
                    status: 'Success',
                },
                3: {
                    text: "归档完成",
                    status: 'Error',
                },
            },
        },
        {
            title: '教室名称',
            dataIndex: 'classroomName',
            search: false,
        },
        {
            title: '录制类型',
            dataIndex: 'recordingType',
            search: false,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            search: false,
        },
        {
            title: '文件大小',
            dataIndex: 'fileSize',
            search: false,
        },
        {
            title: '时长',
            dataIndex: 'duration',
            search: false,
        },
        {
            title: "操作",
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="play"
                    onClick={() => {
                        handlePlay(record);
                    }}
                >
                    播放
                </a>,
                <a key="copy">
                    复制链接
                </a>,
            ],
        },
    ];


    return (
        <PageContainer>
            <ProTable<PlaybackListMockData, API.PageParams>
                headerTitle={"回放查询"}
                actionRef={actionRef}
                rowKey="key"
                search={{
                    labelWidth: 80,
                    defaultCollapsed: false,
                }}
                size="small"
                options={{
                    setting: false,
                    density: false,
                }}
                request={queryList}
                columns={columns}

            />
        </PageContainer>
    );
};

export default PlaybackList;
