const fs = require('fs');
const path = require('path');
const settings = require('../../webpack/settings');

module.exports = {

    documentation: ({ allRoutes, apiVersion }) => {
        let javascriptString = '';
        for (let i = 0; i < allRoutes.length; i++) {
            const route = allRoutes[i];
            const camelCased = `${route.method.toLowerCase()}${apiVersion.toUpperCase()}${route.route.split('/').slice(1).map(e => e[0].toUpperCase() + e.slice(1)).join('').split(':').map((e, i, a) => i === 0 && a.length > 1 ? e + 'Param' : a.length === 1 ? e : e[0].toUpperCase() + e.slice(1)).join('')}`;
            javascriptString += `window.${camelCased} = function() {
    var allData = ${JSON.stringify(route)};
    var formData = new FormData();
    var paramList = document.getElementById('${camelCased}ParamsForm') && document.getElementById('${camelCased}ParamsForm').elements ? document.getElementById('${camelCased}ParamsForm').elements : [];

    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var csrfHeader = { headers: { 'X-CSRF-Token': null } };
    csrfHeader.headers['X-CSRF-Token'] = csrfToken;

    var paramObject = {};
    var tempParamKey = null;
    for (var i = 0; i < paramList.length; i++) {
        var eleParam = paramList[i].value;
        if (i % 2 !== 0) {
            paramObject[':' + tempParamKey] = eleParam;
            tempParamKey = null;
        } else {
            tempParamKey = eleParam;
        }
    }

    var routeName = allData.route.split('/').map(e => paramObject[e] ? paramObject[e] : e).join('/');

    if (allData.method !== 'GET' || allData.method !== 'DELETE') {
        var bodyDataType = document.getElementById('${camelCased}DataType') && document.getElementById('${camelCased}DataType').value ? document.getElementById('${camelCased}DataType').value : false;
        var formBoolean = bodyDataType === 'Form Data';

        var bodyElements = [];
        var bodyRawElements = document.getElementById('${camelCased}BodyForm') && document.getElementById('${camelCased}BodyForm').elements ? document.getElementById('${camelCased}BodyForm').elements : [];
        for (var i = 0; i < bodyRawElements.length; i++) {
            var eleParam = bodyRawElements[i].value || null;
            bodyElements.push(eleParam);
        }

        bodyElements = bodyElements.filter(e => !!e);

        var bodyObject = bodyDataType === 'Form Data' ? new FormData() : {};
        var tempBodyKey = null;
        bodyElements.forEach((e, i) => {
            if (i % 2 !== 0) {
                if (formBoolean) {
                    bodyObject.append(tempBodyKey, e);
                    tempBodyKey = null;
                } else {
                    bodyObject[tempBodyKey] = e;
                    tempBodyKey = null;
                }
            } else {
                if (formBoolean) {
                    tempBodyKey = e;
                } else {
                    bodyObject[e] = null;
                    tempBodyKey = e;
                }
            }
        });
    }

    var qsElements = [];
    var qsRawElements = document.getElementById('${camelCased}QSForm') && document.getElementById('${camelCased}QSForm').elements ? document.getElementById('${camelCased}QSForm').elements : [];
    for (var i = 0; i < qsRawElements.length; i++) {
        var eleParam = qsRawElements[i].value || null;
        qsElements.push(eleParam);
    }

    qsElements = qsElements.filter(e => !!e);

    var qsObject = {};
    var tempQSKey = null;
    qsElements.forEach((e, i) => {
        if (i % 2 !== 0) {
            qsObject[tempQSKey] = e;
            tempQSKey = null;
        } else {
            qsObject[e] = null;
            tempQSKey = e;
        }
    });

    var qsLength = Object.keys(qsObject).length;
    var querystring = qsLength > 0 ? '?' : '';
    var qsCount = 0;
    if (querystring === '?') {
        for (var qs in qsObject) {
            if (qsLength - 1 === qsCount) {
                querystring += qs + '=' + qsObject[qs];
            } else {
                querystring += qs + '=' + qsObject[qs] + '&';
            }
        }
    }

    var args = allData.method === 'GET' || allData.method === 'DELETE' ? [routeName + querystring, csrfHeader] : [routeName + querystring, bodyObject, csrfHeader];
    var resultElement = document.getElementById('${camelCased}-results');

    axios[allData.method.toLowerCase()](...args)
        .then((resp) => {
            if (resp.status <= 300) {
                resultElement.innerText = JSON.stringify(resp.data, null, 4);
            } else {
                resultElement.innerText = JSON.stringify(resp.data, null, 4);
            }
        })
        .catch((err) => {
            resultElement.innerText = JSON.stringify(err.data, null, 4);
        });
};
    `;

            javascriptString += `window.${camelCased}NewBody = function() {
        var ele = document.getElementById('${camelCased}BodyForm');
        ele.innerHTML += '<div class="d-flex f-row"><input class="w-100 m-1 form-control" type="text" placeholder="Enter key"><input class="w-100 m-1 form-control" type="text" placeholder="Enter value"></div>';
    };
    
    `;

            javascriptString += `window.${camelCased}NewBodyFile = function() {
        var ele = document.getElementById('${camelCased}BodyForm');
        ele.innerHTML += '<div class="d-flex f-row"><input class="w-100 m-1 form-control" type="text" placeholder="Enter key"><input class="w-100 m-1 form-control" type="file" placeholder="Enter value"></div>';
    };

    `;

            javascriptString += `window.${camelCased}NewQS = function() {
        var ele = document.getElementById('${camelCased}QSForm');
        ele.innerHTML += '<div class="d-flex f-row"><input class="w-100 m-1 form-control" type="text" placeholder="Enter key"><input class="w-100 m-1 form-control" type="text" placeholder="Enter value"></div>';
    };
    `;
        }

        fs.writeFileSync(path.join(__dirname, '..', '..', 'assets', settings.jsType, 'pages', 'docs', apiVersion, apiVersion + '.' + settings.jsType), javascriptString);
        fs.writeFileSync(path.join(__dirname, '..', '..', 'assets', settings.styleType, 'pages', 'docs', apiVersion, apiVersion + '.' + settings.styleType), ``);
    },

};
