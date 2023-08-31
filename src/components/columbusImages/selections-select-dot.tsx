import React from 'react';
import { currentKeyType } from '../../shared/type';

const SelectionsDot = ({currentKey}: currentKeyType) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={7} height={128.082}>
    <g data-name="Group 57205" transform="translate(-38 -454.919)">
      <path
        fill="none"
        stroke="#a9a9a9"
        d="M41.616 454.92 41.4 583"
        data-name="Path 8377"
      />
      <circle
        cx={3.5}
        cy={3.5}
        r={3.5}
        fill={currentKey === 'management' ? '#C20155' : '#222222'}
        data-name="Ellipse 16"
        transform="translate(38 480)"
      />
      <circle
        cx={3.5}
        cy={3.5}
        r={3.5}
        fill={currentKey === 'metrics' ? '#C20155' : '#222222'}
        data-name="Ellipse 17"
        transform="translate(38 516)"
      />
      <circle
        cx={3.5}
        cy={3.5}
        r={3.5}
        fill={currentKey === 'analysis' ? '#C20155' : '#222222'}
        data-name="Ellipse 17"
        transform="translate(38 552)"
      />
    </g>
  </svg>
);
export default SelectionsDot;

