import React from 'react';

const style = ' w-full text-white font-bold py-1 px-2 rounded text-left';

const Button = {
  Message: (props) => {
    const { text } = props;
    return (
      <button className={`bg-blue-500 hover:bg-blue-700${style}`} type="button">
        <div className="table w-full">
          <div className="table-row">
            <div className="table-cell line btn-icon">
              <i className="fas fa-paper-plane fa-fw" />
            </div>
            <div className="table-cell text-center">{text}</div>
          </div>
        </div>
      </button>
    );
  },
  Mail: (props) => {
    const { text } = props;
    return (
      <button className={`bg-red-500 hover:bg-red-600${style}`} type="button">
        <div
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          className="table w-full"
        >
          <div className="table-row">
            <div className="table-cell btn-icon line">
              <i className="fas fa-envelope fa-fw" />
            </div>
            <div className="table-cell text-center">{text}</div>
          </div>
        </div>
      </button>
    );
  },
  Green: (props) => {
    const { text } = props;
    return (
      <button
        className={`bg-green-500 hover:bg-green-600${style}`}
        type="button"
      >
        {text}
      </button>
    );
  },
};

export default Button;
