const fs = require('fs');
const path = require('path');


module.exports =  {

    createServiceWorker: () => {
		let now = Date();
        now = now.replace(/\s/g, '');
        const root = process.cwd();
        const distDir = (pathname, data) => {
            return fs.readdirSync(pathname).reduce((acc, item) => {
                const pathn = path.join(pathname, item);
                if (fs.lstatSync(pathn).isDirectory()) {
                    distDir(pathn, data);
                } else {
                    data.push(`'${pathn.replace(RegExp(root, 'g'), '')}?timestamp=${now}'`);
                }
                return acc;
            }, data);
        };

		const getImagePaths = fs.readdirSync(path.join(__dirname, '..', '..', 'assets', 'img')).map(e => `'/assets/img/${e}?timestamp=${now}'`);
        const getDistPaths = distDir(path.join(__dirname, '..', '..', 'assets', 'dist', 'pages'), []);
		const allFiles = getImagePaths.concat(getDistPaths);
		fs.writeFileSync(path.join(__dirname, '..', '..', 'assets', 'dist', 'sw.js'), `
/* eslint-disable */
// Version 0.6.2
let version = '0.6.2';
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open('rhn').then((cache) => {
            return cache.addAll([
                '/',
                '/assets/sw.js?timestamp=${now}',
                '/assets/manifest.json?timestamp=${now}',
                ${allFiles.join(',\n\t\t\t\t')}
            ])
            .then(() => self.skipWaiting());
		})
	);
});
self.addEventListener('fetch', (event) => {
	console.log('Fetch event for ', event.request.url);
	event.respondWith(
        caches.match(event.request, {ignoreSearch: true})
        .then((response) => {
			console.log('Network request for ', event.request.url);
			return response || fetch(event.request.url);
		})
	);
});
self.addEventListener('activate',  (event) => {
    console.log(self);
    console.log(event);
    event.waitUntil(self.clients.claim());
});
        `);
    fs.writeFileSync(path.join(__dirname, '..', '..', 'assets', 'dist', 'manifest.json'), fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'manifest.json'), { encoding: 'utf8' }))
    }
};
