# Node.js에서 재귀적으로 폴더의 내용 복사하기

## 개요

프로젝트를 진행하면서 사용자 경로의 특정 경로에 제품의 설정 파일들이 존재하지 않으면 미리 만들어 놓은 설정 파일 폴더를 복사해줘야하는 요구사항이 있었다. 이때 미리 만들어 놓은 설정 파일 폴더는 깊이가 깊을 수도 있으므로 재귀적으로 해당 경로의 내용을 복사할 수 있어야했다.
이를 처리할 수 있는 NPM 패키지를 찾던 중 [fs-extra](https://www.npmjs.com/package/fs-extra)이 사용법도 간단하고 널리 쓰이는 것 같아 이를 통해 문제를 해결하였다.

## 사용법

아래 예제에서는 동기함수를 사용하였지만 [fs-extra](https://www.npmjs.com/package/fs-extra)는 이에 대응하는 비동기함수도 제공하므로 필요 시 선택해서 사용하면 된다.

```javascript
/* jshint -W097 */
/* jshint node: true */
'use strict';

import fs from 'fs-extra';
import os from 'os';
import path from 'path';

const srcPath = path.resolve(); // 현재 프로젝트 경로
const destPath = path.join(os.homedir(), 'greenfrog/copy_test');

try {
  // 이미 존재하면 null을 반환하고, 존재하지 않아 경로를 만들면 만든 경로를 반환한다.
  if(null === fs.ensureDirSync(destPath)) {
    console.log(`There is destination path. - ${destPath}`);
  } else {
    console.log(`There is no destination path. - ${destPath}`);
    fs.copySync(srcPath, destPath);
  }
} catch(err) {
  console.error(err);
}
```

## 주의사항

**ensureDirSync** 함수의 경우 인자로 전달 된 경로가 존재하지 않으면 이를 생성한 후 생성 된 경로 문자열을 반환하고 존재하는 경우는 null을 반환한다.

## 참고

[fs-extra](https://www.npmjs.com/package/fs-extra)
