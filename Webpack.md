# Webpack

작업, 프로젝트를 진행하면서 코드의 재사용성, 유지보수 등을 위하여 모듈, 기능별로 코드를 관리하는 것이 중요하고 편하다.

하나의 개념( 기능이나 컴포넌트 ) 를 하나의 파일에서 작업을 하는 것이 자연스럽고, 클린 코드에 가깝다고 생각 할 것이다.

그러기 위하여 각각의 파일을 브라우저에 로딩을 해야하고 그만큼의 네트워크 비용이 발생한다.

더군다나, 그 파일은 서로의 스코프를 침범하지 않아야하고 변수 충돌을 위해서 신경써야하고, 순서에 맞게 로딩을 해야한다.

이러한 것들을 해결하기 위하여 여러 의존 관계에 있는 모듈들을 js 파일 하나로 번들링 하게 되는 `정적 모듈 번들러` Webpack 이 있습니다 !





기본적으로 `webpack.config.js` 에서 설정으로 시작하는 entry 부터 output 까지 기본설정을 하고 추가적으로 loader 를 이용하여 다양한 파일이나 설정을 적용하여 웹팩이 동작할 수 있게 한다.

loader 를 사용하여, 기본적으로 js 의 모듈러 역할 뿐만 아니라, Javascript, styleSheet, image 등을 모듈로 만들어서 하나의 파일로 묶어 줄 수 있다


# module
* 웹팩은 모든 파일을 모듈로 바라보게 됩니다.

# plugins


## Referrence
[github webpack](https://github.com/webpack/webpack#install)
[프론트엔드 개발 환경의 의해 : 웹팩](https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html)
[webpack 기본 이해하기](https://kschoi.github.io/webpack/webpack-basic/)