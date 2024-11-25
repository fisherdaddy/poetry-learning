// 发送页面浏览事件
export const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag('config', 'G-TV2ML035CS', {
      page_path: path
    });
  }
}

// 发送自定义事件
export const trackEvent = (eventName, params = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
} 