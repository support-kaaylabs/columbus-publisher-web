import React from 'react';
import { Select } from 'antd';
import { chartSelectType } from '../../shared/type';

const ChartSelect: React.FC<chartSelectType> = ({chartMode, setChartMode }) => {
  return (
    <div className='select-div'>
      <p>Chart</p>
      <Select
        defaultValue={chartMode}
        style={{ width: 140 }}
        bordered={false}
        onChange={(value) => setChartMode(value)}
        options={[
          // { value: 'All', label: 'All' },
          { value: 'Yearly', label: 'YTD' },
          { value: 'Monthly', label: 'MTD' },
          { value: 'Weekly', label: 'Weekly' },
        ]} />
    </div>
  );
};

export default ChartSelect;