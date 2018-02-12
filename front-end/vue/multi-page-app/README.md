# Multiple Page Application Sturcture

Vue.js를 통해 Multi-page application을 개발할 때 적합한 프로젝트 구조에 대한 디자인을 정리하고 구현해보도록 한다. 

## Ideal application structure

다음 링크의 방법은 최초 디자인되었던 방법인데, Vue-cli가 기본적으로 생성한 개발 환경을 Customize하는 양에 비해 취하는 이득이 거의 없어서 버린 디자인이다.  
하지만, 추후 Webpack에 대한 이해가 높아지면 재활용 할 수 있을까 해서 남겨두었다. 

[Failed Idea ..](./failed_idea.md)

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
```

####


## TODO

* vue-cli의 custom template를 사용하여 Srouce directory의 Page skeleton 구조 만들기 
* vue-cli의 custom tempalte를 통해 전체 프로젝트의 skeleton 구조도 만들 수 있다. 따라서 multi-page application을 위한 skeleton을 만들어 놓자.
* HtmlWebpakcPlugin을 하나로 할 수 있는 방법 
* webpack.optimize.CommonsChunkPlugin을 통해 공유 라이브러리 공유하기 위한 코드 작성.

## Consideration

* 특정 Page만 빌드해야하는 경우는 어떻게 하는가?  
잠깐 찾아본 바로는 watch 모드가 있으므로 특정 Page만 따로 빌드할 필요는 없다고 한다. 하지만 dev-server로만 개발하고 있다면 ... 

## Reference

* [Multi-page applications](https://medium.com/a-beginners-guide-for-webpack-2/multi-page-applications-4ae2ebfabc37)
* [using html-webpack-plugin to generate index.html](https://medium.com/a-beginners-guide-for-webpack-2/index-html-using-html-webpack-plugin-85eabdb73474)
* [Common chunks](https://medium.com/a-beginners-guide-for-webpack-2/common-chunks-ba2b4335caea)
* [Truly Multiple Entries with Webpack](https://kuzzmi.com/blog/truly-multiple-entries-with-webpack/)
