import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    // 这部分代码将在页面加载完成后执行
    // const language = navigator.language || navigator.userLanguage;
    const language = window.location.host?.includes('.cn') ? 'zh-CN' : 'en';

    // 检查语言是否是中文
    if (language.includes('zh-CN')) {
      window.location.href = '/zh-CN/getting-started';
    } else {
      // 为其他语言添加更多条件或保留为默认语言
      window.location.href = '/getting-started';  // 示例
    }
  }, []);

  // 页面内容（如果有的话）在重定向发生之前可能会短暂显示
  return <div></div>;
}

export default Home;