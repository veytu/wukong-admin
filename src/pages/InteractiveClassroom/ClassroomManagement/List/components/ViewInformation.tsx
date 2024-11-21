import React from 'react';
import { Button, Input, Modal, Space, Tabs, TabsProps, Typography, Image, Flex } from 'antd';
import styles from '../index.less'

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.RuleListItem>;
};

const { Text } = Typography;

// 老师/助教/巡课 Tab 内容
const TeacherTabContent: React.FC = () => (
  <Space direction="vertical" style={{ width: "100%" }}>
    <div className={styles.part}>
      <Flex justify='space-between'>
        <Text>开播链接：</Text>
        <Space>
          <Button type="link">打开</Button>
          <Button type="link">复制</Button>
        </Space>
      </Flex>
      <div>
        <Input
          value="https://global.talk-cloud.net/enterRoom/671277841/120390/1/0"
          readOnly
        />
      </div>
    </div>
    <Space direction="vertical" className={styles.part}>
      <Text>教室号：</Text>
      <Input value="671277841" readOnly />
    </Space>
    <Space direction="vertical" className={styles.part}>
      <Text>登录口令：</Text>
      <Space>
        <Input value="老师 4108" readOnly />
        <Input value="助教 2807" readOnly />
        <Input value="巡课 3271" readOnly />
      </Space>
    </Space>
  </Space>
);

// 学生 Tab 内容
const StudentTabContent: React.FC = () =>
  <Space direction="vertical" style={{ width: "100%" }}>
    <div className={styles.part}>
      <Flex justify='space-between'>
        <Text>开播链接：</Text>
        <div>
          <Button type="link">打开</Button>
          <Button type="link">复制</Button>
        </div>
      </Flex>
      <div>
        <Input
          value="https://global.talk-cloud.net/enterRoom/671277841/120390/1/0"
          readOnly
        />
      </div>
    </div>
    <Flex justify="space-between" >
      <div>
        <Flex vertical className={styles.part}>
          <Text>教室号：</Text>
          <Input value="671277841" readOnly />
        </Flex>
        <Flex vertical className={styles.part}>
          <Text>登录口令：</Text>
          <Space>
            <Input value="4108" readOnly />
          </Space>
        </Flex>
      </div>
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
  <div className={styles.part}>
    <Flex justify='space-between'>
      <Text>开播链接：</Text>
      <div>
        <Button type="link">打开</Button>
        <Button type="link">复制</Button>
      </div>
    </Flex>
    <div>
      <Input
        value="https://global.talk-cloud.net/enterRoom/671277841/120390/1/0"
        readOnly
      />
    </div>
  </div>
  <Flex justify="space-between" >
    <div>
      <Flex vertical className={styles.part}>
        <Text>教室号：</Text>
        <Input value="671277841" readOnly />
      </Flex>
      <Flex vertical className={styles.part}>
        <Text>登录口令：</Text>
        <Space>
          <Input value="4108" readOnly />
        </Space>
      </Flex>
    </div>
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
