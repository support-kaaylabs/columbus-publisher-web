/* eslint-disable no-useless-escape */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Button, Dropdown, Row, MenuProps, Modal } from 'antd';
import React, {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { get, isEmpty } from 'lodash';
import { getLayoutByType } from '../../shared/report-helper';
import { errorNotification } from '../../shared/globalVariables';
import {
  getUserProfile,
  searchModules,
  executeProgram,
} from '../../shared/urlHelper';
import {
  getCurrentWeek,
  getPreviousWeek,
  momentDateFormat,
} from '../../shared/date-helper';
import _ from 'lodash';
import EmailTag from '../../shared/Email/emailTag';

interface FilterModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: any;
}
const FilterModal: FC<FilterModalProps> = ({ open, setOpen, data }) => {
  console.log('data---', data);
  const [visible, setVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [autoComplete, setAutoComplete] = useState<any>({});
  const [scheduleObj, setScheduleObj] = useState({});
  const [showDate, setShowDate] = useState<boolean>(false);
  const [emailList, setEmailList] = useState<any>([]);
  const [email, setEmail] = useState('');
  const [emailSwitch, setEmailSwitch] = useState(false);
  const [dateObj, setDateObj] = useState({});
  const [eventLoading, setEventLoading] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState({ field: '', loading: false });
  const [apiData, setApiData] = useState({});
  const filterData = get(data, 'Filter_List', '');

  console.log('filterData', filterData);
  console.log('showDate', showDate);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(key);
  };
  const regExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleInputChange = (e: any) => {
    setEmailList((e || []).filter((mail: any) => regExp.test(mail)));
  };

  const handleSwitch = (e: any) => {
    if (e) {
      getUserProfile()
        .then((res: any) => {
          const emailId = _.get(res, 'data[0].Email_ID', '');
          setEmailList(
            [...emailList, emailId].filter((mail: any) => regExp.test(mail))
          );
          setEmail(emailId);
        })
        .catch((err: any) => {
          errorNotification(_.get(err, 'error', 'Something went wrong'));
        });
    } else {
      setEmailList((emailList || []).filter((mail: any) => mail !== email));
    }
    setEmailSwitch(!emailSwitch);
  };

  const getDateRangeValue = (propsData: any) => {
    const { key, value, onlyDate, dateAndTimeUTC } = propsData;
    const dateObj: any = {
      today: () =>
        getCurrentWeek({
          unit: 'days',
          type: 'day',
          value,
          onlyDate,
          dateAndTimeUTC,
        }),
      yesterday: () =>
        getPreviousWeek({
          unit: 'days',
          type: 'Day',
          onlyDate,
          dateAndTimeUTC,
        }),
      thisWeek: () =>
        getCurrentWeek({
          unit: 'weeks',
          type: 'week',
          value,
          onlyDate,
          dateAndTimeUTC,
        }),
      lastWeek: () =>
        getPreviousWeek({
          unit: 'weeks',
          type: 'week',
          value,
          onlyDate,
          dateAndTimeUTC,
        }),
      thisMonth: () =>
        getCurrentWeek({
          unit: 'months',
          type: 'month',
          value,
          onlyDate,
          dateAndTimeUTC,
        }),
      lastMonth: () =>
        getPreviousWeek({
          unit: 'months',
          type: 'month',
          onlyDate,
          dateAndTimeUTC,
        }),
      thisYear: () =>
        getCurrentWeek({
          unit: 'years',
          type: 'year',
          value,
          onlyDate,
          dateAndTimeUTC,
        }),
      lastYear: () =>
        getPreviousWeek({
          unit: 'years',
          type: 'year',
          onlyDate,
          dateAndTimeUTC,
        }),
      customDate: () => null,
      customDateRange: () => null,
      noDate: () => null,
    };
    return dateObj[_.camelCase(key)];
  };

  const onChange = (e: any, name: any, isDate: any = '') => {
    if (typeof isDate === 'object') {
      const pair = { key: _.get(isDate, 'key'), value: e };
      const result = getDateRangeValue(pair);
      const dates = _.get(isDate, 'key') === 'noDate' ? result : result();
      const dataObj: any = {
        ...dateObj,
        [name]: (dates || []).map((i: any) =>
          momentDateFormat(i, 'YYYY-MM-DD HH:mm:ss')
        ),
      };
      setDateObj(dataObj);
    } else if (isDate) {
      const dataObj = {
        ...dateObj,
        [name]: [
          momentDateFormat(e, 'YYYY-MM-DD HH:mm:ss'),
          momentDateFormat(e, 'YYYY-MM-DD HH:mm:ss'),
        ],
      };
      setDateObj(dataObj);
    }
    const isArray = e instanceof Array;
    let dateF;
    if (typeof isDate === 'boolean') {
      dateF = isArray
        ? (e || []).map((i) => momentDateFormat(i, 'YYYY-MM-DD'))
        : momentDateFormat(e, 'YYYY-MM-DD');
    } else dateF = e;
    const dataObj = { ...formData, [name]: dateF };
    setFormData(dataObj);
  };

  const onSelect = (e: any, name: any) => {
    const dataObj = { ...formData, [name]: e };
    setFormData(dataObj);
  };

  const fetchData = async (obj: any = {}, dataObj: any) => {
    try {
      const {
        field,
        tableName,
        dependentField = null,
        idField,
        searchField,
        extraQuery,
        reportId,
        name,
      } = obj;
      if (reportId) {
        setEventLoading(true);
        const response = await searchModules(reportId);
        setEventData(response.data.resp);
        setEventLoading(false);
      } else {
        setLoading({ field, loading: true });
        let fetchParams: any = {
          field: searchField,
          tableName,
          searchText: dataObj[field],
          idField,
        };
        if (dependentField && formData[dependentField]) {
          fetchParams = {
            ...fetchParams,
            dependentField: { [dependentField]: formData[dependentField] },
          };
        }
        if (extraQuery && !_.isEmpty(extraQuery)) {
          fetchParams.extraQuery = JSON.stringify(extraQuery);
        }
        const response = await searchModules(fetchParams);
        const options = _.map(
          _.isEmpty(response.data) ? [] : response.data,
          (i) => ({ label: i[searchField], value: i[idField] })
        );
        setLoading({ field, loading: false });
        setApiData({ ...apiData, [field]: options });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOptions = useCallback(
    _.debounce((obj, dataObj) => fetchData(obj, dataObj), 1000),
    []
  );

  const onSearch = (e: any, name: any, obj: any) => {
    const dataObj = { ...autoComplete, [name]: e };
    setAutoComplete(dataObj);
    fetchOptions(obj, dataObj);
  };

  const onClickData = (name: any, reportId: any) => {
    const obj = { name, reportId };
    fetchData(obj, null);
  };

  const handleSubmit = async () => {
    try {
      const params: any = {
        Related_ID: _.get(data, 'Report_ID'),
        Execution_Type: 'reports',
        Status: 'pending',
        Report_Name: _.get(data, 'Report_Name'),
      };
      if (!_.isEmpty(formData) || !_.isEmpty(dateObj)) {
        params.Parameters = { ...formData, ...dateObj };
      }
      if (emailList.length > 0) params.To_Email = emailList.toString();
      if (!_.isEmpty(scheduleObj)) params.scheduleObj = scheduleObj;
      await executeProgram(params);
      setVisible(false);
    } catch (error: any) {
      console.error(error);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Schedule Once',
      key: 'date',
    },
    {
      label: 'Weekly',
      key: 'weekly',
    },
    {
      label: 'Monthly',
      key: 'monthly',
    },
  ];

  const handleCancel = () => {
    setScheduleObj({});
    setShowDate(false);
  };

  const handleOk = (payload: any) => {
    setScheduleObj({ ...scheduleObj, ...payload });
    setShowDate(false);
  };

  const footer = (
    <div>
      {items && (
        <Dropdown menu={{ items, onClick }}>
          <span
            style={{
              float: 'left',
              cursor: 'pointer',
              color: 'cornflowerblue',
            }}
          >
            Schedule Report
          </span>
        </Dropdown>
      )}
      <Button key="back" onClick={() => setVisible(false)}>
        Cancel
      </Button>
      <Button key="submit" type="primary">
        Submit
      </Button>
    </div>
  );

  return (
    <Modal
      title="Report Options"
      open={open}
      onCancel={() => setOpen(false)}
      footer={footer}
    >
      <Row>
        {!isEmpty(data) && (
          <>
            <p>{`Filter - ${data.Report_Name}:`} </p>
          </>
        )}
        <Row>
          {filterData &&
            filterData.map((item: any) => {
              const { render, field, columnName, idField = '' } = item;
              const value =
                render === 'auto-complete'
                  ? autoComplete[field]
                  : formData[field];
              const options = {
                type: render,
                name: field,
                label: columnName,
                onChange,
                value,
                idField,
                autoCompleteOptions: {},
              };
              if (render === 'auto-complete') {
                options.autoCompleteOptions = {
                  onSelect,
                  onSearch,
                  apiData,
                  loading,
                };
              }
              if (render === 'drop') {
                options.autoCompleteOptions = {
                  onClick,
                  eventData,
                  eventLoading,
                  reportId: '',
                };
              }
              return getLayoutByType(options);
            })}
        </Row>
      </Row>
      <hr />
      <EmailTag
        emailList={emailList}
        handleInputChange={handleInputChange}
        handleSwitch={handleSwitch}
        emailSwitch={emailSwitch}
      />
    </Modal>
  );
};

export default FilterModal;
