import React from 'react';
import ContentLoader from 'react-content-loader';

const WeightingLoading = () => {
  return (
    <div className="weighting app__block">
      <ContentLoader
        speed={2}
        width="100%"
        height={220}
        backgroundColor="#dadada"
        foregroundColor="#ecebeb">
        <rect x="0" y="28" rx="4px" width="100%" height="38"/>
        <rect x="0" y="104" rx="4px" width="100%" height="38"/>
        <rect x="0" y="180" rx="4px" width="100%" height="38"/>
      </ContentLoader>
    </div>
  );
};

export default WeightingLoading;
