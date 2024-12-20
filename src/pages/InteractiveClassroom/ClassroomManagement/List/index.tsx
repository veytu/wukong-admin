import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns, } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProForm, ProFormCheckbox, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, Link } from '@umijs/max';
import { Button, Space, message, Form, RadioChangeEvent } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateForm from './components/ViewInformation';
import { queryList, addClassRoom } from '../service';
import dayjs from 'dayjs';

const TableList: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
    const [currentRow, setCurrentRow] = useState<ClassroomManagement.ClassroomManagementMockData>();
    const [auditorDisabled, setAuditorDisabled] = useState(false)
    const [studentDisabled, setStudentDisabled] = useState(false)
    const [studentTip, setStudentTip] = useState(false)
    const [auditorTip, setAuditorTip] = useState(false)
    const [endTime, setEndTime] = useState('1');
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
            title: '教室类型',
            dataIndex: 'roomTypeName',
            search: false,
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
            title: "操作",
            dataIndex: 'option',
            valueType: 'option',
            width: 120,
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
                // <Link key="classSet" to={'/interactive-classroom/classroom-management/settings'}>
                //     教室设置
                // </Link>,
                // <a key="chat">
                //     聊天记录
                // </a>,
                // <a key="rePlay">
                //     观看回放
                // </a>,
            ],
        },
    ];

    const checkUniqueGroups = (groups: any) => {
        const seen = new Set();
        for (const group of groups) {
            const groupStr = group.toString();
            if (seen.has(groupStr)) {
                return false;
            }
            seen.add(groupStr);
        }

        return true;
    }

    const handleAdd = async (fields: ClassroomManagement.addClassRoom) => {
        const studentValue = fields.studentCode
        const auditorValue = fields.auditorCode
        const isStudentValue = studentValue === null || studentValue === undefined || studentValue === ''
        const isAuditorValue = auditorValue === null || auditorValue === undefined || auditorValue === ''
        if (isStudentValue && !studentDisabled) {
            setStudentTip(true)
            return false
        } {
            setStudentTip(false)
        }
        if (isAuditorValue && !auditorDisabled) {
            setAuditorTip(true)
            return false
        } else {
            setAuditorTip(false)
        }
        const unique = checkUniqueGroups([fields.teacherCode, fields.assistantCode, fields.patrolCode, fields.studentCode, fields.auditorCode])
        if (!unique) {
            messageApi.error('角色密码不能相同');
            return false;
        }
        const hide = messageApi.loading('正在添加');
        try {
            let endTime = 0, afterTime = fields.afterTime!
            if (fields.selectEndTime === '1') {
                endTime = new Date(fields.startTime).getTime() + afterTime * 60 * 1000
            } else {
                endTime = new Date(fields.endTime).getTime()
            }
            const submitData = {
                "roomName": fields.roomName,
                "startTime": new Date(fields.startTime).getTime(),
                "endTime": endTime,
                "roomType": 0,
                "joinPassword": {
                    "0": fields.teacherCode,
                    "1": fields.assistantCode,
                    "2": fields.patrolCode,
                    "3": fields.studentCode,
                    "5": fields.auditorCode
                }
            }

            const result = await addClassRoom({ ...submitData });
            hide();
            messageApi.success(result.message);
            return true;
        } catch (error) {
            hide();
            messageApi.error('Adding failed, please try again!');
            return false;
        }
    };

    const onChangeEndTime = (e: RadioChangeEvent) => {
        setEndTime(e.target.value);
    }

    const handleWatch = (e: RadioChangeEvent) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            form.setFieldsValue({ studentCode: undefined });
        }
        setStudentDisabled(isChecked)
    }

    const handleAuditorWatch = (e: RadioChangeEvent) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            form.setFieldsValue({ auditorCode: undefined });
        }
        setAuditorDisabled(isChecked)
    }

    useEffect(() => {
        if (createModalOpen) {
            form.resetFields();
            setStudentTip(false)
            setAuditorTip(false)
            setEndTime('1')
        }
    }, [createModalOpen])


    return (
        <PageContainer>
            {contextHolder}
            <ProTable<ClassroomManagement.ClassroomManagementMockData, ClassroomManagement.PageParams>
                headerTitle={intl.formatMessage({
                    id: 'pages.searchTable.title',
                    defaultMessage: 'Enquiry form',
                })}
                size="small"
                scroll={{ x: 1000 }}
                actionRef={actionRef}
                rowKey="roomId"
                search={{
                    labelWidth: 100,
                    defaultCollapsed: false,
                }}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: false,
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
                initialValues={{
                    startTime: dayjs(),
                    teacherCode: Math.floor(1000 + Math.random() * 9000),
                    assistantCode: Math.floor(1000 + Math.random() * 9000),
                    patrolCode: Math.floor(1000 + Math.random() * 9000),
                    studentCode: Math.floor(1000 + Math.random() * 9000),
                    auditorCode: Math.floor(1000 + Math.random() * 9000)
                }}
                onFinish={async (value) => {
                    const success = await handleAdd(value as ClassroomManagement.addClassRoom);
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
                    rules={[{ required: true, message: "请输入教室名称" }]}
                />
                <ProForm.Item label="开始时间" name="startTime" rules={[{ required: true, message: "请选择开始时间" }]}>
                    <ProFormDateTimePicker
                        fieldProps={{
                            format: 'YYYY-MM-DD HH:mm:ss',
                            defaultValue: dayjs()
                        }}
                    />
                </ProForm.Item>
                <ProForm.Item label="结束时间" rules={[{ required: true, message: "请选择结束时间" }]}>
                    <Space>
                        <>
                            {endTime === '1' ?
                                <ProFormSelect style={{ width: '200px' }}
                                    initialValue={45}
                                    name="afterTime"
                                    options={[
                                        { label: '45分钟后结束', value: 45 },
                                        { label: '120分钟后结束', value: 120 },
                                    ]}
                                />
                                :
                                <ProFormDateTimePicker
                                    name="endTime"
                                    fieldProps={{
                                        format: 'YYYY-MM-DD HH:mm:ss',
                                    }}
                                />
                            }
                        </>
                        <ProFormRadio.Group
                            name='selectEndTime'
                            fieldProps={{ onChange: onChangeEndTime }}
                            initialValue="1"
                            options={[
                                { label: '选择时间', value: '1' },
                                { label: '自定义时间', value: '2' },
                            ]}
                        />
                    </Space>
                </ProForm.Item>
                <ProForm.Item label="教室口令">
                    <Space>
                        <ProFormDigit name="teacherCode" fieldProps={{
                            addonBefore: '老师',
                            inputMode: 'decimal',
                            style: { appearance: 'textfield' }
                        }}
                            rules={[{ required: true, message: "请输入老师口令" }]}
                        />
                        <ProFormDigit name="assistantCode" fieldProps={{
                            addonBefore: '助教'
                        }}
                            rules={[{ required: true, message: "请输入助教口令" }]}
                        />
                        <ProFormDigit name="patrolCode" fieldProps={{
                            addonBefore: '巡课'
                        }}
                            rules={[{ required: true, message: "请输入巡课口令" }]}
                        />
                    </Space>
                </ProForm.Item>
                <ProForm.Item label="学生口令" >
                    <Space>
                        <ProFormDigit name="studentCode" fieldProps={{
                            addonBefore: '学生',
                            disabled: studentDisabled
                        }}
                        />
                        <ProFormCheckbox fieldProps={{ onChange: handleWatch }} >
                            无限制观看
                        </ProFormCheckbox>
                    </Space>
                    {studentTip && <div style={{ 'color': 'red' }}>请选择学生口令</div>}
                </ProForm.Item>
                <ProForm.Item label="旁听生口令" >

                    <Space>
                        <ProFormDigit name="auditorCode" fieldProps={{
                            addonBefore: '旁听生',
                            disabled: auditorDisabled,
                        }}
                        />
                        <ProFormCheckbox fieldProps={{ onChange: handleAuditorWatch }}>
                            无限制观看
                        </ProFormCheckbox>
                    </Space>
                    {auditorTip && <div style={{ 'color': 'red' }}>请选择旁听生口令</div>}
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
