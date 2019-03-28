require('dotenv').config();
const cluster = require('cluster');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { createServiceWorker } = require('./utils');
const isProduction = process.env.NODE_ENV === 'production';
const isHttps = !!process.env.LOCAL_HTTPS;
const numCPUs = isProduction ? 8 : 1;
createServiceWorker();

// Master process
// This is the node that runs and controls where to distribute traffic it is slave processors
// This follows the master to slave model because the master is distribute the work hitting your server
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is in control running with ${numCPUs} threads`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        // Child processes have event listeners
        // Events: ChildProcess { _events:  { internalMessage: [Array], error: [Function], message: [Function], exit: [Object], disconnect: [Object] }, }
        // Therefore to add listeners for my master cluster I will define my listeners after they are forked
        // With the boolean flag: { isMaster: false }
        // The parameter for this function is your .env variables please clone them
        // with an import at the top of your file or passing them in for different variables for each
        cluster.fork();
    }

    // Order does not matter on these event listeners because they are the key names
    // for child process however you can provide extra events to the master
    // These child process events tell the master how to handle their actions
    // when this events take place
    // The importance on different events on master and slaves
    // is to have one master so EADDRINUSE does not occur floating on your EC2 (Virtual Machine)
    cluster.on('online', function (worker) {
        // Your process is healthy and ready to do work
        if (worker.process.connected) console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('disconnect', (worker) => {
        // This will emit event 'exit' after this function
        console.log(`worker ${worker.process.pid} disconnected a new one will be create once it exits`);
    });

    cluster.on('exit', (worker, exitCode, signalCode) => {
        console.log(`worker ${worker.process.pid} died`);
        // Create a new child process after one has been killed
        cluster.fork();
        console.log(`worker ${worker.process.pid} is attempting to signal for a new worker to take it's place`);
    });
} else {
    // isMaster will be false
    // isWorker will be true: set the children's work

    if (isHttps) {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        const server = https.createServer({
            key: fs.readFileSync(path.join(__dirname, 'openssl', 'example-key.pem'), { encoding: 'utf8' }),
            cert: fs.readFileSync(path.join(__dirname, 'openssl', 'example-cert.pem'), { encoding: 'utf8' }),
        }, require('./app'));
        server.listen(443, () => {
            console.log(`Running on your custom DNS: Default is https://www.example.com`);
        });
    } else {
        const server = http.createServer(require('./app'));
        const httpPort = process.env.PORT || 8080;
        server.listen(httpPort, () => {
            console.log(`Running on port ${httpPort}`);
        });
    }
}
