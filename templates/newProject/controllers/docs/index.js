const fs = require('fs');
const path = require('path');

module.exports = ({ apiVersion, allRoutes }) => (req, res) => {
    let javascriptString = '';
    for (let route in allRoutes) {
        javascriptString += `function ${route.method.toLowerCase()}${apiVersion.toUpperCase()}${route.route.split('/').map(e => e[0].toUpperCase() + e.slice(1)).join('')}() {
    var allData = ${JSON.stringify(route, null, 4)};
    var routeName = "${route.method.toLowerCase()}${apiVersion.toUpperCase()}${route.route.split('/').map(e => e[0].toUpperCase() + e.slice(1)).join('')}";

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

    let jsDir = '';
    fs.readdirSync(path.join(__dirname, '..', '..', 'assets')).forEach(dir => {
        const jsTypes = {
            'js': 'js',
            'react': 'react',
            'angular': 'angular',
            'vue': 'vue',
        };
        jsDir += jsTypes[dir];
    });

    fs.writeFileSync(path.join(__dirname, '..', '..', 'assets', 'dist', 'docs', apiVersion + '.js'), javascriptString);

    globalRenders('utils/docs', req, res, { allRoutes, apiVersion });
};
