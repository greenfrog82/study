# 9주차 스터디 

* UNIT 45. 유니코드와 UTF-8 함수 사용하기
* UNIT 46. 문자열 처리하기
* UNIT 47. 문자열 변환 함수 사용하기 
* UNIT 48. 정규표현식 사용하기
* UNIT 49. 파일 처리하기
* UNIT 50. 입출력 인터페이스 사용하기 
* UNIT 51. JSON 문서 사용하기 

## 45 ~ 48 

* 영문이 아닌 다른 언어들을 처리하기 위한 함수들이 많아서 편리할 듯 하나. Codewars 같은 코딩 문제 풀때 이외에 이러한 기능들을 많이 쓰지는 않는듯.
* Regex를 compile하는 이유에 대해서 알고 있는지?
* 특이 사항 없고 Codewars를 열심히하는 것이 도움이 많이 될 듯.  

## 49. 파일 처리하기

책에서는 텍스트 형식의 파일에 대한 설명만 있고 각각의 함수들에 binary 형식 파일을 만드는 옵션이 없어서 binary 형식의 파일은 어떻게 만드는지 확인해보니 있다.  
Go는 파일을 생성할 때 binary인지 text인지 구분을 하지 않고 데이터를 쓸때 **encoding/binary** 패키지의 **binary.Write** 함수를 토앻 binary 파일을 생성한다.  

자세한 내용은 다음 link 참조 

[Reading And Writing Binary Files In Go Lang](http://varunpant.com/posts/reading-and-writing-binary-files-in-go-lang)

다음은 위 링크의 코드 snippet ..

```go
func writeFile() {
	file, err := os.Create("test.bin")
	defer file.Close()
	if err != nil {
		log.Fatal(err)
	}

	r := rand.New(rand.NewSource(time.Now().UnixNano()))

	for i := 0; i < 10; i++ {


		s := &payload{
			r.Float32(),
			r.Float64(),
			r.Uint32(),
		}
		var bin_buf bytes.Buffer
		binary.Write(&bin_buf, binary.BigEndian, s)
		//b :=bin_buf.Bytes()
		//l := len(b)
		//fmt.Println(l)
		writeNextBytes(file, bin_buf.Bytes())

	}
}
```

## 50. 입출력 인터페이스 사용하기 

예전에 공부했던 인터페이스를 통한 덕 타이핑 사용의 좋은 예제인듯.

### 50.1 파일 처리하기 

bufio 패키지는 Buffered I/O를 사용하는 패키지이다.  

Buffered I/O를 사용하는 이유는 [Why is buffered I/O faster than unbuffered I/O](https://stackoverflow.com/questions/29891626/why-is-buffered-i-o-faster-than-unbuffered-i-o)을 참조. 

### 50.2 문자열을 파일로 저장하기  

다음 함수를 이용해서 이미 문자열을 변수로 가지고 있을때, 이를 io.Writer 인터페이스로 전달하여 파일에 쓰는 방법.  

>* func New Reader(s string) *Reader  
>* func (b *Writer) ReadFrom(r io.Reader)(n int64, err error)

다음 함수를 이용해서 io.Reader의 데이터를 io.Writer로 바로 전달 할 수 있다.  
다음 함수로 앞서 설명한 함수의 역할을 그대로 할 수 있다. 아래 함수와 위 함수의 차이점은 Buffer의 사용 유무이다. 

>* func Copy(dst Writer, src Reader)(written int64, err error)

### 50.3 문자열을 화면에 출력하기

다음 코드를 통해 io.Reader의 문자열을 화면에 출력할 수 있다. 

>io.Copy(os.Stdout, r)

### 50.4 기본 입출력 함수 사용하기 

기본 입출력 함수를 통해서 io.Reader를 통해 형식에 따라 데이터를 분리하거나, io.Writer를 통해 형식에 따라 데이터를 쓰는 경우 편리하게 사용 가능할 듯.

### 50.5 읽기, 쓰기 인터페이스 함께 사용하기 

io.Reader와 io.Writer를 생성해놔야하기 때문에 굳이 io.ReadWriter 인터페이스가 유용할까 하는 생각이 들었음.  

## UNIT 51. JSON 문서 사용하기 

처음에 Go를 접할 때 타입을 정의해야하는 문제로 인해 JSON을 정의하기 어려울 것으로 생각했었는데 JSON을 정의하는 방식은 일반적으로 JavaScript, Python과 다르지 않음.  
거기에 구조체를 통한 형식정의가 되고 맵핑이 수월하게 되어 Moongoose와 JSONSchema의 장점을 한꺼번에 느낄 수 있어서 아주 만족스러움. 









## 참조 

* [Why is buffered I/O faster than unbuffered I/O](https://stackoverflow.com/questions/29891626/why-is-buffered-i-o-faster-than-unbuffered-i-o)
* [Introduction to bufio package in Golang](https://medium.com/golangspec/introduction-to-bufio-package-in-golang-ad7d1877f762)
* [Is it worth using Python's re.compile?](https://stackoverflow.com/questions/452104/is-it-worth-using-pythons-re-compile?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)