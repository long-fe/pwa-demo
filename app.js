/**
 * created by charsh-kop on 2020-03-15
 */

// 页面加载后 判断是否支持service worker
window.addEventListener('load', async e => {
    if ('serviceWorker' in navigator) {
        try {
            // 注册serviceWorker到sw.js文件中
            navigator.serviceWorker.register('/pwa-demo/sw.js', { scope: '/' });
            console.log('SW registered');
        } catch (error) {
            console.log('SW reg failed');
        }
    }
});
