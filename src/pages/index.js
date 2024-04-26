import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


import { Hero } from '@site/src/components/salient/Hero'
import { PrimaryFeatures } from '@site/src/components/salient/PrimaryFeatures'
import { SecondaryFeatures } from '@site/src/components/salient/SecondaryFeatures'
import { CallToAction } from '@site/src/components/salient/CallToAction'
import { Pricing } from '@site/src/components/salient/Pricing'

function Home() {
  // 页面内容（如果有的话）在重定向发生之前可能会短暂显示

  const {i18n} = useDocusaurusContext();

  if (i18n.currentLocale === "en") {
    return (
      <Layout title="Steedos">
        <Hero/>
  
      </Layout>
    );
  } else {

    return (
      <Layout title="Steedos">
        <Hero/>
  
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
  
        <Pricing />
      </Layout>
    );
  }
}

export default Home;