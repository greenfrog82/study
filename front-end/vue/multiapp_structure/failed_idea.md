
# Overview

아래 아이디어를 구체화하여, Multi-page를 위한 개발환경에 대한 구축을 시도했지만, Page별 배포 환경을 구축하기 위해 vue-cli를 통해 생성된 설정파일을 과하게 Customize해야하는 이슈가 발생하였다.  
특히, 다른 부분들은 어찌어찌 Customize한다 하더라도, url-loader의 경우 limit에 걸리는 asset의 경우 해당 Page의 경로에 파일을 생성할 수 있도록 경로를 변경해주어야하는데 이를 할 수가 없었다.  
또한, Dist 경로를 각 Page별로 나누는데에 대한 장점이 특별히 없기 때문에 이러한 방법은 중단하기로하였다. 

## Idea

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
이번 글의 경우 app1과 app2 두 개의 page를 생성했으므로 다음과 같이 2개의 HtmlWebpackPlugin을 생성하였다. 

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

만약, template html를 page별로 따로 관리해야한다면 프로젝트의 template html 파일을 추가한 후 HtmlWebpackPlugin 플러그인의 template key를 수정해주면 된다.  
예를들어, app2에서는 index_.html template를 사용하고 시팓고 하자 그러면 index_.html를 생성한 후 다음과 같이 template key를 수정해주면 된다. 

```javascript
new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/app2/index.html'),
      template: 'index_.html',
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

css쪽도 다음과 같이 filename 경로 변경해줘야한다. 

```javascript
// extract css into its own file
    new ExtractTextPlugin({
      filename: '[name]/' + utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
```

#### config/index.js

assertsPublicPath는 index.html파일에 각 static file의 경로를 붙여줄 때 맨 앞에 붙는 경로이다.  
원래는 '/'이지만 다음과 같이 '../'로 설정한 이유는 공유 리소스인 manifest와 vendor Path에 접근하기 위함이다. 

```javascript
assertsPublicPath : '../'
```