import React from 'react';
import './progressbar.scss';

const ProgressBar = (props: any) => {
  return (
    <div className="containerStyles">
      <button
        className="fillerStyles"
        style={{
          width: `${props.styles}`,
          background: `${props.background}`,
          transition: 'width 3s ease',
        }}
      >
        <span className="labelStyles">
          <img src={props.image} alt="Eye" />
          <p style={{ color: `${props.color}` }}>{props.value}</p>
        </span>
      </button>
    </div>
  );
};

export default ProgressBar;