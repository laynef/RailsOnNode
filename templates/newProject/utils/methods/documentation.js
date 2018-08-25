const fs = require('fs');
const path = require('path');
const settings = require('../../webpack/settings');

module.exports = {

    documentation: ({ allRoutes, apiVersion }) => {
        let javascriptString = '';
        for (let i = 0; i < allRoutes.length; i++) {
            const route = allRoutes[i];
            const camelCased = `${route.method.toLowerCase()}${apiVersion.toUpperCase()}${route.route.split('/').slice(1).map(e => e[0].toUpperCase() + e.slice(1)).join('')}`;
            javascriptString += `function ${camelCased}() {
        var allData = ${JSON.stringify(route, null, 4)};
        var routeName = "${camelCased}";

        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        var formElement = document.getElementById(routeName + 'Form');
        var idElements = formElement.elements;
        
        var data = {};
        for (let d in idElements) {
            if (formElement.enctype) {
                formData.append(d.name, d.idElements.value);
            } else {
                data[d.name] = d.idElements.value;
            }
        }

        let length = 0;
        for (let d in data) {
            length += 1;
        }

        xhr.open(allData.method.toUpperCase(), allData.route, true);
        xhr.onload = function(oEvent) {
            if (xhr.status < 300) {
                oEvent.innerHTML = "";
            } else {
                oEvent.innerHTML = "";
            }
        };
        xhr.onerror = function(oEvent) {
            if (xhr.status >= 400 && xhr.status < 500) {
                oEvent.innerHTML = "";
            } else {
                oEvent.innerHTML = "";
            }
        };
        xhr.send((allData.method.toUpperCase() === "POST" && allData.method.toUpperCase() === "PUT" && allData.method.toUpperCase() === "PATCH") && length === 0  ? 
        formData : (allData.method.toUpperCase() === "POST" && allData.method.toUpperCase() === "PUT" && allData.method.toUpperCase() === "PATCH" && allData.method.toUpperCase() === "DELETE") && length === 0 ?
        data : undefined);
    };`;
        }

        fs.writeFileSync(path.join(__dirname, '..', '..', 'assets', settings.jsType, 'pages', 'docs', apiVersion, apiVersion + '.' + settings.jsType), javascriptString);
        fs.writeFileSync(path.join(__dirname, '..', '..', 'assets', settings.styleType, 'pages', 'docs', apiVersion, apiVersion + '.' + settings.styleType), `.card-shadow {
    box-shadow: 0 7px 14px 0 rgba(50,50,93,.1), 0 3px 6px 0 rgba(0,0,0,.07);
}
`);
    },

};
