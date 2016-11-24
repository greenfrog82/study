import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

// 압축 파일을 생성하기 위하 스트림을 생성한다.
const output = fs.createWriteStream('./_example.zip');

// zlib을 통해 압축을 수행하기 위한 아카이브를 생성한다.
const archive = archiver('zip', {
    store: true // 예제에는 true로 설정되어 있지만, true로 설정하면 zip 파일로 파일 목록들을 묶을 뿐 압축은 수행하지 않는다.
});

// 압축이 끝났을 때 호출되는 이벤트
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('압축이 끝나고, 파일 스트림이 닫힌다.');
});

// 압축 중 에러가 발생했을 때 호출되는 이벤트
archive.on('error', function(err) {
  console.error('---- ERROR HANDLER : ' + err.stack);
});

// 압축 된 데이터를 파일 스트림으로 연결한다.
archive.pipe(output);

// 압축을 하기 위한 경로 지정. 현재 프로젝트 경로 전달.
// archive.directory('./');
// 다음과 같이 경로를 전달하면 전달한 경로의 드라이브 명을 제외한 모든 경로가 함께 압축된다.
archive.directory(path.join(__dirname + '/../'));

// 압축을 하기 위한 파일 추가 또는 경로 전달을 종료한다. 이때, 압축은 비동기로 진행 중이다.
archive.finalize();
