// #!/usr/bin/env node
const { resolve } = require('path');
const { readJSONSync } = require('fs-extra');

const { generateHtml, generatePDF } = require('./generate');

const { htmlTemplatePath, jsonDataPath, output, A4Type } = readJSONSync(resolve(process.cwd(), 'config.json'));
console.log('htmlTemplatePath: ', htmlTemplatePath);

const genConfig = {
    html: htmlTemplatePath,
    json: jsonDataPath,
    out: output
}
generateHtml(genConfig);
if (A4Type) {
    generatePDF(A4Type, output);
}

const express = require('express')
const path = require('path');

const app = express()
const port = 3000

app.get('/', (req, res) => res.redirect('/static/out.html'))

app.use('/static', express.static(path.join(__dirname, './src')));

var bs = require('browser-sync').create();

app.listen(port, function () {
    bs.init({
        open: false,
        ui: false,
        proxy: 'localhost:3000',
        reloadDebounce: 1000,
        files: [
            {
                match: ["src"],
                fn: function (event, file) {
                    if (file === 'src/index.html') {
                        generateHtml(genConfig);
                    if (A4Type) {
                        generatePDF(A4Type, output);
                    }
                    }
                    bs.reload()
                },
            }
        ],
        port: 8080,
    }, function () {
        bs.reload();
    });
});