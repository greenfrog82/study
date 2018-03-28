# About path function of css

css의 url()함수는 backgroun-image, cursor 그리고 list-style등의 css 속성에 이미지나 폰트와 같은 static resource의 위치를 지정하기 위해서 사용한다.  

## Syntax

url() 함수의 형식은 다음과 같다. 

> url(static_resource_path)

### Parameter

* static_resource_path  
  여기에 static resource의 위치를 전달하는데 절대경로와 상대경로 모두 사용할 수 있다.  
  상대경로를 사용할 때는 url 함수를 호출하고 있는 html파일이 존재하는 위치를 기준으로 한다.  
  또한 경로를 작성할 때 "", ''로 url을 감싸주어도 되고 이를 사용하지 않아도 관계없다. 예를들어 다음과 같다.  
    * "static/img/rocket-ship-svgrepo-com.svg"
    * 'static/img/rocket-ship-svgrepo-com.svg'
    * static/img/rocket-ship-svgrepo-com.svg

## Example

다음 예제는 상대경로를 통해 리스트에 이미지를 입히고 있다. 

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            .one {
                list-style: url(rocket-ship-svgrepo-com.svg)
            }
            .two {
                list-style: url('static/img/rocket-ship-svgrepo-com.svg')
            }

        </style>

    </head>
    <body>
        <ul class="one">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
        <ul class="two">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </body>
</html>
```

## Reference

* [\<url\>](https://developer.mozilla.org/en-US/docs/Web/CSS/url)