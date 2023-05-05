/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-case-declarations */
import React from 'react';
import { InputNumber, Select, Col, Input, DatePicker } from 'antd';
import {
  formatDate,
  subtractDates,
  getCurrentWeek,
  getPreviousWeek,
} from './date-helper';
import _ from 'lodash';

const dateOptions: any = [
  { id: 1, name: 'Today', type: 'today' },
  { id: 2, name: 'Prior Day', type: 'yesterday' },
  { id: 3, name: 'This Week', type: 'thisWeek' },
  { id: 4, name: 'Last Week', type: 'lastWeek' },
  { id: 5, name: 'This Month', type: 'thisMonth' },
  { id: 6, name: 'Last Month', type: 'lastMonth' },
  { id: 7, name: 'Year to Date', type: 'thisYear' },
  { id: 8, name: 'Last Year', type: 'lastYear' },
  { id: 9, name: 'Custom Date', type: 'customDate' },
];

const getDateType = (dateType: any) => {
  const dateObj: any = {
    today: () => formatDate({ fmt: 'MM/DD/YYYY' }),
    yesterday: () => subtractDates({ fmt: 'MM/DD/YYYY', unit: 'day' }),
    thisWeek: () =>
      getCurrentWeek({ unit: 'weeks', fmt: 'DD MMM', type: 'Week' }),
    lastWeek: () =>
      getPreviousWeek({ unit: 'weeks', fmt: 'DD MMM', type: 'Week' }),
    thisMonth: () => formatDate({ fmt: 'MMM YYYY' }),
    lastMonth: () => subtractDates({ fmt: 'MMM YYYY', unit: 'month' }),
    thisYear: () => formatDate({ fmt: 'YYYY' }),
    lastYear: () => subtractDates({ fmt: 'YYYY', unit: 'year' }),
    customDate: 'customDate',
    noDate: 'noDate',
  };
  const result = dateObj[_.camelCase(dateType)];
  return result;
};
const optionsRenderer = () => {
  return _.map(dateOptions, (itt: any) => (
    <Select.Option key={itt.type} value={getDateType(itt.type)}>
      <b>{itt.name}</b>
      <span className="float-right">{getDateType(itt.type)}</span>
    </Select.Option>
  ));
};

export const getLayoutByType: React.FC<any> = (props) => {
  const {
    type,
    onChange = () => {},
    value,
    autoCompleteOptions = {},
    name = '',
    label,
    filter = {},
  } = props;
  let layout = <></>;
  switch (type) {
  case 'auto-complete':
    const {
      onSelect = () => {},
      onSearch = () => {},
      apiData,
      loading,
    } = autoCompleteOptions;
    layout = (
      <Col className="reports-filter" span={12}>
        <Col>
          <label>{label}:</label>
        </Col>
        <Col>
          <Select
            style={{ width: 200 }}
            loading={
              _.get(loading, 'field') === name
                ? _.get(loading, 'loading')
                : false
            }
            onSearch={(e) => onSearch(e, name, filter)}
            onChange={(e) => onSelect(e, name, filter)}
            showSearch
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            allowClear
            notFoundContent={null}
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
          >
            {(apiData[name] || []).map((item: any) => (
              <Select.Option key={item.key} value={item.label}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Col>
    );
    break;
  case 'date':
    layout = (
      <Col className="reports-filter" span={12}>
        <Col>
          <label>{label}:</label>
        </Col>
        <Col>
          {!['customDate', 'customDateRange'].includes(value) && (
            <Select
              optionLabelProp="value"
              onChange={(e, option) => onChange(e, name, option)}
              style={{ width: 200 }}
              value={value}
              allowClear
            >
              {optionsRenderer()}
            </Select>
          )}
          {['customDate'].includes(value) && (
            <DatePicker
              allowClear
              className="report-date"
              onChange={(e) => onChange(e, name, true)}
            />
          )}
        </Col>
      </Col>
    );
    break;
  case 'number':
    const { min = 0, max } = filter;
    layout = (
      <Col className="reports-filter" span={12}>
        <Col>
          <label>{label}:</label>
        </Col>
        <Col>
          <InputNumber
            min={min}
            max={max}
            onChange={(e) => onChange(e, name)}
            name={name}
          />
        </Col>
      </Col>
    );
    break;
  case 'drop':
    const {
      onClick = () => {},
      eventData,
      reportId,
      eventLoading,
    } = autoCompleteOptions;
    layout = (
      <Col className="reports-filter" span={12}>
        <Col>
          <label>{label}:</label>
        </Col>
        <Col>
          <Select
            optionLabelProp="value"
            loading={eventLoading}
            onFocus={() => onClick(name, reportId)}
            onChange={(e) => onChange(e, name)}
            style={{ width: 200 }}
            value={value}
            allowClear
          >
            {(eventData || []).map((item: any) => (
              <Select.Option key={item.key} value={item.event_name}>
                {item.event_name}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Col>
    );
    break;
  case 'text':
    layout = (
      <Col className="reports-filter" span={12}>
        <Col>
          <label>{label}:</label>
        </Col>
        <Col>
          <Input
            onChange={(e) => onChange(e.target.value, name)}
            name={name}
            style={{ width: 200 }}
          />
        </Col>
      </Col>
    );
    break;
  default:
  }
  return layout;
};
