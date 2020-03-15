/**
 * created by charsh-kop on 2020-03-15
 */

// 设定缓存的版本
const CACHE_VERSION = "cache_v1.0";
// 需要缓存的资源
const cacheResource = [
    '/project/phone.html',
];
 
// self 为当前 scope 内的上下文
self.addEventListener('install', async event => {
    // 添加新版本缓存
    let cache = await caches.open(CACHE_VERSION);
    cache.addAll(cacheResource);
    // skipWaiting 安装跳过等待阶段，直接进入 activate
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            // 清理客户端
            clients.claim(),
            // 缓存版本管理
            caches.keys().then(cacheList => Promise.all(
                cacheList.map(name => {
                    if(name !== CACHE_VERSION) {
                        // 清理旧版本缓存
                        caches.delete(name)
                    }
                })
            ))
        ])
    )
});


// 缓存所有资源
async function fetchRequsetFunc(event, req) {
    let cache = await caches.open(CACHE_VERSION);
    return fetch(req, { credentials: 'include' }).then(response => {
        const responseCache = response.clone();
        cache.put(event.request, responseCache)
        return response
    })
}
// 监听请求
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(res => {
            // 存在缓存，则返回，减少一次请求
            if(res) {
                return res
            }
            // 不存在缓存，进行下一步处理
            // 拷贝原始请求
            const fetchRequest = event.request.clone();
            return fetchRequsetFunc(event, fetchRequest)
        })
    )
})
