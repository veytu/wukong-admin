import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Radio, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { queryList } from './service';

const ExceptionIssueTicket: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const [position, setPosition] = useState<'start' | 'end'>('start');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const handleDetail = (record) => {

    }

    const columns: ProColumns<ExceptionMockData>[] = [
        {
            title: "教室号",
            dataIndex: 'classroomId',
            valueType: 'textarea',
            hideInTable: true,
        },
        {
            title: "异常问题类型",
            dataIndex: 'issueType',
            ellipsis: false,
            valueEnum: {
                1: {
                    text: "我的音视频卡",
                    status: 'Processing',
                },
                2: {
                    text: "他人音视频",
                    status: 'Success',
                },
                3: {
                    text: "课件问题",
                    status: 'Error',
                },
                4: {
                    text: "网络问题",
                    status: 'Error',
                },
                5: {
                    text: "麦克风/摄像头问题",
                    status: 'Error',
                },
            },
        },
        {
            title: "处理状态",
            dataIndex: 'status',
            valueEnum: {
                1: {
                    text: "待认领",
                    status: 'Processing',
                },
                2: {
                    text: "未解决",
                    status: 'Success',
                },
                3: {
                    text: "已解决",
                    status: 'Error',
                },
                4: {
                    text: "处理中",
                    status: 'Error',
                },
                5: {
                    text: "已逾期",
                    status: 'Error',
                },
                6: {
                    text: "无效",
                    status: 'Error',
                },
            },
        },
        {
            title: "异常问题描述",
            dataIndex: 'issueDescription',
            valueType: 'textarea',
        },
        {
            title: "提交时间",
            dataIndex: 'submissionTime',
            valueType: 'textarea',
            search: false,
        },
        {
            title: "提交人",
            dataIndex: 'submitter',
            valueType: 'textarea',
            search: false,
        },
        {
            title: "主播信息",
            dataIndex: 'anchorInfo',
            valueType: 'textarea',
            search: false,

        },
        {
            title: "观众信息",
            dataIndex: 'audienceInfo',
            valueType: 'textarea',
            search: false,
        },
        {
            title: "教室信息",
            dataIndex: 'classroomInfo',
            valueType: 'textarea',
            search: false,
        },
        {
            title: "图片",
            dataIndex: 'image',
            valueType: 'image',
            search: false,
        },
        {
            title: "处理人",
            dataIndex: 'handler',
            valueType: 'textarea',
            search: false,
        },
        {
            title: "备注",
            dataIndex: 'remarks',
            valueType: 'textarea',
            search: false,
        },
        {
            title: "时间范围",
            dataIndex: 'updatedAt',
            valueType: 'dateRange',
            hideInTable: true,
        },
        {
            title: "操作",
            dataIndex: 'option',
            valueType: 'option',
            fixed: 'right',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        handleDetail(record);
                    }}
                >
                    查看详情
                </a>,
                <a key="classSet">
                    认领
                </a>,
            ],
        },
    ];
    const handleBatchClaim = () => {

    }
    const handleExport = () => {

    }

    const handleSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    return (
        <PageContainer>
            <ProTable<ExceptionMockData, API.PageParams>
                headerTitle={<Space>
                    <Radio.Group buttonStyle="solid" value={position} onChange={(e) => setPosition(e.target.value)}>
                        <Radio.Button value="start"> 工单列表</Radio.Button>
                        <Radio.Button value="end"> 我的工单</Radio.Button>
                    </Radio.Group>
                </Space>}
                actionRef={actionRef}
                rowKey="key"
                scroll={{ x: 1000 }}
                search={{
                    labelWidth: 100,
                    defaultCollapsed: false,
                }}
                toolBarRender={() => [
                    <Button
                        key="claim"
                        type='primary'
                        onClick={() => {
                            handleBatchClaim();
                        }}
                    >
                        批量认领
                    </Button>,
                    <Button
                        key="export"
                        onClick={() => {
                            handleExport();
                        }}
                    >
                        <VerticalAlignBottomOutlined />导出
                    </Button>,
                ]}
                rowSelection={{
                    selectedRowKeys,
                    onChange: handleSelectChange,
                }}
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

export default ExceptionIssueTicket;
