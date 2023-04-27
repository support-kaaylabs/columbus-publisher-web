import React from 'react';
import './progressbar.scss';

const ProgressBar = (props: any) => {
  return (
    <div className="container-styles">
      <button
        className="filler-styles"
        style={{
          width: `${props.styles}`,
          background: `${props.background}`,
          transition: 'width 3s ease',
        }}
      >
        <span className="label-styles">
          <img src={props.image} alt="Eye" />
          <p style={{ color: `${props.color}` }}>{props.value}</p>
        </span>
      </button>
    </div>
  );
};

export default ProgressBar;
