import React, { useState } from 'react';
import { Layout, Menu, MenuProps, Image, Typography, Divider, Descriptions } from 'antd';
import {
    SettingOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';


const { Sider, Content } = Layout;

const { Title } = Typography;
// 定义课堂信息接口
interface ClassroomInfo {
    name: string;
    type: string;
    template: string;
    templateImage: string;
    startDate: string;
    endDate: string;
    commands: {
        teacher: number;
        assistant: number;
        patrol: number;
        student: string;
        listener: number;
    };
}

const GeneralSettings: React.FC = () => {
    type MenuItem = Required<MenuProps>['items'][number];
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
    const classroomData: ClassroomInfo = {
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
                    </Content>
                </Layout>
            </Layout>
        </PageContainer>
    );
};

export default GeneralSettings;
