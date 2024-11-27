import React, { useState } from 'react';
import { Layout, Menu, MenuProps, Image, Typography, Divider, Descriptions, Space, RadioChangeEvent, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { PageContainer, ProForm, ProFormCheckbox, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Dayjs } from 'dayjs';
const { Sider, Content } = Layout;
const { Title } = Typography;

const GeneralSettings: React.FC = () => {
    type MenuItem = Required<MenuProps>['items'][number];
    const [value, setValue] = useState('1');

    const items: MenuItem[] = [
        {
            key: 'sub2',
            label: '教室管理',
            icon: <SettingOutlined />,
            children: [
                { key: '5', label: '基础详情' },
            ],
        },
    ];
    // 模拟数据
    const classroomData: ClassroomManagement.ClassroomInfo = {
        name: "[岗前教学培训] - 通用-临时直播课练习教室",
        type: "一对多",
        template: "IVduo",
        templateImage:
            "https://via.placeholder.com/300x150.png?text=IVduo+Template", // 替换为实际图片链接
        startDate: "2024-11-12 16:26:39",
        endDate: "2033-12-31 23:26:18",
        commands: {
            teacher: 4108,
            assistant: 2807,
            patrol: 3271,
            student: "无",
            listener: 2875,
        },
    };

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
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
            <Layout style={{ minHeight: '100vh' }}>
                {/* 左侧菜单 */}
                <Sider width={200} theme="light">
                    <Menu
                        onClick={onClick}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        style={{ height: '100%', background: '#FAFAFB' }}
                        items={items}
                    />
                </Sider>

                {/* 右侧内容 */}
                <Layout>
                    <Content style={{ padding: '24px', background: '#FAFAFB' }}>
                        {false && <div>
                            <Title level={4}>教室信息</Title>
                            <Divider />
                            <Descriptions column={1}>
                                <Descriptions.Item label="教室名称">{classroomData.name}</Descriptions.Item>
                                <Descriptions.Item label="教室类型">{classroomData.type}</Descriptions.Item>
                                <Descriptions.Item label="教室模板">
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <span>{classroomData.template}</span>
                                        <Image
                                            width={100}
                                            src={classroomData.templateImage}
                                            alt="Template Preview"
                                        />
                                    </div>
                                </Descriptions.Item>
                                <Descriptions.Item label="开始日期">{classroomData.startDate}</Descriptions.Item>
                                <Descriptions.Item label="结束日期">{classroomData.endDate}</Descriptions.Item>
                            </Descriptions>
                            <Divider />
                            <Title level={5}>教室口令</Title>
                            <Descriptions column={2}>
                                <Descriptions.Item label="老师">{classroomData.commands.teacher}</Descriptions.Item>
                                <Descriptions.Item label="助教">{classroomData.commands.assistant}</Descriptions.Item>
                                <Descriptions.Item label="巡课">{classroomData.commands.patrol}</Descriptions.Item>
                                <Descriptions.Item label="学生">{classroomData.commands.student}</Descriptions.Item>
                                <Descriptions.Item label="旁听生">{classroomData.commands.listener}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        }
                        <ProForm
                            onFinish={async (values) => {
                                console.log(values);
                            }}
                            submitter={{
                                render: (props, doms) => {
                                    return [
                                        <Button
                                            type="default"
                                            key="rest"
                                            onClick={() => props.form?.resetFields()}
                                        >
                                            取消
                                        </Button>,
                                        <Button
                                            type="primary"
                                            key="submit"
                                            onClick={() => props.form?.submit?.()}
                                        >
                                            保存
                                        </Button>
                                    ]
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
                            <ProForm.Item
                                name="endTime"
                                label="结束时间"
                                rules={[{ required: true, message: "请选择结束时间" }]}
                            >
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
                        </ProForm>
                    </Content>
                </Layout>
            </Layout>
        </PageContainer >
    );
};

export default GeneralSettings;
