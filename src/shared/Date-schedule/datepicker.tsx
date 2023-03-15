/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { uniqBy, isEmpty } from 'lodash';
import moment, { Moment } from 'moment';
import {
  Modal, DatePicker, TimePicker, Row, Col,
} from 'antd';
import { weekDays, dateArr } from '../globalVariables';
import { errorNotification } from '../globalVariables';

const { RangePicker } = DatePicker;

const initialObj = {
  Scheduled_Time: moment(),
  Scheduled_At: moment().format('YYYY-MM-DD HH:mm:ss'),
};

const DateSchedule = (props:any) => {
  const {
    showDate, handleOk, handleCancel, scheduleObj, isEdit = false, handleUpdate, buttonLoading = false,
  } = props;
  const { Schedule_Type } = scheduleObj;
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [Schedule_Days, setScheduleDays] = useState<any>([]);
  const [scheduleRange, setScheduleRange] = useState<any>([]);
  const [scheduleDetails, setScheduleDetails] = useState<{
    Scheduled_Time: any;
    Scheduled_At: any;
}>(initialObj);
  const { Scheduled_Time, Scheduled_At } = scheduleDetails;

  const momentScheduleTime:any = moment(Scheduled_Time);

  const momentScheduleAt:any = moment(Scheduled_At);

  const isValidDate = (date:any) => {
    const result = moment(date).isValid();
    return result;
  };

  const getTime = (obj:any) => {
    const {
      Scheduled_Time, From,
    } = obj;
    if (isValidDate(From)) {
      return `${moment(From).format('YYYY-MM-DD')} ${Scheduled_Time}`;
    }
    return moment(`${moment().format('YYYY-MM-DD')} ${Scheduled_Time}`);
  };

  useEffect(() => {
    if (isEdit) {
      const {
        Schedule_Days = '', From, To,
      } = scheduleObj;
      const dates = !isEmpty(Schedule_Days) ? Schedule_Days.split(',').map((val:any) => Number(val)) : '';
      setScheduleDetails({
        ...scheduleObj,
        Scheduled_Time: moment.utc(getTime(scheduleObj)).local(),
      });
      setScheduleRange([moment(From), moment(To)]);
      setScheduleDays(dates);
      setIsSelectAll(dates.length === 7);
    }
  }, [scheduleObj]);

  const handleChangeDate = (name:any, date:any, dateString:any) => {
    setScheduleDetails({ ...scheduleDetails, [name]: date });
  };

  const handlePanelChange = (value:any, dateString:any) => {
    setScheduleRange(value);
  };
  const handleSelect = (day:any, value:any) => {
    if (isSelectAll && Schedule_Days.length <= 7) {
      setIsSelectAll(false);
    }
    if (Schedule_Days.includes(value)) {
      const uniqValue = Schedule_Days.filter((item:any) => item !== value);
      setScheduleDays(uniqBy([uniqValue]));
    } else {
      setScheduleDays(uniqBy([...Schedule_Days, value]));
    }
  };

  const handleSelectAll = () => {
    setIsSelectAll(!isSelectAll);
    setScheduleDays(isSelectAll ? [] : uniqBy([...Schedule_Days, ...weekDays.map((id:any) => id.key)]));
  };

  const disabledDate = (current:any) => current && current < moment().startOf('day');

  const DayPicker = () => (
    <>
      {(dateArr || []).map((day:any) => (
        <div
          className={`${Schedule_Days.includes(day) ? 'custom-date custom-week-selected' : 'custom-date'}`}
          onClick={() => handleSelect('day', day)}
        >
          {day}
        </div>
      ))}
    </>
  );

  const WeekPicker = () => (
    <>
      <div
        className={isSelectAll ? 'custom-week custom-week-selected' : 'custom-week'}
        onClick={handleSelectAll}
      >
        {isSelectAll ? 'De-Select All' : 'Select All'}
      </div>
      {(weekDays || []).map((day:any) => (
        <div
          className={`${Schedule_Days.includes(day.key) ? 'custom-week custom-week-selected' : 'custom-week'}`}
          onClick={() => handleSelect('day', day.key)}
        >
          {day.value}
        </div>
      ))}
    </>
  );

  const handleClose = () => {
    setScheduleDetails(initialObj);
    setIsSelectAll(false);
    setScheduleDays([]);
    handleCancel();
  };

  const handleSave = () => {
    const { Scheduled_At = '', Scheduled_Time = '' } = scheduleDetails;
    if (Schedule_Type !== 'date' && isEmpty(scheduleRange)) return errorNotification('Please select a date range');
    if (Schedule_Type === 'weekly' && isEmpty(Schedule_Days)) {
      return errorNotification('Please select a day to schedule');
    }
    if (Schedule_Type === 'date' && isEmpty(Scheduled_At)) return errorNotification('Please select a date to schedule');
    if (Schedule_Type === 'weekly' && isEmpty(Scheduled_Time)) return errorNotification('Please select a time to schedule');
    const scheduleYear = Schedule_Type === 'date' ? moment(Scheduled_At).format('YYYY') : '';
    const params = {
      Schedule_Type,
      Scheduled_At: Schedule_Type === 'date' ? moment(Scheduled_At).utc().format('YYYY-MM-DD') : '',
      Scheduled_Time: moment(Scheduled_Time).utc().format('HH:mm'),
      range: scheduleRange.map((val:any) => moment(val).utc().format('YYYY-MM-DD')),
      Schedule_Days,
    };
    if (Schedule_Type === 'date') params.range = [scheduleYear, scheduleYear];
    if (isEdit) {
      handleUpdate(params);
    } else {
      handleOk(params);
    }
  };

  return (
    <>
      <Modal
        title="Schedule Report"
        open={showDate}
        onOk={handleSave}
        okButtonProps={{ loading: buttonLoading }}
        onCancel={handleClose}
        maskClosable={false}
      >
        <>
          <Row gutter={[12, 12]}>
            {Schedule_Type !== 'date' ? (
              <Col span={14} className="mr-10">
                <Row className="mb_10">
                  <b>Schedule Range:</b>
                </Row>
                <Row>
                  <RangePicker
                    onChange={handlePanelChange}
                    disabledDate={disabledDate}
                    format="YYYY-MM-DD"
                    value={scheduleRange}
                    placeholder={['Start', 'End']}
                  />
                </Row>
              </Col>
            ) : (
              <Col span={14}>
                <Row className="mb_10">
                  <b>Schedule Date:</b>
                </Row>
                <Row>
                  <DatePicker
                    onChange={(date, dateString) => handleChangeDate('Scheduled_At', date, dateString)}
                    value={momentScheduleTime}
                    disabledDate={disabledDate}
                  />
                </Row>
              </Col>
            )}
            <Col span={8} className="mr-10">
              <Row className="mb_10">
                <b>Schedule Time:</b>
              </Row>
              <Row>
                <TimePicker
                  format="HH:mm"
                  style={{ width: '100%', float: 'right' }}
                  onChange={(date, dateString) => handleChangeDate('Scheduled_Time', date, dateString)}
                  value={momentScheduleAt}
                />
              </Row>
            </Col>
          </Row>
          <br />
          {Schedule_Type !== 'date' && (
            <Row gutter={[16, 16]}>
              <Row className="mb_10">
                <b>{`Schedule ${Schedule_Type === 'weekly' ? 'Day' : 'Date'}:`}</b>
              </Row>
              <Row>
                {Schedule_Type === 'weekly' && <WeekPicker />}
                {Schedule_Type === 'monthly' && <DayPicker />}
              </Row>
            </Row>
          )}
        </>
      </Modal>
    </>
  );
};

export default DateSchedule;
