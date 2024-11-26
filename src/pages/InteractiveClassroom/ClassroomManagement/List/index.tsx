import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
    ModalForm,
    PageContainer,
    ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, Link } from '@umijs/max';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Space, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/ViewInformation';
import { queryList, addClassRoom } from '../service';



const handleAdd = async (fields) => {
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


const openTemplate = () => {

}

const { Option } = Select;

const TableList: React.FC = () => {

    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
    const [currentRow, setCurrentRow] = useState<ClassroomManagement.ClassroomManagementMockData>();
    const actionRef = useRef<ActionType>();
    const intl = useIntl();

    const columns: ProColumns<ClassroomManagement.ClassroomManagementMockData>[] = [
        {
            title: "状态",
            dataIndex: 'roomStatus',
            hideInTable: true,
            valueEnum: {
                0: {
                    text: "有效期内的",
                    status: '1',
                },
                1: {
                    text: "未来的",
                    status: '2',
                },
                2: {
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
                    defaultPageSize: 20,
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
                request={queryList}
                columns={columns}
            />
            {/* 新建 */}
            <ModalForm
                title={'新建教室'}
                width="800px"
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
                <Form.Item
                    name="roomName"
                    label="教室名称"
                    rules={[{ required: true, message: "请输入教室名称" }]}
                >
                    <Input placeholder="请输入教室名称" />
                </Form.Item>
                <Form.Item name="template" label="教室模板">
                    <Button type="dashed" onClick={openTemplate}>选择模板</Button>
                </Form.Item>
                <Form.Item name="startTime" label="开始时间">
                    <Space>
                        <DatePicker
                            showTime
                            onChange={(value, dateString) => {
                                console.log('Selected Time: ', value);
                                console.log('Formatted Selected Time: ', dateString);
                            }}
                        />
                        <Checkbox>当前时间</Checkbox>
                    </Space>
                </Form.Item>
                <Form.Item
                    name="endTime"
                    label="结束时间"
                    rules={[{ required: true, message: "请选择结束时间" }]}
                >
                    <Radio.Group name="radiogroup" defaultValue={1}>
                        <Radio value={1}>自定义时间</Radio>
                        <Radio value={2}>选择时间</Radio>
                    </Radio.Group>
                    <Space>
                        <DatePicker
                            showTime
                            onChange={(value, dateString) => {
                                console.log('Selected Time: ', value);
                                console.log('Formatted Selected Time: ', dateString);
                            }}
                        />
                        <Select style={{ width: '200px' }}>
                            <Option value="3">30分钟后结束</Option>
                            <Option value="2">45分钟后结束</Option>
                            <Option value="1">1小时后结束</Option>
                        </Select>
                    </Space>
                </Form.Item>
                <Form.Item label="教室口令">
                    <Space>
                        <Form.Item name="teacherCode" noStyle>
                            <InputNumber addonBefore="老师" defaultValue="" />
                        </Form.Item>
                        <Form.Item name="assistantCode" noStyle>
                            <InputNumber addonBefore="助教" defaultValue="" />
                        </Form.Item>
                        <Form.Item name="patrolCode" noStyle>
                            <InputNumber addonBefore="巡课" defaultValue="" />
                        </Form.Item>
                    </Space>
                </Form.Item>
                <Form.Item label="学生口令">
                    <Space>
                        <Form.Item name="studentCode" noStyle>
                            <InputNumber addonBefore="学生" defaultValue="" />
                        </Form.Item>
                        <Form.Item name="studentViewMode" noStyle>
                            <Checkbox>无限制观看</Checkbox>
                        </Form.Item>
                    </Space>
                </Form.Item>
                <Form.Item label="旁听生口令">
                    <Space>
                        <Form.Item name="studentCode" noStyle>
                            <InputNumber addonBefore="旁听生" defaultValue="" />
                        </Form.Item>
                        <Form.Item name="studentViewMode" noStyle>
                            <Checkbox>无限制观看</Checkbox>
                        </Form.Item>
                    </Space>
                </Form.Item>
            </ModalForm>
            {/* 模板选择 */}
            <ModalForm>

            </ModalForm>
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
