import React, { FC } from 'react';
import { Switch, Select, Row, Tag } from 'antd';

interface EmailProps {
  emailList: any;
  handleInputChange: any;
  handleSwitch: any;
  emailSwitch: any;
}

const EmailTag: FC<EmailProps> = ({
  emailList,
  handleInputChange,
  handleSwitch,
  emailSwitch,
}) => {
  const tagRender = (tagValues: any): React.ReactElement => {
    const { label, closable, onClose } = tagValues;
    if (label) {
      return (
        <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
          {label}
        </Tag>
      );
    }
    return <Tag />;
  };

  return (
    <>
      <Row style={{ marginBottom: '10px' }}>Email Link: </Row>
      <Row>
        <Select
          mode="tags"
          showArrow={false}
          tagRender={tagRender}
          value={emailList}
          onChange={handleInputChange}
          style={{ width: '100%' }}
          options={emailList}
          placeholder="Enter your email address"
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
        />
      </Row>
      <Row>
        <div style={{ float: 'right' }}>
          Include Me: <Switch onChange={handleSwitch} />
        </div>
      </Row>
    </>
  );
};

export default EmailTag;
