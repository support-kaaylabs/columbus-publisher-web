/* eslint-disable no-mixed-spaces-and-tabs */
import React, { FC, useState } from 'react';
import {ArrowLeftOutlined} from '@ant-design/icons';
import { Button, Row } from 'antd';
import {useNavigate, useLocation} from 'react-router-dom';
import FilterModal from './filter-modal';


const ReportTable: FC = () => {
  const navigate = useNavigate();

  //  const [tableName , setTableName] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState({});
  const location = useLocation();
  console.log('location', location);
  
  const data = location.state;
  console.log('location.state', data);

  const goBack = ():any => {
    console.log('check-button');
    navigate('/');
  };

  const openModel = (): any => {
    setOpen(true);
    setModalData(data);
  };



  
  console.log('open', open);
  
  return (
    <div style={{display:'flex', justifyContent: 'space-between', marginTop: 15}}>
      <div style={{marginLeft : 30,}}>
        <Row gutter={16}>
          <div onClick={goBack} className= 'back-icon'>
            <ArrowLeftOutlined />
		  </div>
          <div style={{marginLeft : 10,}}>{data.Report_Name}</div>
        </Row>
	  </div>
	  <div>
        <Row>
          <div style={{marginRight : 30,}}>
            <Button type='primary' onClick={openModel}>Generate New Report</Button>
          </div>
          <div style={{marginRight : 30,}}>
            <Button type='primary' ><i className="fas fa-refresh" /></Button>
          </div>
        </Row>
        {open && <FilterModal open={open} setOpen={setOpen} data={modalData} />}
	  </div>
    </div>
  );
};

export default ReportTable;
