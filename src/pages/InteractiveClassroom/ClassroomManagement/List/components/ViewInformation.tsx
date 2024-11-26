import React from 'react';
import { Button, Modal, Space, Tabs, TabsProps, Typography, Image, Flex, InputNumber } from 'antd';
import styles from '../index.less'

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<ClassroomManagement.ListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  updateModalOpen: boolean;
  values: Partial<ClassroomManagement.ListItem>;
};

const { Text } = Typography;

// 老师/助教/巡课 Tab 内容
const TeacherTabContent: React.FC = () => (
  <div style={{ width: "100%" }}>
    <Space direction="vertical" className={styles.part}>
      <Text>开播链接</Text>
      <Space>
        <a href="" target='_blank'>https://global.talk-cloud.net/enterRoom/671277841/120390/1/0</a>
        <Button.Group>
          <Button variant="filled" color="default" size='small'>复制</Button>
          <Button variant="solid" color="default" size='small'>打开</Button>
        </Button.Group>
      </Space>
    </Space>
    <Space direction="vertical" className={styles.part}>
      <Text>登录口令</Text>
      <Space>
        <InputNumber addonBefore="老师" defaultValue="4108" readOnly />
        <InputNumber addonBefore="助教" defaultValue="4108" readOnly />
        <InputNumber addonBefore="巡课" defaultValue="4108" readOnly />
      </Space>
    </Space>
    <Space direction="vertical" className={styles.part}>
      <Text>教室号</Text>
      <InputNumber defaultValue="671277841" readOnly />
    </Space>
  </div>
);

// 学生 Tab 内容
const StudentTabContent: React.FC = () =>
  <Space direction="vertical" style={{ width: "100%" }}>
    <Space direction="vertical" className={styles.part}>
      <Text>开播链接</Text>
      <Space>
        <a href="" target='_blank'>https://global.talk-cloud.net/enterRoom/671277841/120390/1/0</a>
        <Button.Group>
          <Button variant="filled" color="default" size='small'>复制</Button>
          <Button variant="solid" color="default" size='small'>打开</Button>
        </Button.Group>
      </Space>
    </Space>
    <Flex justify="space-between" align='center'>
      <Space direction='vertical'>
        <Space direction="vertical" className={styles.part}>
          <Text>登录口令</Text>
          <InputNumber defaultValue="671277841" readOnly />
        </Space>
        <Space direction="vertical" >
          <Text>教室号</Text>
          <InputNumber defaultValue="671277841" readOnly />
        </Space>
      </Space>
      <Flex vertical={true}>
        <Image width={104} height={104}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
        <Text>扫码观看</Text>
      </Flex>
    </Flex>
  </Space>
  ;

// 旁听生 Tab 内容
const ListenerTabContent: React.FC = () => <Space direction="vertical" style={{ width: "100%" }}>
  <Space direction="vertical" className={styles.part}>
    <Text>开播链接</Text>
    <Space>
      <a href="" target='_blank'>https://global.talk-cloud.net/enterRoom/671277841/120390/1/0</a>
      <Button.Group>
        <Button variant="filled" color="default" size='small'>复制</Button>
        <Button variant="solid" color="default" size='small'>打开</Button>
      </Button.Group>
    </Space>
  </Space>
  <Flex justify="space-between" align='center'>
    <Space direction='vertical'>
      <Space direction="vertical" className={styles.part}>
        <Text>登录口令</Text>
        <InputNumber defaultValue="671277841" readOnly />
      </Space>
      <Space direction="vertical" >
        <Text>教室号</Text>
        <InputNumber defaultValue="671277841" readOnly />
      </Space>
    </Space>
    <Flex vertical={true}>
      <Image width={104} height={104}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      <Text>扫码观看</Text>
    </Flex>
  </Flex>
</Space>
  ;

const UpdateForm: React.FC<UpdateFormProps> = (props) => {

  const items: TabsProps["items"] = [
    { key: "1", label: "老师/助教/巡课", children: <TeacherTabContent /> },
    { key: "2", label: "学生", children: <StudentTabContent /> },
    { key: "3", label: "旁听生", children: <ListenerTabContent /> },
  ];

  return (
    <Modal
      width={700}
      style={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={'课前准备'}
      open={props.updateModalOpen}
      footer={null}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <Tabs defaultActiveKey="1" items={items} />
      {/* <Space style={{ marginTop: 16, justifyContent: "flex-end", display: "flex" }}>
        <Button>成员管理</Button>
        <Button type="primary">课件管理</Button>
      </Space> */}
    </Modal>
  );
};

export default UpdateForm;
