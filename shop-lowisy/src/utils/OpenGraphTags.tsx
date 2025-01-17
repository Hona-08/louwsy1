import React from "react";

const OpenGraphTags: React.FC = () => {
  return (
    <React.Fragment>
      <meta
        property="og:url"
        content="https://uat-restaurant.lowisy.com"
      />
      {/* thumbnail And title for social media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Lowisy.com" />
      <meta
        property="og:description"
        content="Local Economy First"
      />
      <meta property="og:image" content="/assets/images/landing/logo.png" />
      
    </React.Fragment>
  );
};

export default OpenGraphTags;
