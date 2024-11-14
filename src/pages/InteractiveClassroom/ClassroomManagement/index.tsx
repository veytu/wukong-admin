import { addRule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
    ModalForm,
    PageContainer,
    ProFormText,
    ProFormTextArea,
    ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { queryList } from './service';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: ClassroomManagement.ClassroomManagementMockData) => {
    const hide = message.loading('正在添加');
    try {
        await addRule({ ...fields });
        hide();
        message.success('Added successfully');
        return true;
    } catch (error) {
        hide();
        message.error('Adding failed, please try again!');
        return false;
    }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');
    try {
        await updateRule({
            name: fields.name,
            desc: fields.desc,
            key: fields.key,
        });
        hide();

        message.success('Configuration is successful');
        return true;
    } catch (error) {
        hide();
        message.error('Configuration failed, please try again!');
        return false;
    }
};


const TableList: React.FC = () => {

    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
    const [showDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<ClassroomManagement.ClassroomManagementMockData>();
    const intl = useIntl();

    const columns: ProColumns<ClassroomManagement.ClassroomManagementMockData>[] = [
        {
            title: "状态",
            dataIndex: 'status',
            hideInTable: true,
            valueEnum: {
                0: {
                    text: "有效期内的",
                    status: 'Processing',
                },
                1: {
                    text: "未来的",
                    status: 'Success',
                },
                2: {
                    text: "已过期的",
                    status: 'Error',
                },
            },
        },

        {
            title: "教室号",
            dataIndex: 'classroomId',
            valueType: 'textarea',
        },
        {
            title: "教室名称",
            dataIndex: 'classroomName',
            valueType: 'textarea',
        },

        {
            title: "最早开始时间",
            dataIndex: 'earliestStartTime',
            valueType: 'dateTime',
            renderFormItem: (item, { defaultRender, }, form) => {
                const status = form.getFieldValue('status');
                if (`${status}` === '1') {
                    return false;
                }
                return defaultRender(item);
            },
        },
        {
            title: "最晚开始时间",
            dataIndex: 'latestStartTime',
            valueType: 'dateTime',
            renderFormItem: (item, { defaultRender, }, form) => {
                const status = form.getFieldValue('status');
                if (`${status}` === '1') {
                    return false;
                }

                return defaultRender(item);
            },
        },
        {
            title: '教室类型',
            dataIndex: 'classroomType',
            search: false,
        },
        {
            title: "操作",
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        handleUpdateModalOpen(true);
                        setCurrentRow(record);
                    }}
                >
                    课前准备
                </a>,
                <a key="classSet">
                    教室设置
                </a>,
                <a key="chat">
                    聊天记录
                </a>,
                <a key="rePlay">
                    观看回放
                </a>,
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<ClassroomManagement.ClassroomManagementMockData, ClassroomManagement.PageParams>
                headerTitle={intl.formatMessage({
                    id: 'pages.searchTable.title',
                    defaultMessage: 'Enquiry form',
                })}
                size="small"
                actionRef={actionRef}
                rowKey="classroomId"
                search={{
                    labelWidth: 100,
                    defaultCollapsed: false,

                }}
                options={{
                    setting: false,
                    density: false,
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            handleModalOpen(true);
                        }}
                    >
                        <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
                    </Button>,
                ]}
                request={queryList}
                columns={columns}
            />
            {/* 新建 */}
            <ModalForm
                title={intl.formatMessage({
                    id: 'pages.searchTable.createForm.newRule',
                    defaultMessage: 'New rule',
                })}
                width="400px"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                onFinish={async (value) => {
                    const success = await handleAdd(value as ClassroomManagement.ClassroomManagementMockData);
                    if (success) {
                        handleModalOpen(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProFormText
                    rules={[
                        {
                            required: true,
                            message: (
                                <FormattedMessage
                                    id="pages.searchTable.ruleName"
                                    defaultMessage="Rule name is required"
                                />
                            ),
                        },
                    ]}
                    width="md"
                    name="name"
                />
                <ProFormTextArea width="md" name="desc" />
            </ModalForm>
            {/* 课前准备 */}
            <UpdateForm
                onSubmit={async (value) => {
                    const success = await handleUpdate(value);
                    if (success) {
                        handleUpdateModalOpen(false);
                        setCurrentRow(undefined);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => {
                    handleUpdateModalOpen(false);
                    if (!showDetail) {
                        setCurrentRow(undefined);
                    }
                }}
                updateModalOpen={updateModalOpen}
                values={currentRow || {}}
            />
        </PageContainer>
    );
};

export default TableList;
