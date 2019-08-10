const fs = require('fs');
const path = require('path');
const settings = require('../../webpack/settings');

module.exports = {

    createServiceWorker: () => {
        let now = Date();
        now = now.replace(/\s/g, '');
        const root = process.cwd();
        const distDir = (pathname, data = []) => {
            return fs.readdirSync(pathname).reduce((acc, item) => {
                const pathn = path.join(pathname, item);
                if (fs.lstatSync(pathn).isDirectory()) {
                    distDir(pathn, data);
                } else {
                    data.push(`'${pathn.replace(RegExp(root, 'g'), '')}?id=${global.hashId}'`);
                }
                return acc;
            }, data);
        };

        const routesDir = (pathname, data = []) => {
            return fs.readdirSync(pathname).reduce((acc, item) => {
                const pathn = path.join(pathname, item);
                if (fs.lstatSync(pathn).isDirectory()) {
                    routesDir(pathn, data);
                } else {
                    const pathArray = pathn.replace(RegExp(root, 'g'), '').replace(RegExp(`/assets/${settings.jsType}/pages`, 'g'), '').split('/');
                    if (pathArray[1] !== 'docs' && pathArray[1] !== 'errors') {
                        pathArray.pop();
                        data.push(`'${pathArray.length > 1 ? pathArray.join('/') : '/'}'`);
                    }
                }
                return acc;
            }, data);
        };

        const getImagePaths = fs.readdirSync(path.join(__dirname, '..', '..', 'assets', 'img')).map(e => `'/assets/img/${e}?id=${global.hashId}'`);
        const routesPath = routesDir(path.join(__dirname, '..', '..', 'assets', settings.jsType, 'pages'));
        const getDistPaths = distDir(path.join(__dirname, '..', '..', 'assets', 'dist'), routesPath);
        const allFiles = getDistPaths.concat(getImagePaths);
        fs.writeFileSync(path.join(__dirname, '..', '..', 'assets', 'dist', 'sw.js'), `
/* eslint-disable */
// Version 0.6.2
const version = '${global.hashId}';
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(version).then(function(cache) {
            return cache.addAll([
                ${allFiles.join(',\n\t\t\t\t')}
            ])
            .then(function() { self.skipWaiting() });
		})
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
    caches.match(event.request)
        .then(function (response) {
                return fetch(event.request).catch(function () {
                    return response;
                })
            })
        )
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName !== version;
                }).map(function(cacheName) {
                return caches.delete(cacheName);
                })
            ).then(function () {
                return self.clients.claim();
            });
        })
    );
});
  
        `);
        fs.writeFileSync(path.join(__dirname, '..', '..', 'assets', 'dist', 'manifest.json'), fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'manifest.json'), { encoding: 'utf8' }))
    }
};
