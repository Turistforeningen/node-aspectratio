var watch = require('fs').watchFile;
var spawn = require('child_process').spawn;

var opts = { interval: 50 };

watch('./test.js', opts, run);
watch('./index.js', opts, run);

console.log('Watching test.js, index.js...');

var child = null;

function run(curr, prev) {
  if (curr.mtime === prev.mtime) { return; }
  if (child) { child.kill('SIGHUP'); }

  child = spawn('./node_modules/.bin/mocha', ['test.js']);
  child.stdout.on('data', function (data) {
    process.stdout.write(data);
  });

  child.stderr.on('data', function (data) {
    process.stderr.write(data);
  });

  child.on('close', function (code) {
    child = null;
  });
};

