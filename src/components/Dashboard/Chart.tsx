import React, { useState, useEffect, type FC } from 'react';
import { Tabs, Row, Select, Space, Spin } from 'antd';
import './Chart.scss';
import Chart from 'react-apexcharts';
import { getChartData } from '../../shared/urlHelper';
import { errorNotification } from '../../shared/globalVariables';

const { TabPane } = Tabs;

const Charts: FC = () => {
  const [counts, setCounts] = useState([]);
  const [dates, setDates] = useState([]);
  const [chartType, setChartType] = useState('PRODUCT_VIEWS');
  const [chartMode, setChartMode] = useState('Daily');
  const [chartColor, setChartColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [seriesName, setSeriesName] = useState('Impressions');

  useEffect(() => {
    fetchData();
  }, [chartType, chartMode]);

  const fetchData = () => {
    const sellerId = localStorage.getItem('User_ID');
    const params = { sellerId, eventName: chartType, chartMode };
    setLoading(true);
    getChartData(params).then((resp) => {
      if (resp.success) {
        const counts = resp.data.map((id: any) => id.Count);
        const dates = resp.data.map((id: any) => id.date);
        setCounts(counts);
        setDates(dates);
        setChartColor(
          chartType === 'PRODUCT_VIEWS'
            ? '#e53935'
            : null || chartType === 'PRODUCT_CLICK'
              ? '#AFBCFB'
              : null || chartType === 'FAVOURITES_CLICK'
                ? '#79DE8D'
                : null || chartType === 'CALL_TO_ACTION'
                  ? '#f2eaca'
                  : '');
      }
      setLoading(false);
    }).catch((err) => {
      errorNotification(err);
      setLoading(false);
    });
  };

  const handleTab = (key: any) => {
    setChartType(key);
    if (key === 'PRODUCT_VIEWS') {
      setSeriesName('Impressions');
    } else if (key === 'PRODUCT_CLICK') {
      setSeriesName('Clicks');
    } else if (key === 'CALL_TO_ACTION') {
      setSeriesName('Call To Action');
    } else if (key === 'FAVOURITES_CLICK') {
      setSeriesName('Favourite');
    }
  };

  const options = {
    chart: {
      id: 'apexchart-example',
      selection: {
        enabled: true
      },
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: undefined
      },
      bodyFont: {
        family: 'Lato'
      },
      titleFont: {
        family: 'Lato'
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: true,
        format: 'dd MMM',
        formatter: undefined,
      },
      y: {
        formatter: undefined,
      },
      z: {
        formatter: undefined,
        title: 'Size: '
      },
      marker: {
        show: true,
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 10,
        offsetY: 10,
      },
    },
    dataLabels: {
      enabled: false
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        }
      },
      hover: {
        filter: {
          type: 'lighten',
          value: 0.15,
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'darken',
          value: 0.35,
        }
      },
    },
    grid: {
      show: true,
      strokeDashArray: 6,
    },
    colors: [chartColor],
    fill: {
      colors: [chartColor]
    },
    yaxis: [{
      axisTicks: {
        show: true
      },
      labels: {
        style: {
          colors: 'grey',
          fontSize: '18px',
        }
      },
      axisBorder: {
        show: true,
        color: '#000000',
        width: 2.5
      }
    }],
    xaxis: {
      categories: dates,
      axisTicks: {
        show: true
      },
      stroke: {
        curve: ['smooth', 'straight', 'stepline']
      },
      labels: {
        style: {
          colors: 'grey',
          fontSize: '18px',
        }
      },
      axisBorder: {
        show: true,
        color: '#000000',
        height: 2.5
      }
    }
  };

  const series = [{
    name: seriesName,
    data: counts
  }];

  return (
    <>
      <Row className="mt-4" style={{ margin: '30px' }}>
        <div className='chartStyle'>
          <Tabs onChange={handleTab} tabBarExtraContent={
            <Space className='drop-btn'>
              <Select
                defaultValue="Daily"
                style={{ width: 140 }}
                bordered={false}
                onChange={(value) => setChartMode(value)}
                options={[
                  { value: 'Daily', label: 'Daily' },
                  { value: 'Monthly', label: 'Monthly' },
                ]}
              />
            </Space>
          } className='chartStyle'>
            <TabPane tab="Impressions" key="PRODUCT_VIEWS">
              <div id="chart">
                <Chart options={options} series={series} type="area" width={'100%'} height={320} />
              </div>
            </TabPane>
            <TabPane tab="Clicks" key="PRODUCT_CLICK">
              <div id="chart">
                <Chart options={options} series={series} type="area" width={'100%'} height={320} />
              </div>
            </TabPane>
            <TabPane tab="Call To Action" key="CALL_TO_ACTION">
              <div id="chart">
                <Chart options={options} series={series} type="area" width={'100%'} height={320} />
              </div>
            </TabPane>
            <TabPane tab="Favourite" key="FAVOURITES_CLICK">
              <div id="chart">
                <Chart options={options} series={series} type="area" width={'100%'} height={320} />
              </div>
            </TabPane>
          </Tabs>
        </div>
        {loading && (<div className='loading'>
          <Spin size='large' />
        </div>)}
      </Row>
    </>
  );
};

export default Charts;

