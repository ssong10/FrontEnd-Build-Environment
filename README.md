# Webpack

[![npm](https://camo.githubusercontent.com/dcf3110e99c354b13ab7d252b5141df6f9c69710b4d1a6c5194089a5c7b82ff1/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7765627061636b2e737667)](https://npmjs.com/package/webpack)

:new: Webpack 을 사용하는 이유

작업, 프로젝트를 진행하면서 코드의 재사용성, 유지보수 등을 위하여 모듈, 기능별로 코드를 관리하는 것이 중요하고 편하다.

하나의 개념( 기능이나 컴포넌트 ) 를 하나의 파일에서 작업을 하는 것이 자연스럽고, 클린 코드에 가깝다고 생각 할 것이다.

그러기 위하여 각각의 파일을 브라우저에 로딩을 해야하고 그만큼의 네트워크 비용이 발생한다.

더군다나, 그 파일은 서로의 스코프를 침범하지 않아야하고 변수 충돌을 위해서 신경써야하고, 순서에 맞게 로딩을 해야한다.

이러한 것들을 해결하기 위하여 여러 의존 관계에 있는 모듈들을 js 파일 하나로 번들링 하게 되는 `정적 모듈 번들러` Webpack 이 있습니다 !



## :wrench: Install

webpack 패키지와 웹팩 터미널 도구인 `webpack-cli` 를 설치합니다.

```bash
$ npm install -D webpack webpack-cli
```

설치 후에

```bash
$ node_modules/.bin/webpack --help
```
명령어를 이용하여 실행가능한 명령어와 사용방법을 확인할 수 있습니다.



## :bookmark_tabs: webpack 기본 명령어

1. `--mode` : 실행환경을 선택하여 빌드 할 수 있다 
  * `development` , `production`, `none` 이 있고
  * 보통 `process.env.NODE_ENV` 같은 식으로 기본 환경설정 값으로 사용하기도 한다.
2. `--entry` : 시작점 경로를 지정하는 옵션이다 가장 밑바탕 기본이 되는 js, ts 를 타겟으로 한다
3. `--o` , `--output-path` :  번들링 결과물이 위치할 path 입니다.

```bash
$ node_modules/.bin/webpack --mode development --entry ./src/app.js -o dist
```
* 위의 명령어 대로 입력을 하게 된다면 `src/app.js`과 거기서 사용되는 모듈등이 `dist` 폴더에 `main.js` 로 번들링 됩니다.

4. `--config` : 웹팩 설정파일의 경로를 지정할수 있는데 기본 파일명이 `webpack.config.js` 이다. webpack.config.js 파일을 통하여 설정을 해줄 수 있습니다.
5. `--watch` : 번들링하는 파일, 모듈에 변화가 있으면 감지하여 새로 번들링을 해주게 됩니다. 개발을 하면서 편하게 도움이 됩니다.


## :package: webpack.config.js

```js
const path = require("path")

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
}
```
* mode, entry 는 기존 명령어와 동일합니다.
* output 에서 filename 은 지정해 줄 수 있지만 `[name]` 을 사용하게 되면 entry 에서 key 값으로 들어가있는 main으로 filename 이 생성되는 원리입니다.
* output의 path는 절대경로를 사용하기 때문에 `path` 모듈을 통해서 절대경로를 참조해 줍니다.

## :mag: npm script 사용
* package.json 을 이용하기 위해서 npm init 을 사용해 주게 됩니다.
* 해당 스크립트는 npm run build 와 같은 방식으로 사용할 수 있습니다
* npm run watch 를 하면 변화가 일어날때마다 build 가 됩니다.
```json
{
  "scripts": {
    "build": "./node_modules/.bin/webpack",
    "watch": "./node_modeuls/.bin/webpack --watch"
  }
}
```

:happy: 기본적인 작업은 끝났습니다. 이제는 `npm run build` 명령어로 설정파일에 따라 번들링 하게 됩니다.

> 지금까지는 js 파일에 대하여 번들링을 하는 과정을 거치게 되었습니다.
> 추가적으로 필요한 modules 과 plugins 에 대해서 알아보게 될텐데
> webpack.config.js 와 함께 보면서 공부하는 편이 좋습니다.
## :wrench: modules
```bash
$ npm install css-loader style-loader url-loader
```
### 1. css-loader
  * webpack 에서 `.css` 파일을 읽어들이기 위해 사용되는 로더
### 2. style-loader
  * HTML 의 header에 <style> 태그를 이용하여 DOM 에 CSS를 적용해주는 로더
  * 기본적으로 style-loader, css-loader 를 같이 사용하는 편이다.
### 3. url-loader 
  * background-image 등에서 사용되는 파일들을 불러오는데 쓰인다.
  * 용량에 따라서 설정을 달리 할 수 있는데, limit 으로 설정한 byte 이하의 이미지 등은 base64로 인코딩하여 javascript 문자열로 변경하여 로딩을 하게 되고 크보다 큰 용량은 그냥 넘겨주게 된다.
### 4. babel
```bash
$ npm install babel-loader @babel/core @babel/preset-env
```
  * 각각 브라우저 마다 매년 새롭게 도입되는 ES6+ 의 지원비율이 제각각이다.
  * IE 를 비롯한 구형 브라우저에서는 ES6+ 문법이 제대로 작동이 안될 수도 있고, 모듈 로더가 작동이 잘 안될 수도 있다.
  * 사용자가 그런것들을 고려하면서 코드를 작성하기에 불편함이 많기에 각각의 브라우저의 지원사항에 맞게 맞춰서 모듈 번들러를 사용하여 동작하게 할 수 있다.
  * Arrow Function, optional chaining 등을 ES5 이하의 문법으로 번들링해주는 로더이다.
  * `babel.config.js` , `.babelrc` 등의 파일에 설정을 해준다.
  * 물론 `webpack.config.js` 에서도 설정해주어야한다.



## :heavy_plus_sign: plugins
* plugin 들은 써드 파티 패키지로 동작하게 됩니다. `module`을 이용하여 build 하는 과정을 거친 후, 후처리 하는 동안 작동하고, 사용되게 됩니다.

### 1. HtmlWebpackPlugin
기본적으로 `Html` 파일이 번들링이 안되기 때문에 plugin 으로 처리해 주게 된다.
```bash
$ npm install -D html-webpack-plugin
```
node 에서 설치 후에 webpack.config.js 설정을 한 후 실행하게 된다.

> ./src/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Webpack Test (<%= env %>)</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
위와 같이 예시로 
* title을 ejs 문법을 사용하여 작성한 Html 파일을 `templateParameters` 와 연동시켜서 env 변수값을 이용하여 동적으로 생성할 수 있다.
* 또한 기본적으로는 기본적인 로딩 스크립트가 있어야 하지만 Webpack 에서 빌드한 결과물을 자동으로 주입해주기 때문에 제거하였다. 



### 2. mini-css-extract-plugin
* 스타일시트 코드만 뽑아서 별도의 CSS파일로 만들어 역할에 따라 파일을 분리해 줍니다.
* CSS를 별도 파일로 뽑아내는 플러그인 입니다.
* `production` mode에는 plugin 에 추가해 주고 해당 모드일 때 `.css` loader 에서도 작동하게 됩니다. 
```bash
$ npm install -D mini-css-extract-plugin
```










## :book: Referrence

[webpack github](https://github.com/webpack/webpack#install)

[프론트엔드 개발 환경의 의해 : 웹팩](https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html)

[webpack 기본 이해하기](https://kschoi.github.io/webpack/webpack-basic/)

[babel](https://poiemaweb.com/es6-babel-webpack-1)
