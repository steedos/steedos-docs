import React from 'react';
import Layout from '@theme/Layout';
import {Redirect, useLocation} from '@docusaurus/router';

export default function Home() {
    // const userLang = navigator?.language || navigator?.userLanguage || "zh-CN"; 
    const userLang = 'zh-CN';

    if (userLang.startsWith('zh'))
        return  <Redirect to="/zh-CN/overview" />
    else
        return  <Redirect to="/overview" />
}

