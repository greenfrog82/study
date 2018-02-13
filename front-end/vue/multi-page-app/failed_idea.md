# Overview

아래 아이디어를 구체화하여, Multi-Page Application을 위한 프로젝트 구조 구축을 시도했었다. 이 과정에서 Page별 배포 환경을 구축하기 위해 vue-cli를 통해 생성된 설정파일의 많은 부분을 수정하게 되었다.  
개인적인 경험으로 미루어볼 때, 대부분의 프로젝트의 경우 프레임워크가 제공하는 기본기능과 구조를 통해 거의 모든 문제를 해결할 수 있었다. 따라서 어떤 문제를 해결하기 위해 프레임워크의 기능과 구조를 임의로 변경하는 경우는 해당 문제를 프레임워크를 통해 해결하기 어려워서가 아니라 프레임워크를 제대로 이해하지 못하고 사용하는 경우가 대부분이었다. 이러한 임의의 변경은 프레임워크 사용의 일관성을 해치게 되어 결국 프로젝트의 유지보수를 어렵게하는 결과가 뒤를이었다.  

이번 시도의 경우도 마찬가지가 아니었나 싶다. 내가 원했던 Multi-Page Application은 각각 Page별로 소스 경로와 배포 경로를 나누는 것이었다.  
Page별 소스 경로를 나누는것은 아주 간단히 해결되었지만, 배포 경로를 나누는데 있어서 설정파일의 많은 부분의 수정이 필요했다. 이러한 많은 부분의 수정을 통해 배포 경로를 나눈데 있어서 부분적인 성공을 이뤄냈지만 url-loader가 생성해내는 assert 파일을 Page별로 나누는 것과 webpack-dev-server를 띄우는 것을 끝내 실패하였다. 

결국, 배포 경로를 Page별로 나눈것이 불필요 하다는 많은 의견을 동료 개발자들에게 듣게 되었는데 이유는 다음과 같다. 
Multi-Page Application이라고 하더라도 특정 url 요청따라 웹 서버에서 웹 브라우저로 전달해줘야하는 파일은 html파일 하나이다. 그 이후 필요한 나머지 asset들은 웹 브라우저가 웹 서버에 요청을 할 것이고 이러한 asset들은 해당 html파일에 명시되어 있다. 따라서 굳이 배포 경로를 Page별로 나눌 필요가 없다는 것이다.  
아마도 vue-cli가 기본적으로 잡아놓는 구조도 이러한 철학을 바탕으로 했던것 같다. 물론 아직 Webpack에 대한 지식이 부족해서 이러한 결론을 내렸을 수 있으므로 다음과 같이 실패했던 Multi-Page Applicaiton을 위한 프로젝트 구조에 대한 디자인과 진행 과정을 문서로 남겨둔다. 추후 좀 더 경험과 지식이 쌓였을 때 다시 읽어보면 좀 더 좋은 결론을 얻을 수 있을 것이다. 

## Idea

내가 생각하는 가장 이상적인 어플리케이션 구조는 각 페이지 별로 소스 경로와 배포 경로를 나누고 공유되는 라이브러리 경로두는 것이다.  
여기서는 app1과 app2 페이지 두 개가 있다고 가정하고 설명한다. app1과 app2 페이지를 통해 생성하고자하는 프로젝트 구조는 다음과 같다.

### Source directory

소스 경로의 경우 개발자가 특정 Page를 개발할 때 직접 관련 구조를 만들어서 사용하면 된다.  
하지만, 매번 Page를 개발할 때 마다 다음과 같은 디렉토리 구조를 수동으로 만들면 굉장히 번거로울 것이다. 따라서, Page별 디렉토리 구조를 Template화해서 만들어 낼 수 있는 방법을 찾아 사용하면 편리할 것 같다. 

**TODO :** vue-cli를 통해 이 문제를 해결할 수 있는 방법이 있는 것으로 알고 있지만 시간 관계상 시도하지는 못했다. 

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

> $ npm run build 

위 명령을 통해 생성하고자하는 배포 경로의 구조는 다음과 같다. 각 Page별로 부모 경로를 만들고 하위에 해당 Page에 대한 파일들을 위치시키는 것이다.  
manifest(webpack관련 코드)와 vendor(소스코드에 import된 node_module의 코드)의 경우 각 Page별로 공유하는 것이므로 Page 경로와 같은 레벨에 위치 시켰다. 

**TODO :** 다음 구조는 vendor.js파일에 모든 Page에서 import되는 node_module 코드가 위치하는데, 이를 각 Page별로 나눌 수 있으면 좀 더 효율적일 것이다. 

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

### Shared library directory

아직 코드를 통해 테스트해보지 않았지만, 이러한 디자인으로 공유 라이브러리를 관리하는 코드들이 많고 node_modules 역시 이와 같은 디자인으로 가능하다. 
여기에 있는 코드들은 Webpack의 CommonsChunkPlugin를 통해 별도의 .js 파일로 빌드될 것이다. 
따라서 Browser Cache를 통해 Network Traffic을 줄일 수 있다. 

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

어플리케이션을 빌드할 때 사용되는 webpack.base.conf.js를 확장한 웹팩 설정 파일이다.  

#### output 

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

#### plugins

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
예를들어, app2에서는 index_.html template를 사용하여 빌드하고자 한다면 index_.html를 생성한 후 다음과 같이 template key를 수정해주면 된다. 

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