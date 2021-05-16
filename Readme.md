# Webpack

[![npm](https://camo.githubusercontent.com/dcf3110e99c354b13ab7d252b5141df6f9c69710b4d1a6c5194089a5c7b82ff1/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7765627061636b2e737667)](https://npmjs.com/package/webpack)

## :wrench: Install

webpack 패키지와 웹팩 터미널 도구인 `webpack-cli` 를 설치합니다.

```bash
  $ npm install webpack webpack-cli
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

 ​
> :happy:기본적인 작업은 끝났습니다. 이제는 `npm run build` 명령어로 설정파일에 따라 번들링 하게 됩니다.

