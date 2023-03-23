/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable prefer-const */
import React, { FC, useRef, useEffect, useState } from 'react';
import { Table, Button, Input, DatePicker, Select, Checkbox } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { defaultPagination } from './globalVariables';
import _ from 'lodash';

const { RangePicker } = DatePicker;

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const CustomTable: FC = (props: any) => {
  const { rowClassName } = props;
  const prevProps = usePrevious(props);
  const [columnData, setColumnData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sorter, setSorter] = useState<{ key: any; order: string } | never[]>(
    []
  );
  const [filterData, setFilterData] = useState<any>({});
  const [pagination, setPagination] = useState<{
    current: number;
    pageSize: number;
    showSizeChanger: boolean;
    total: number | null;
  }>(defaultPagination);
  const Filter_Ok = 1;
  const Filter_Reset = 0;
  let paginationFlag = true;

  const getFilterData = (columnName: any, dataIndex: any, type: any) => ({
    filterDropdown: (param: any) => {
      const { setSelectedKeys, selectedKeys, confirm, clearFilters } = param;
      const addData = {
        [dataIndex]: selectedKeys,
        type: type,
      };
      return (
        <div className="custom-filter-dropdown">
          {['date', 'dateTime'].includes(type) ? (
            <RangePicker
              format={['DD-MM-YYYY', 'DD-MM-YYYY']}
              style={{ width: '100%' }}
              value={selectedKeys}
              onChange={(e: any) => setSelectedKeys(e ? formatDate(e) : [])}
              className="filter-date-select"
            />
          ) : ['multiTag'].includes(type) ? (
            <Select
              mode="tags"
              style={{ width: '100%' }}
              className="search-input"
              placeholder={`Filter by ${columnName}`}
              value={selectedKeys[0]}
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              onChange={(value) => setSelectedKeys(value ? [value] : [])}
            ></Select>
          ) : ['checkbox'].includes(type) ? (
            <Checkbox.Group
              options={props.checkBoxOption}
              defaultValue={['']}
              value={selectedKeys}
              onChange={(checked) => setSelectedKeys(checked)}
            />
          ) : (
            <Input
              autoFocus={true}
              placeholder={`Filter by ${columnName}`}
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              className="search-input"
            />
          )}
          {selectedKeys[0] && (
            <div className="filter-report-btn">
              <Button
                type="primary"
                onClick={() => {
                  onFilterTrigger(Filter_Ok, confirm, { dataIndex, addData });
                }}
                size="small"
                className="search-btn"
              >
                Ok
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  onFilterTrigger(Filter_Reset, clearFilters, {
                    dataIndex,
                    addData,
                  });
                }}
                size="small"
                className="search-btn"
              >
                Reset
              </Button>
            </div>
          )}
        </div>
      );
    },
    filterIcon: (filtered: any) => (
      <FilterOutlined style={{ color: filtered ? '#1890ff' : '#909090' }} />
    ),
  });

  const fetchData = (props: any, paginationSwitch: any) => {
    const { apiData, columns, additionalParams } = props;
    const finalPagination = paginationSwitch ? defaultPagination : pagination;
    const { current, pageSize } = finalPagination;
    let filtersDataSet = filterData;
    if (
      props.additionalParams &&
      props.additionalParams['filters'] &&
      Object.keys(props.additionalParams['filters']).length > 0
    ) {
      filtersDataSet = Object.assign(
        filtersDataSet,
        props.additionalParams['filters']
      );
    }
    let params = {
      page: current,
      limit: pageSize,
      sorter: JSON.stringify(sorter),
      filters: filtersDataSet
        ? JSON.stringify(_.omit(filtersDataSet, ['type']))
        : '',
      type: filtersDataSet.type ? filtersDataSet.type : '',
    };
    if (
      props.additionalParams &&
      Object.keys(props.additionalParams).length > 0
    ) {
      params = Object.assign(params, _.omit(additionalParams, ['filters']));
    }
    setLoading(true);
    apiData(params)
      .then((resp: any) => {
        setDataSource(resp.data.rows);
        setColumnData(columns);
        setPagination({ ...finalPagination, total: resp.data.count });
        handleTableData(columns);
        setLoading(false);
        paginationFlag = false;
      })
      .catch(() => {
        setLoading(false);
        paginationFlag = false;
      });
  };

  useEffect(() => {
    const currentAdditionalParams = _.get(props, 'additionalParams', {});
    const prevAdditionalParams = _.get(prevProps, 'additionalParams', {});
    if (
      Object.keys(currentAdditionalParams).length > 0 &&
      !_.isEqual(currentAdditionalParams, prevAdditionalParams)
    ) {
      paginationFlag = true;
      fetchData(props, paginationFlag);
    } else if (JSON.stringify(props) !== JSON.stringify(prevProps)) {
      fetchData(props, paginationFlag);
    } else if (props.loading) {
      fetchData(props, paginationFlag);
    }
  }, [props]);

  useEffect(() => {
    if (Object.keys(sorter).length > 0) {
      fetchData(props, paginationFlag);
    }
  }, [sorter]);

  const handleTableData = (columns: any) => {
    let preData: any = {};
    let columns_data = columns.map((obj: any) => {
      preData[obj.key] = '';
      let column_obj = {
        title: obj.title,
        dataIndex: obj.key,
        key: obj.key,
        type: obj.filterType,
        render: obj.render,
        attrFilterKey: obj.attrFilterKey,
        sorter: obj.sorter || false,
      };
      if (obj.sorter === true) {
        column_obj.sorter = true;
      }
      if (obj.filter === true) {
        const attrFilter = column_obj['attrFilterKey']
          ? column_obj['attrFilterKey']
          : column_obj['key'];
        column_obj = {
          ...column_obj,
          ...getFilterData(obj.title, attrFilter, obj.filterType),
        };
      }

      return column_obj;
    });
    setColumnData(columns_data);
  };

  const onFilterTrigger = (filterStatus: any, action: any, dataSet: any) => {
    let newFilterData: any = {};
    const { dataIndex, addData } = dataSet;
    const operation = () => {
      return setFilterData(newFilterData), action();
    };
    newFilterData = Object.assign(filterData, _.omit(addData, ['type']));
    if (filterStatus === Filter_Ok) {
      if (addData['type'] === 'dateTime' || addData['type'] === 'date') {
        newFilterData['type'] = dataIndex;
      }
      operation();
    } else {
      delete newFilterData[dataIndex];
      if (addData['type'] === 'dateTime' || addData['type'] === 'date') {
        delete newFilterData['type'];
      }
      operation();
    }
  };

  const formatDate = (e: any) => {
    return _.reduce(
      e,
      function (result: any, value: any, key: any) {
        key === 0
          ? result.push(value.startOf('day'))
          : result.push(value.endOf('day'));
        return result;
      },
      []
    );
  };

  const onTableChange = (pagination: any, sorter: any) => {
    const attrSorter = sorter['column'] && sorter['column']['attrFilterKey'];
    const sorterField: any = attrSorter ? attrSorter : sorter.field;
    if (Object.keys(sorter).length > 0) {
      setSorter({
        key: sorterField,
        order: sorter.order === 'ascend' ? 'ascend' : 'descend',
      });
      setPagination({ ...pagination });
    } else {
      setSorter({ key: sorterField, order: '' });
      setPagination({ ...pagination });
    }
  };

  return (
    <Table
      loading={loading}
      bordered={true}
      columns={columnData}
      className={props.className ? props.className : ''}
      dataSource={dataSource}
      onChange={onTableChange}
      //  pagination={pagination}
      rowClassName={rowClassName}
    />
  );
};

export default CustomTable;
