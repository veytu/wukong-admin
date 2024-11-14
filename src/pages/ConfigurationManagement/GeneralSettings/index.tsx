import React, { useState } from 'react';
import { Layout, Menu, MenuProps, message, Form, Switch, Radio, InputNumber, Button, Typography } from 'antd';
import {
    SettingOutlined,
    DatabaseOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import bubble_style from '@/assets/bubble_style.png';
const { Sider, Content } = Layout;

const GeneralSettings: React.FC = () => {
    const { Text } = Typography;
    type MenuItem = Required<MenuProps>['items'][number];
    const [autoDismiss, setAutoDismiss] = useState(true);
    const [style, setStyle] = useState<'bubble' | 'modal'>('bubble');
    const [extendTime, setExtendTime] = useState(20);

    const items: MenuItem[] = [
        {
            key: 'sub2',
            label: '教室管理',
            icon: <SettingOutlined />,
            children: [
                { key: '5', label: '上下课设置' },
                // { key: '6', label: '房间设置' },
                // { key: '7', label: '开播前设置', },
                // { key: '8', label: '自定义聊天话术' },
                // { key: '9', label: '分享' },
                // { key: '10', label: '求助设置' },
                // { key: '11', label: '功能开关', },
                // { key: '12', label: '奖励称号' },
            ],
        },
        {
            key: 'sub4',
            label: '系统设置',
            icon: <DatabaseOutlined />,
            children: [
                // { key: '13', label: '系统管理' },
            ],
        },
    ];
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    const handleSave = () => {
        if (extendTime < 5 || extendTime > 30) {
            message.error('自定义延长时间范围为5～30分钟，设置后到下课时间自动延长至20分钟后下课');
            return;
        }
        message.success('设置已保存');
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
                        <Form layout="vertical">
                            <Form.Item label="自动下课">
                                <Switch checked={autoDismiss} onChange={() => setAutoDismiss(!autoDismiss)} />
                            </Form.Item>

                            {autoDismiss && (
                                <>
                                    <Form.Item label="自动下课样式">
                                        <Radio.Group
                                            value={style}
                                            onChange={(e) => setStyle(e.target.value)}
                                        >
                                            <Radio value="bubble">气泡样式</Radio>
                                            <Radio value="modal">弹窗样式</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item label="延长时间">
                                        <InputNumber
                                            min={5}
                                            max={30}
                                            value={extendTime}
                                            onChange={(value) => setExtendTime(value || 20)}
                                            addonAfter="min"
                                        />
                                        <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                                            自定义延长时间范围为5～30分钟，设置后到下课时间自动延长至20分钟后下课
                                        </Text>
                                    </Form.Item>

                                    <Form.Item label="示例">
                                        <img src={bubble_style} />
                                    </Form.Item>
                                </>
                            )}

                            <Form.Item>
                                <Button type="primary" onClick={handleSave}>
                                    保存
                                </Button>
                            </Form.Item>
                        </Form>

                        {/* <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
                            自定义聊天话术
                        </h2>
                        <Tabs defaultActiveKey="1" tabBarStyle={{ marginBottom: '16px' }}>
                            <Tabs.TabPane tab="老师话术" key="1">
                                <Empty description="暂无数据" />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="学生话术" key="2">
                                <Empty description="暂无数据" />
                            </Tabs.TabPane>
                        </Tabs> */}
                    </Content>
                </Layout>
            </Layout>
        </PageContainer>
    );
};

export default GeneralSettings;
