import React from 'react';

function Div() {
  return <div />;
}

function Loader() {
  return (
    <div className="inset-0 fixed center z-10 bg-transparent">
      <div className="lds-ring">
        <Div />
        <Div />
        <Div />
        <Div />
      </div>
    </div>
  );
}

export default Loader;
