import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns, } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProForm, ProFormCheckbox, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, Link } from '@umijs/max';
import { Button, Space, message, Form, RadioChangeEvent } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateForm from './components/ViewInformation';
import { queryList, addClassRoom } from '../service';
import { Dayjs } from 'dayjs';

const TableList: React.FC = () => {

    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
    const [currentRow, setCurrentRow] = useState<ClassroomManagement.ClassroomManagementMockData>();
    const [value, setValue] = useState('1');
    const actionRef = useRef<ActionType>();
    const intl = useIntl();
    const [form] = Form.useForm();

    const columns: ProColumns<ClassroomManagement.ClassroomManagementMockData>[] = [
        {
            title: "状态",
            dataIndex: 'roomStatus',
            valueType: 'select',
            hideInTable: true,
            valueEnum: {
                1: {
                    text: "有效期内的",
                    status: '1',
                },
                2: {
                    text: "未来的",
                    status: '2',
                },
                3: {
                    text: "已过期的",
                    status: '3',
                },
            },
        },
        {
            title: "教室号",
            dataIndex: 'roomNumber',
            valueType: 'textarea',
        },
        {
            title: "教室名称",
            dataIndex: 'roomName',
            valueType: 'textarea',
        },
        {
            title: "最早开始时间",
            dataIndex: 'startTime',
            valueType: 'dateTime',
            renderFormItem: (item, { defaultRender, }, form) => {
                const status = form.getFieldValue('status');
                if (`${status}` === '1') {
                    return false;
                }
                return defaultRender(item);
            },
            hideInTable: true,
        },
        {
            title: "最晚开始时间",
            dataIndex: 'endStartTime',
            valueType: 'dateTime',
            renderFormItem: (item, { defaultRender, }, form) => {
                const status = form.getFieldValue('status');
                if (`${status}` === '1') {
                    return false;
                }

                return defaultRender(item);
            },
            hideInTable: true,
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            valueType: 'dateTime',
            search: false,
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            valueType: 'dateTime',
            search: false,
        },
        {
            title: '教室类型',
            dataIndex: 'roomTypeName',
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
                        setCurrentRow(record);
                        handleUpdateModalOpen(true);
                    }}
                >
                    课前准备
                </a>,
                <Link key="classSet" to={'/interactive-classroom/classroom-management/settings'}>
                    教室设置
                </Link>,
                // <a key="chat">
                //     聊天记录
                // </a>,
                // <a key="rePlay">
                //     观看回放
                // </a>,
            ],
        },
    ];

    const handleAdd = async (fields: ClassroomManagement.ClassroomManagementMockData) => {
        const hide = message.loading('正在添加');
        try {
            await addClassRoom({ ...fields });
            hide();
            message.success('Added successfully');
            return true;
        } catch (error) {
            hide();
            message.error('Adding failed, please try again!');
            return false;
        }
    };
    const onChangeEndTime = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    }

    const SelectCurrentTime = (e: RadioChangeEvent) => {

    }
    const SelectEndTime = (date: Dayjs | null, dateString: string | string[]) => {

    }

    const handleWatch = (e: RadioChangeEvent) => {

    }

    const handleAuditorWatch = (e: RadioChangeEvent) => {

    }
    return (
        <PageContainer>
            <ProTable<ClassroomManagement.ClassroomManagementMockData, ClassroomManagement.PageParams>
                headerTitle={intl.formatMessage({
                    id: 'pages.searchTable.title',
                    defaultMessage: 'Enquiry form',
                })}
                size="small"
                actionRef={actionRef}
                rowKey="roomId"
                search={{
                    labelWidth: 100,
                    defaultCollapsed: false,
                }}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
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
                dateFormatter='number'
                request={queryList}
                columns={columns}
            />
            {/* 新建 */}
            <ModalForm
                title={'新建教室'}
                width="800px"
                autoFocusFirstInput
                form={form}
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
                    width="md"
                    name="roomName"
                    label="教室名称"
                    placeholder="请输入教室名称"
                />
                <ProForm.Item name="startTime" label="开始时间" rules={[{ required: true, message: "请选择开始时间" }]}>
                    <Space>
                        <ProFormDateTimePicker name="dateTime" />
                        <ProFormCheckbox fieldProps={{ onChange: SelectCurrentTime }}>
                            当前时间
                        </ProFormCheckbox>
                    </Space>
                </ProForm.Item>
                <ProForm.Item name="endTime" label="结束时间" rules={[{ required: true, message: "请选择结束时间" }]}>
                    <Space>
                        <>
                            {value === '1' ?
                                <ProFormSelect style={{ width: '200px' }}
                                    options={[
                                        {
                                            label: '30分钟后生效',
                                            value: '1',
                                        },
                                        {
                                            label: '45分钟后生效',
                                            value: '2',
                                        },
                                        {
                                            label: '60分钟后生效',
                                            value: '3',
                                        },
                                    ]}
                                />
                                :
                                <ProFormDateTimePicker
                                    name="dateTime"
                                    fieldProps={{ onChange: SelectEndTime }}
                                />
                            }
                        </>
                        <ProFormRadio.Group
                            fieldProps={{ onChange: onChangeEndTime }}
                            options={[
                                {
                                    label: '选择时间',
                                    value: '1',
                                },
                                {
                                    label: '自定义时间',
                                    value: '2',
                                },
                            ]}
                        />
                    </Space>
                </ProForm.Item>
                <ProForm.Item label="教室口令">
                    <Space>
                        <ProFormDigit name="teacherCode" fieldProps={{
                            addonBefore: '老师',
                            defaultValue: undefined,
                        }} />
                        <ProFormDigit name="assistantCode" fieldProps={{
                            addonBefore: '助教',
                            defaultValue: undefined,
                        }} />
                        <ProFormDigit name="patrolCode" fieldProps={{
                            addonBefore: '巡课',
                            defaultValue: undefined,
                        }} />
                    </Space>
                </ProForm.Item>
                <ProForm.Item label="学生口令" name="student">
                    <Space>
                        <ProFormDigit fieldProps={{
                            addonBefore: '学生',
                            defaultValue: undefined,
                        }} />
                        <ProFormCheckbox fieldProps={{ onChange: handleWatch }}>
                            无限制观看
                        </ProFormCheckbox>
                    </Space>
                </ProForm.Item>
                <ProForm.Item label="旁听生口令" name="studentCode">
                    <Space>
                        <ProFormDigit fieldProps={{
                            addonBefore: '旁听生',
                            defaultValue: undefined,
                        }} />
                        <ProFormCheckbox fieldProps={{ onChange: handleAuditorWatch }}>
                            无限制观看
                        </ProFormCheckbox>
                    </Space>
                </ProForm.Item>
            </ModalForm>
            {/* 模板选择 */}
            {/* 课前准备 */}
            <UpdateForm
                onCancel={() => {
                    handleUpdateModalOpen(false);
                }}
                updateModalOpen={updateModalOpen}
                values={currentRow || {}}
            />
        </PageContainer >
    );
};

export default TableList;
