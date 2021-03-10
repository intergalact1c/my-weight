import React from 'react';

import ContentLoader from 'react-content-loader';

function ProfileLoading() {
  return (
    <div className="profile app__block">
      <ContentLoader
        className="content-loader content-loader_bg"
        speed={2}
        width="100%"
        height={166}
        backgroundColor="#dadada"
        foregroundColor="#ecebeb">
        <circle cx="50" cy="50" r="50"/>
        <rect x="130" y="0" rx="4px" width="160" height="15"/>
        <rect x="130" y="26" rx="4px" width="160" height="15"/>
        <rect x="130" y="52" rx="4px" width="160" height="15"/>
        <rect x="130" y="78" rx="4px" width="160" height="15"/>
        <rect x="130" y="104" rx="4px" width="160" height="15"/>
        <rect x="130" y="136" rx="4px" width="118" height="30"/>
      </ContentLoader>
      <ContentLoader
        className="content-loader content-loader_sm"
        speed={2}
        width="100%"
        height={168}
        backgroundColor="#dadada"
        foregroundColor="#ecebeb">
        <circle cx="41" cy="41" r="41"/>
        <rect x="102" y="0" rx="4px" width="156" height="15"/>
        <rect x="102" y="26" rx="4px" width="156" height="15"/>
        <rect x="102" y="52" rx="4px" width="156" height="15"/>
        <rect x="102" y="78" rx="4px" width="156" height="15"/>
        <rect x="102" y="104" rx="4px" width="156" height="15"/>
        <rect x="102" y="138" rx="4px" width="118" height="30"/>
      </ContentLoader>
    </div>
  );
}

export default ProfileLoading;
