import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns, } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProForm, ProFormCheckbox, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, Link } from '@umijs/max';
import { Button, Space, message, Form, RadioChangeEvent } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateForm from './components/ViewInformation';
import { queryList, addClassRoom } from '../service';

const TableList: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
    const [currentRow, setCurrentRow] = useState<ClassroomManagement.ClassroomManagementMockData>();
    const [auditorDisabled, setAuditorDisabled] = useState(false)
    const [studentDisabled, setStudentDisabled] = useState(false)
    const [showData, setShowData] = useState({pageSize:10,currentPage:1})
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

    const handleAdd = async (fields: ClassroomManagement.addClassRoom) => {
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
        setValue(e.target.value);
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

    useEffect(()=>{
        if(createModalOpen){
            form.resetFields();
        }
    },[createModalOpen])

    return (
        <PageContainer>
            {contextHolder}
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
                    pageSize: showData.pageSize,
                    current: showData.currentPage,
                    showSizeChanger: true,  // 显示每页条数的切换器
                    pageSizeOptions: ['10', '20', '50'],  // 可选的每页条数
                    showTotal: (total) => `共 ${total} 条`,  // 显示总条数
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
                request={async (params) => {
                    // 通过传入的 params 获取分页信息
                    //@ts-ignore
                    const result = await queryList({...params,pageIndex:params.current});
                    //@ts-ignore
                    setShowData(result)
                    //@ts-ignore
                    result.total = result.totalCount
                    return result;
                  }}
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
                        }}
                    />
                </ProForm.Item>
                <ProForm.Item label="结束时间" rules={[{ required: true, message: "请选择结束时间" }]}>
                    <Space>
                        <>
                            {value === '1' ?
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
                            defaultValue: undefined,
                        }}
                            rules={[{ required: true, message: "请输入老师口令" }]}
                        />
                        <ProFormDigit name="assistantCode" fieldProps={{
                            addonBefore: '助教',
                            defaultValue: undefined,
                        }}
                            rules={[{ required: true, message: "请输入助教口令" }]}
                        />
                        <ProFormDigit name="patrolCode" fieldProps={{
                            addonBefore: '巡课',
                            defaultValue: undefined,
                        }}
                            rules={[{ required: true, message: "请输入巡课口令" }]}
                        />
                    </Space>
                </ProForm.Item>
                <ProForm.Item label="学生口令" >
                    <Space>
                        <ProFormDigit name="studentCode" fieldProps={{
                            addonBefore: '学生',
                            defaultValue: undefined,
                            disabled: studentDisabled
                        }}
                        />
                        <ProFormCheckbox fieldProps={{ onChange: handleWatch }}>
                            无限制观看
                        </ProFormCheckbox>
                    </Space>
                </ProForm.Item>
                <ProForm.Item label="旁听生口令" >
                    <Space>
                        <ProFormDigit name="auditorCode" fieldProps={{
                            addonBefore: '旁听生',
                            defaultValue: undefined,
                            disabled: auditorDisabled,
                        }}
                        />
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
