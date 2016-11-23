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
