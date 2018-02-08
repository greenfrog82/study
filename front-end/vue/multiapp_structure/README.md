# Multi-page application structure

Vue.js를 통해 Multi-page application을 개발할 때 적합한 프로젝트 구조에 대한 디자인을 정리하고 구현해보도록 한다. 

## Ideal application structure

내가 생각하는 가장 이상적인 어플리케이션 구조는 각 페이지 별로 소스 경로를 나누고 페이지별로 배포 경로가 나뉘는 것이다.  
여기서는 app1과 app2 페이지 두 개가 있다고 가정하고 설명한다. 
다음과 같다. 

### Source directory

```sh
src
|-- app1
|   |-- App.vue
|   |-- assets
|   |   `-- logo.png
|   |-- components
|   |   `-- HelloWorld.vue
|   `-- main.js
`-- app2
    |-- App.vue
    |-- assets
    |   `-- logo.png
    |-- components
    |   `-- HelloWorld.vue
    `-- main.js
```

### Distribution directory

```sh
dist
|-- app1
|   |-- index.html
|   `-- static
|       |-- css
|       |   |-- app1.2ac1bf99c0d44a375c9ea92077f66d2d.css
|       |   `-- app1.2ac1bf99c0d44a375c9ea92077f66d2d.css.map
|       `-- js
|           |-- app1.a0d10d1c71ccad118324.js
|           `-- app1.a0d10d1c71ccad118324.js.map
|-- app2
|   |-- index.html
|   `-- static
|       |-- css
|       |   |-- app2.bbb9f8f4375d414b4b8323bd8c3a6c7e.css
|       |   `-- app2.bbb9f8f4375d414b4b8323bd8c3a6c7e.css.map
|       `-- js
|           |-- app2.8935d9acbdfbee87928c.js
|           `-- app2.8935d9acbdfbee87928c.js.map
|-- manifest
|   `-- static
|       `-- js
|           |-- manifest.c3f0f2b4abf8fda3ddcf.js
|           `-- manifest.c3f0f2b4abf8fda3ddcf.js.map
`-- vendor
    `-- static
        `-- js
            |-- vendor.1d459a95cf4f61953959.js
            `-- vendor.1d459a95cf4f61953959.js.map
```

## Let's make multi-page application structure

### Source directory

src 경로의 경우 개발자가 직접 관련 구조를 만들어서 사용하면 된다. 

### Distribution directory

#### webpack.base.conf.js

Webpack 관련 기본 설정들이 모여있는 파일이다.  
다음과 같이 entry key에 각각 page의 main.js경로를 넣어주어 multi-page application을 만들 수 있다. 

```javascript
entry: {
    app1: './src/app1/main.js',
    app2: './src/app2/main.js'
  },
```

#### webpack.prod.conf.js

어플리케이션을 빌드할 때 사용되는 webpack.base.conf.js를 확장한 웹팩 설정 파일이다.  

##### output 

output키는 빌드 시 생성되는 파일들이 생성되는 위치를 설정하는 부분이다.  
* path : 빌드 시 생성되는 파일들의 root path로 '\<vue-project name\>/dist' 경로로 되어있다. 
* filename : 빌드 시 chunk를 통해 생성되는 application의 bundle 파일 경로이다. [name] 키워드를 통해 entry에 정의 된 chunk에 따라 경로를 생성하도록 하였다. 
* chunkFilename : ?? 
```javascript
output: {
    path: config.build.assetsRoot, 
    filename: '[name]/' + utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: '[name]/' + utils.assetsPath('js/[id].[chunkhash].js')
  },
```

##### plugins

Webpack의 설정에 따라 기능을 확장하기 위한 key이다.  

앞서 entry에 설정한 page의 수만큼 HtmlWebpackPlugin을 작성해주어야한다. 
이번 글의 경우 app1과 app2 두 개의 page를 생성했으므로 당음과 같이 2개의 HtmlWebpackPlugin을 생성하였다. 

```javascript
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      // filename: config.build.index,
      filename: path.resolve(__dirname, '../dist/app1/index.html'),
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
      filename: path.resolve(__dirname, '../dist/app2/index.html'),
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

변경 한 속성은 다음과 같다. 

* filename : template키에 정의 된 template을 통해 생성한 html파일을 저장하기 위한 경로
* chunks : template html에 삽입할 chunks들을 배열로 전달하는데, 해당 페이지에 대한 application bundle 파일(app1, app2)와 공유 리소스를 추가하였다. 공류 리소스에 대한 설명은 다음과 같다. 
    * manifest : Webpack module에 대한 코드
    * vendor : node_module을 통해 공유되는 코드 

#### config/index.js

assertsPublicPath는 index.html파일에 각 static file의 경로를 붙여줄 때 맨 앞에 붙는 경로이다.  
원래는 '/'이지만 다음과 같이 '../'로 설정한 이유는 공유 리소스인 manifest와 vendor Path에 접근하기 위함이다. 

```javascript
assertsPublicPath : '../'
```

####


## TODO

* vue-cli의 custom template를 사용하여 Srouce directory의 Page skeleton 구조 만들기 
* vue-cli의 custom tempalte를 통해 전체 프로젝트의 skeleton 구조도 만들 수 있다. 따라서 multi-page application을 위한 skeleton을 만들어 놓자.
* HtmlWebpakcPlugin을 하나로 할 수 있는 방법 
* webpack.optimize.CommonsChunkPlugin을 통해 공유 라이브러리 공유하기 위한 코드 작성.

## Reference

* [Multi-page applications](https://medium.com/a-beginners-guide-for-webpack-2/multi-page-applications-4ae2ebfabc37)
* [using html-webpack-plugin to generate index.html](https://medium.com/a-beginners-guide-for-webpack-2/index-html-using-html-webpack-plugin-85eabdb73474)
* [Common chunks](https://medium.com/a-beginners-guide-for-webpack-2/common-chunks-ba2b4335caea)
