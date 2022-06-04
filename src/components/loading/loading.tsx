import React from 'react';

function Loader(): JSX.Element {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '.5rem' }}>
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      <p data-testid="loading">Loading ...</p>
    </div>

  );
}

export default Loader;

