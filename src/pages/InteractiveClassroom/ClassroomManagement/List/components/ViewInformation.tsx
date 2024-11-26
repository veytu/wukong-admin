import React from 'react';
import { Button, Modal, Space, Tabs, TabsProps, Typography, Image, Flex, InputNumber, message } from 'antd';
import styles from '../index.less'
import QRCode from 'qrcode';


export type UpdateFormProps = {
  onCancel: (flag?: boolean) => void;
  updateModalOpen: boolean;
  values: Partial<ClassroomManagement.ClassroomManagementMockData>;
};

interface JoinRoomProps {
  values: any | undefined;
  roomNumber: string | undefined;
}

const { Text } = Typography;

//复制
const copyThat = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => {
        message.success('文本已复制到剪贴板');
      })
      .catch((err) => {
        message.success('复制失败');
        console.log(err)
      });
  } else {
    alert('浏览器不支持 Clipboard API');
  }
}

//扫码
const generateQRCode = (url: string) => {
  let qrUrl = ''
  QRCode.toDataURL(url, (err: any, url: string) => {
    if (err) {
      // console.error('生成二维码失败:', err);
    } else {
      qrUrl = url
    }
  });
  return qrUrl
}

//打开
const openUrl = (url: string) => {
  window.open(url)
}

// 老师/助教/巡课 Tab 内容
const TeacherTabContent: React.FC<JoinRoomProps> = (props) => {
  const { values, roomNumber } = props
  return (
    <div style={{ width: "100%" }}>
      <Space direction="vertical" className={styles.part}>
        <Text>开播链接</Text>
        <Space wrap>
          <a href="" target='_blank'>{values[0].joinUrl}</a>
          {
            values[0].joinUrl &&
            <Button.Group>
              <Button variant="filled" color="default" size='small' onClick={() => copyThat(values[0].joinUrl)}>复制</Button>
              <Button variant="solid" color="default" size='small' onClick={() => openUrl(values[0].joinUrl)}>打开</Button>
            </Button.Group>
          }
        </Space>
      </Space>
      <Space direction="vertical" className={styles.part}>
        <Text>登录口令</Text>
        <Space>
          <InputNumber addonBefore="老师" defaultValue={values[0].password} readOnly />
          <InputNumber addonBefore="助教" defaultValue={values[1].password} readOnly />
          <InputNumber addonBefore="巡课" defaultValue={values[2].password} readOnly />
        </Space>
      </Space>
      <Space direction="vertical" className={styles.part}>
        <Text>教室号</Text>
        <InputNumber defaultValue={roomNumber} readOnly />
      </Space>
    </div>
  )
};

// 学生 Tab 内容
const StudentTabContent: React.FC<JoinRoomProps> = (props) => {
  const { values, roomNumber } = props
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Space direction="vertical" className={styles.part} >
        <Text>开播链接</Text>
        <Space wrap>
          <a href={values.joinUrl} target='_blank' rel="noopener noreferrer">{values.joinUrl}</a>
          {
            values.joinUrl && <Button.Group>
              <Button variant="filled" color="default" size='small' onClick={() => copyThat(values.joinUrl)}>复制</Button>
              <Button variant="solid" color="default" size='small' onClick={() => openUrl(values.joinUrl)}>打开</Button>
            </Button.Group>
          }
        </Space>
      </Space>
      <Flex justify="space-between" align='center'>
        <Space direction='vertical'>
          <Space direction="vertical" className={styles.part}>
            <Text>登录口令</Text>
            <InputNumber defaultValue={values.password} readOnly />
          </Space>
          <Space direction="vertical" >
            <Text>教室号</Text>
            <InputNumber defaultValue={roomNumber} readOnly />
          </Space>
        </Space>
        <Flex vertical={true}>
          <Image width={104} height={104}
            src={generateQRCode(values.joinUrl)} />
          <Text>扫码观看</Text>
        </Flex>
      </Flex>
    </Space>
  )
}
// 旁听生 Tab 内容
const ListenerTabContent: React.FC<JoinRoomProps> = (props) => {
  const { values, roomNumber } = props
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Space direction="vertical" className={styles.part}>
        <Text>开播链接</Text>
        <Space wrap>
          <a href={values.joinUrl} target='_blank' rel="noopener noreferrer">{values.joinUrl}</a>
          {
            values.joinUrl && <Button.Group>
              <Button variant="filled" color="default" size='small' onClick={() => copyThat(values.joinUrl)}>复制</Button>
              <Button variant="solid" color="default" size='small' onClick={() => openUrl(values.joinUrl)}>打开</Button>
            </Button.Group>
          }
        </Space>
      </Space>
      <Flex justify="space-between" align='center'>
        <Space direction='vertical'>
          <Space direction="vertical" className={styles.part}>
            <Text>登录口令</Text>
            <InputNumber defaultValue={values.password} readOnly />
          </Space>
          <Space direction="vertical" >
            <Text>教室号</Text>
            <InputNumber defaultValue={roomNumber} readOnly />
          </Space>
        </Space>
        <Flex vertical={true}>
          <Image width={104} height={104}
            src={generateQRCode(values.joinUrl)} />
          <Text>扫码观看</Text>
        </Flex>
      </Flex>
    </Space>
  )
}
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const joinPassword = props?.values?.configInfo?.joinPassword
  const roomNumber = props?.values?.roomNumber

  const items: TabsProps["items"] = [
    { key: "1", label: "老师/助教/巡课", children: <TeacherTabContent values={joinPassword} roomNumber={roomNumber} /> },
    { key: "2", label: "学生", children: <StudentTabContent values={joinPassword && joinPassword['3']} roomNumber={roomNumber} /> },
    { key: "3", label: "旁听生", children: <ListenerTabContent values={joinPassword && joinPassword['5']} roomNumber={roomNumber} /> },
  ];

  return (
    <Modal
      width={700}
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
