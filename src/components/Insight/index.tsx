import React, { useState, type FC } from 'react';
import { Col, Row } from 'antd';
import { DatePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { EyeOutlined, ArrowRightOutlined, SendOutlined } from '@ant-design/icons';
import { Collapse, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './Insight.scss';

const { Panel } = Collapse;

const onChange = (
  value: DatePickerProps['value'] | RangePickerProps['value'],
  dateString: [string, string] | string
) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};


interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Geography',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Category',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Click',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'CTA',
    key: 'tags',
    dataIndex: 'tags',

  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const genExtra = () => (
  <DownloadOutlined
    className='download-icons'
    onClick={(event) => {
      event.stopPropagation();
    }}
  />
);

const onChangeCollapse = (key: string | string[]) => {
  console.log(key[0]);
};

const Insight: FC = () => {
  return (
    <>
      <div className='header-insight'>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
          <Col className="gutter-row" span={6}></Col>
          <Col className="gutter-row" span={6}></Col>
          <Col className="gutter-row" span={6}> <div className='impres-title'>Impression to Click %</div> </Col>
          <Col className="gutter-row" span={6}> <div className='click-cta'>Click to CTA %</div>        </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
          <Col className="gutter-row" span={6}>
            <Space size={12} style={{ width: '100%' }}>
              <DatePicker onChange={onChange} placeholder="From Date" style={{ width: '100%' }} />
            </Space>
          </Col>
          <Col className="gutter-row" span={6}>
            <Space size={12}>
              <DatePicker onChange={onChange}  placeholder="To Date" />
            </Space>
          </Col>
          <Col className="gutter-row" span={6}>

            <Space size={12}>
              <div className='click-head'>
                <div>
                  <p>
                    <EyeOutlined />
                  </p>
                </div>
                <div>
                  <p>
                    <ArrowRightOutlined />
                  </p>
                </div>
                <div>
                  <p>
                    <SendOutlined />
                  </p>
                </div>
                <div>
                  <p>25%</p>
                </div>
              </div>
            </Space>
          </Col>
          <Col className="gutter-row" span={6}>
            <Space size={12}>
              <div className='click-Cta-head'>
                <div>
                  <p>
                    <EyeOutlined />
                  </p>
                </div>
                <div>
                  <p>
                    <ArrowRightOutlined />
                  </p>
                </div>
                <div>
                  <p>
                    <SendOutlined />
                  </p>
                </div>
                <div>
                  <p>30%</p>
                </div>
              </div>
            </Space>
          </Col>
        </Row>
        <br />
        {/* Collapse Section */}
        <div>
          <Space direction="vertical">
            <Collapse defaultActiveKey={['1']} onChange={onChangeCollapse}>
              <Panel header="Geography" key="1" extra={genExtra()}>
                <Table columns={columns} dataSource={data} />
              </Panel>
            </Collapse>
            <Collapse >
              <Panel header="Category" key="2" extra={genExtra()}>
                <Table columns={columns} dataSource={data} />
              </Panel>
            </Collapse>
          </Space>
        </div>
      </div>
    </>
  );
};

export default Insight;
