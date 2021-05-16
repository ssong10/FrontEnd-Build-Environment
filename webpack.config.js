const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin");
// HtmlWebpackPlugin : HTML 파일을 빌드하는 과정에서 동작하는 플러그인
//   동적 생성되는 CSS, JS 파일 그리고 HTML의 ejs 변수들을 템플릿에서 사용할 수 있다.

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// stylesheet 코드만 뽑아서 별도의 CSS 파일로 만들어 역할에 따라 파일을 분리해준다.
// (CSS를 별도 파일로 뽑아내는 플러그인)


module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 개발환경에서는 css-loader에 의해 변경된 css를 적용하기 위해 style-loader를 사용합니다
          // 프로덕션 환경에서는 별도의 CSS파일을 추출하는 플러그인으로 적용하여 다른 loader 를 사용합니다.
          process.env.NODE_ENV === "production"
          ? MiniCssExtractPlugin.loader // 프로덕션 환경
          : "style-loader", // 개발 환경
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // png, jpg, gif, svg 확장자로 끝나는 파일들은 url-loader로 처리하겠다는 의미
        loader: "url-loader", // 용량이 적은 파일들은 Data URI Scheme을 이용해서 Base64로 인코딩하여 문자열 형태로 소스코드에 넣는 방식을 이용한다.
        options: {
          // publicPath: './dist/', // 아까는 index.html 파일이 src 폴더 위에 있었지만 HtmlWebpackPlugin 설치 후에는 src 폴더 안으로 들어갔기 때문에 빌드된 결과물이 dist 폴더안에 index.html이 자동으로 생기므로 앞에 prefix로 ./dist/ 경로를 붙이지 않아도 된다.
          name: "[name].[ext]?[hash]",
          limit: 20000, // 파일 용량 세팅(20[KB]로 세팅함)
          // 이미지 파일을 처리할 때 20[KB] 미만의 파일들은 url-loader를 이용해서 Base64로 인코딩하여 자바스크립트 문자열로 변환한다.
          // 만약 20[KB] 이상인 경우 file-loader를 이용하게 된다.
          // 그래서 20[KB] 이하인 nyancat.jpg는 빌드된 main.js 파일 안에 url로 처리되어 들어간다.
          // 20[KB] 이상인 bg.png는 file-loader로 처리되어 bg.png 파일이 dist 폴더 안에 들어오게 된다.
        },
      },
      {
        // 다음과 같이 babel-loader로 webpack과 함께 사용하면 훨씬 단순하고 자동화된 프론트엔드 개발환경을 갖출 수 있다.
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "개발" : "배포",
      },
    }),
    // MiniCssExtractPlugin은 JS에서 CSS 코드를 뽑아내는 것이기 때문에 굳이 development 환경에서는 JS 파일 하나로 빌드하는 것이 조금 더 빠르기 때문에 굳이 이 플러그인을 쓸 필요가 없다.
    // production 환경에서만 플러그인이 실행되도록 삼항 연산자로 작성하자.
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
      : []),
  ]
}