# static-html-tamplate-tool

## 静态 html 模板工具

基于 express + nodemon + browser-sync + go 的静态 html 模板开发时工具。

> go 用到的是 [html/template](https://golang.google.cn/pkg/html/template/) 库。

该工具内置了 go 的转换工具，可以基于给定的 html 模板、json 数据，生成带有数据的 html 文件。

### 特点

快速调试：只要 `src` 下的文件发生变化，就会刷新页面，方便修改调试，实现伪“热更新”

### 主要文件目录

```js
- src
    - index.html 目标文件
    - index.json 数据文件
    - out.html 输出文件
- app.js 启动代码
- generate.js 转换 html、生成 pdf 代码
- config.json 默认配置（目前只建议修改 A4Type）
```

### 文件逻辑

`index.html + index.json => out.html`

### 支持

1. 本地启动 express 服务，发生变动后 express 服务自动重启，静态 html 页面自动刷新
2. 目标 html 模板文件（src/index.html）修改后，输出页面（src/out.html）对应变动
3. json 数据文件变化后，输出页面（src/out.html）对变化
4. 通过 config.json 里的配置 A4Type，配合本地 [wkhtmltopdf](https://wkhtmltopdf.org/) 工具，可以直接生成 pdf 文件预览效果


## Usage

### 启动

```js
yarn nodemon
```

### 生成 pdf

```js
// config.json

// hor = horizontal | ver = Vertical
// 不同参数生成不同格式的 A4 纸样式
A4Type: "hor" | "ver"
```

### Tips

1. 目前代码中指定了目标文件只能是 index.html，服务启动后默认打开的就是输出文件 out.html
2. 项目启动后使用 `browser-sync` 代理后的 `8080` 端口
3. go 的 `html/template` 库的语法支持不全，只支持 `{{.xx}}` 语法，`{{range}}`、`{{if}}` 等均不支持。且在 html 中注释掉也会报错，需要删除

## TODO

1. 更加灵活的指定目标文件
2. 做成包，可以直接安装在项目中使用

## License

MIT © BBBigCat