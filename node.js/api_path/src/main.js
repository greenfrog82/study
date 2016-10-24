// --------------------------------------------------------------------------
// path .join, path.resolve, __dirname

import path from 'path';

console.log('path.join("a", "b1", "..", "b2")', path.join("a", "b1", "..", "b2"));
console.log('path.resolve("a", "b1", "..", "b2")', path.resolve("a", "b1", "..", "b2"));
console.log();

console.log('path.join("")', path.join(''));
console.log('path.resolve("")', path.resolve(''));
console.log();


console.log('path.join()', path.join());        // .
console.log('path.resolve()', path.resolve());  // current working directory .. 즉 node.exe가 실행되는 경로
console.log('__dirname', __dirname);            // The name of the directory that the currently executing script resides in.
console.log();

console.log('path.join("/foo/bar", "./baz")', path.join("/foo/bar", "./baz"));
console.log('path.resolve("/foo/bar", "./baz")', path.resolve("/foo/bar", "./baz"));
console.log();

console.log('path.join("/foo/bar", "/baz")', path.join("/foo/bar", "/baz"));
console.log('path.resolve("/foo/bar", "/baz")', path.resolve("/foo/bar", "/baz"));
console.log();

console.log('path.join("/foo/bar", "/tmp/file")', path.join("/foo/bar", "/tmp/file"));
console.log('path.resolve("/foo/bar", "/tmp/file")', path.resolve("/foo/bar", "/tmp/file"));
console.log();
