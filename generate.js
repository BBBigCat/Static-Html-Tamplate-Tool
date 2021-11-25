const { resolve } = require('path');
const child = require('child_process');

function absolutePath(path) {
    return resolve(process.cwd(), path);
}

function generateHtml(params) {
    const { html, json, out } = params;
    // html 模板地址
    const htmlTemplatePath = absolutePath(html);
    // json 数据地址
    const jsonDataPath = absolutePath(json);
    // 输出文件
    const output = absolutePath(out);
    child.exec(`./htmltool -path ${htmlTemplatePath} -json ${jsonDataPath} -out ${output}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

function changeSuffix(path) {
    return path.replace(/\.html/, (str, $1) => {
        return '.pdf';
    })
}

// hor = horizontal | ver = Vertical
function generatePDF(A4Type, output) {
    if (A4Type === 'hor') {
        child.exec(`wkhtmltopdf --page-width 297 --page-height 210 --margin-left 0 --margin-right 0 --margin-bottom 0 --margin-top 0 ${output} ${changeSuffix(output)}`)
    } else if (A4Type === 'ver') {
        child.exec(`wkhtmltopdf --page-width 210 --page-height 297 --margin-left 0 --margin-right 0 --margin-bottom 0 --margin-top 0 ${output} ${changeSuffix(output)}`)
    } else {
        return;
    }
}

module.exports = {
    generateHtml,
    generatePDF
}