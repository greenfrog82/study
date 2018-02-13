# Multiple Page Application Sturcture

Vue.js를 통해 Multi-page application을 개발할 때 적합한 프로젝트 구조에 대한 디자인을 정리하고 구현해보도록 한다. 

## Ideal application structure

다음 링크의 방법은 최초 디자인되었던 방법인데, Vue-cli가 기본적으로 생성한 개발 환경을 Customize하는 양에 비해 취할수 있는 이득이 거의 없어서 버린 디자인이다.  
하지만, 추후 Webpack에 대한 이해가 높아지면 재활용 할 수 있을까 해서 남겨두었다. 

[Failed Idea ..](./failed_idea.md)

앞서 실패했던 디자인과 배포 경로에 대한 내용을 제외하면 동일하다. 

* 소스 경로를 Page별로 나눈다 
* 배포 경로의 경우 Page별 html파일과 해당 html파일이 import하는 assets들을 파일명으로 나눈다. 이러한 배포 경로를 통해 Web Server에서 특정 Page에 대한 요청을 처리할 것이다. 
* 공유 라이브러리 경로를 둬서 각 Page들이 공유하는 콤포넌트와 라이브러리들을 관리한다. 

위 디자인에 대한 폴더 구조는 다음과 같다. 


```sh
dist
|-- app1.html
|-- app2.html
`-- static
    |-- css
    |   |-- app1.2ac1bf99c0d44a375c9ea92077f66d2d.css
    |   |-- app1.2ac1bf99c0d44a375c9ea92077f66d2d.css.map
    |   |-- app2.bbb9f8f4375d414b4b8323bd8c3a6c7e.css
    |   `-- app2.bbb9f8f4375d414b4b8323bd8c3a6c7e.css.map
    `-- js
        |-- app1.a0d10d1c71ccad118324.js
        |-- app1.a0d10d1c71ccad118324.js.map
        |-- app2.8935d9acbdfbee87928c.js
        |-- app2.8935d9acbdfbee87928c.js.map
        |-- manifest.031a96fdd597715aebb2.js
        |-- manifest.031a96fdd597715aebb2.js.map
        |-- vendor.1d459a95cf4f61953959.js
        `-- vendor.1d459a95cf4f61953959.js.map
lib
├── components
└── shared

src
├── app1
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   └── main.js
└── app2
    ├── App.vue
    ├── assets
    │   └── logo.png
    ├── components
    │   └── HelloWorld.vue
    └── main.js
```

### dist

> $ npm run build 

위 명령을 통해 생성하고자하는 배포 경로이다. 

**TODO :** vendor.js파일에 모든 Page에서 import되는 node_module 코드가 위치하는데, 이를 각 Page별로 나눌 수 있으면 좀 더 효율적일 것이다. 

### lib

아직 코드를 통해 테스트해보지 않았지만, 이러한 디자인으로 공유 라이브러리를 관리하는 코드들이 많고 node_modules 역시 이와 같은 디자인으로 가능하다. 
여기에 있는 코드들은 Webpack의 CommonsChunkPlugin를 통해 별도의 .js 파일로 빌드될 것이다. 
따라서 Browser Cache를 통해 Network Traffic을 줄일 수 있다. 

### src

소스 경로의 경우 개발자가 특정 Page를 개발할 때 직접 관련 구조를 만들어서 사용하면 된다.  
하지만, 매번 Page를 개발할 때 마다 소스 디렉토리 구조를 수동으로 만들면 굉장히 번거로울 것이다. 따라서, Page별 디렉토리 구조를 Template화해서 만들어 낼 수 있는 방법을 찾아 사용하면 편리할 것 같다. 

**TODO :** vue-cli를 통해 이 문제를 해결할 수 있는 방법이 있는 것으로 알고 있지만 시간 관계상 시도하지는 못했다. 

## Let's make multi-page application structure

### webpack.base.conf.js

Webpack 관련 기본 설정들이 모여있는 파일이다.  
다음과 같이 entry key에 각각 page의 main.js경로를 넣어주어 multi-page application을 만들 수 있다. 

```javascript
entry: {
    app1: './src/app1/main.js',
    app2: './src/app2/main.js'
  },
```

### webpack.prod.conf.js

> $ npm run build 

위 명령을 통해 어플리케이션을 빌드할 때 사용되는 webpack.base.conf.js를 확장한 웹팩 설정 파일이다.  
앞서 webpack.base.conf.js 파일의 entry에 app1과 app2 page를 정의하였으므로 다음과 같이 두개의 HtmlWebpackPlugin 인스턴스를 생성하여 html파일을 생성한다.  
여기서 수정해야하는 파라메터는 다음과 같다. 

* filename : 생성되는 html파일의 경로로 dist경로 해당 파일을 생성한다. 
* template : html파일을 생성하기 위해 템플릿이 되는 html파일로 예를들어, 다양한 템플릿 파일이 존재한다면 해당 템플릿 파일을 지정해주면된다. 
* chunks : 생성되는 html파일에 import 시킬 chunk들을 배열로 지정한다. 예제에서 manifest와 vendor는 모든 페이지가 공유하는 chunk이므로 기본적으로 작성해주어야하고, 뒤에는 해당 페이지에서 사용할 chunk들을 나열한다.

```javascript
// generate dist index.html with correct asset hash for caching.
// you can customize output by editing /index.html
// see https://github.com/ampedandwired/html-webpack-plugin
new HtmlWebpackPlugin({
    // filename: config.build.index,
    filename: path.resolve(__dirname, '../dist/app1.html'),
    template: 'index.html',
    inject: true,
    chunks: [ 'manifest', 'vendor', 'app1' ],
    minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
    // more options:
    // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
}),
new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, '../dist/app2.html'),
    template: 'index.html',
    inject: true,
    chunks: [ 'manifest', 'vendor', 'app2' ],
    minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
    // more options:
    // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
}),
```

### webpack.dev.conf.js

> $ npm run start

위 명령을 통해 webpack-dev-server를 실행하기 위한 webpack.base.conf.js를 확장한 웹팩 설정 파일이다. 
앞서 webpack.base.conf.js 파일의 entry에 app1과 app2 page를 정의하였으므로 다음과 같이 두개의 HtmlWebpackPlugin 인스턴스를 생성하여 html파일을 생성한다.  
여기서 수정해야하는 파라메터는 chunks를 제외하면 앞서 webpack.prod.conf.js파라메터는 다음과 같다. 
webpack.dev.conf.js 파일은 webpack-dev-server를 실행하기 위한 것이기 때문에 해당 html파일에서 import할 Page에 대한 chunk만 정의해주면 된다. 

```javascript
// https://github.com/ampedandwired/html-webpack-plugin
new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, '../dist/app1.html'),
    template: 'index.html',
    inject: true,
    chunks: ['app1']
}),
new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, '../dist/app2.html'),
    template: 'index.html',
    inject: true,
    chunks: ['app2']
}),    
```

위 설정을 통해 webpack-dev-server를 실행시키고 각각의 Page를 열기위해서는 webpack-dev-server의 호스트 뒤에 app1.html 또는 app2.html을 추가해주면 된다.  
예를들어, webpack-dev-server의 호스트가 localhost:8080이라면 app1.html을 열기위해서는 localhost:8080/app1.html이라고 해주면 된다. 

## Consideration

* 특정 Page만 빌드해야하는 경우는 어떻게 하는가?  
잠깐 찾아본 바로는 watch 모드가 있으므로 특정 Page만 따로 빌드할 필요는 없다고 한다. 하지만 dev-server로만 개발하고 있다면 ... 
* Build를 개발 PC에서 하면 안되고 CI 서버에서 해야함. 그렇다면 CI서버에 관련 환경 구축 필요.

## TODO

* vue-cli의 custom template를 사용하여 Srouce directory의 Page skeleton 구조 만들기 
* vue-cli의 custom tempalte를 통해 전체 프로젝트의 skeleton 구조도 만들 수 있다. 따라서 multi-page application을 위한 skeleton을 만들어 놓자.
* HtmlWebpakcPlugin을 하나로 할 수 있는 방법 
* webpack.optimize.CommonsChunkPlugin을 통해 공유 라이브러리 공유하기 위한 코드 작성.

## Reference

* [Multi-page applications](https://medium.com/a-beginners-guide-for-webpack-2/multi-page-applications-4ae2ebfabc37)
* [using html-webpack-plugin to generate index.html](https://medium.com/a-beginners-guide-for-webpack-2/index-html-using-html-webpack-plugin-85eabdb73474)
* [Common chunks](https://medium.com/a-beginners-guide-for-webpack-2/common-chunks-ba2b4335caea)
* [Truly Multiple Entries with Webpack](https://kuzzmi.com/blog/truly-multiple-entries-with-webpack/)
