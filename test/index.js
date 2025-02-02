const { miniTest, miniTestReport } = require('../util/mini-test')();
const { passingCount, failingCount, runFiles, runDirectories } = require('./helper');
const assert = require('assert');

runDirectories(['require']);

const files = [
  {
    path: 'assert.js',
    args: []
  }, {
    path: 'done.js',
    args: []
  }, {
    path: 'promise.js',
    args: []
  }, {
    path: 'skip.js',
    args: []
  }, {
    path: 'async-await.js',
    args: []
  }, {
    path: 'console.js',
    args: []
  }
];

const output = runFiles(files, './test');

miniTest('assert.js has 1 passing test', () => {
  const testFile = output['assert.js'];
  assert.equal(passingCount(testFile.stdout), 1);
});

miniTest('assert.js has 1 failing test', () => {
  const testFile = output['assert.js'];
  assert.equal(failingCount(testFile.stdout), 1);
});

miniTest('skip.js has 0 passing test', () => {
  const testFile = output['skip.js'];
  assert.equal(passingCount(testFile.stdout), 0);
});

miniTest('skip.js has no match for failing', () => {
  const testFile = output['skip.js'];
  assert.equal(failingCount(testFile.stdout), null);
});

miniTest('console.js has the log of executed test', () => {
  const testFile = output['console.js'];
  assert.equal(testFile.stdout.includes('puts that one to the console'), true);
});

miniTest('console.js has no log of the skipped test', () => {
  const testFile = output['console.js'];
  assert.equal(testFile.stdout.includes('NOPE that one is not logged'), false);
});

miniTest('async-await.js has 1 passing test', () => {
  const testFile = output['async-await.js'];
  assert.equal(passingCount(testFile.stdout), 1);
});

miniTest('async-wait.js has 2 failing tests', () => {
  const testFile = output['async-await.js'];
  assert.equal(failingCount(testFile.stdout), 2);
});

miniTest('done.js has 2 passing tests', () => {
  const testFile = output['done.js'];
  assert.equal(passingCount(testFile.stdout), 2);
});

miniTest('done.js has 4 failing tests', () => {
  const testFile = output['done.js'];
  assert.equal(failingCount(testFile.stdout), 4);
});

miniTest('promise.js has 2 passing tests', () => {
  const testFile = output['promise.js'];
  assert.equal(passingCount(testFile.stdout), 2);
});

miniTest('promise.js has 4 failing tests', () => {
  const testFile = output['promise.js'];
  assert.equal(failingCount(testFile.stdout), 4);
});

miniTest('exitCode is 0 when all tests pass', () => {
  const testFile = output['skip.js'];
  assert.equal(testFile.status, 0);
});

miniTest('exitCode is 1 when at least one failing test', () => {
  const testFile = output['assert.js'];
  assert.equal(testFile.status, 1);
});

miniTestReport();
