import React from 'react';
import { currentKeyType } from '../../shared/type';

const SettingDot = ({ currentKey }: currentKeyType) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={7} height={92}>
    <g data-name="Group 57206" transform="translate(-38 -455)">
      <path fill="none" stroke="#a9a9a9" d="M41.5 455v92" data-name="Line 30" />
      <circle
        cx={3.5}
        cy={3.5}
        r={3.5}
        fill={currentKey === 'profile' ? '#C20155' : '#222222'}
        data-name="Ellipse 16"
        transform="translate(38 480)"
      />
      <circle
        cx={3.5}
        cy={3.5}
        r={3.5}
        fill={currentKey === 'subscription' ? '#C20155' : '#222222'}
        data-name="Ellipse 17"
        transform="translate(38 516)"
      />
    </g>
  </svg>
);
export default SettingDot;