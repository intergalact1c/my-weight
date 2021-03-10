import React from 'react';

import ContentLoader from 'react-content-loader';

function WeightingFormLoading() {
  return (
    <div className="info app__block">
      <ContentLoader
        speed={2}
        width="100%"
        height={161}
        backgroundColor="#dadada"
        foregroundColor="#ecebeb">
        <rect x="0" y="0" rx="4px" width="100%" height="43"/>
        <rect x="0" y="63" rx="4px" width="100%" height="43"/>
        <rect x="0" y="126" rx="4px" width="109" height="36"/>
      </ContentLoader>
    </div>
  );
}

export default WeightingFormLoading;
