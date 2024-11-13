import { Modal } from 'antd';
import React from 'react';

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

const UpdateForm: React.FC<UpdateFormProps> = (props) => {

  return (
    <Modal
      width={700}
      style={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={'课前准备'}
      open={props.updateModalOpen}

      onCancel={() => {
        props.onCancel();
      }}
    >
      dom
    </Modal>
  );
};

export default UpdateForm;
