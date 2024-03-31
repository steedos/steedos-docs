var language = navigator.language || navigator.browserLanguage || navigator.userLanguage || 'zh-CN';
var widgetcode = "siqa13784a365e3a48255bd3688df5f7bfd41f7123553e54810788655a71964452e";
if (language.startsWith('zh'))
  widgetcode = "siq45532d4ac4086e1054d59aa81e5c696a";

var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: widgetcode, values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zohopublic.com.cn/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);