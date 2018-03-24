/*
 * テスト用の自動正男を表示する用のウェブサーバーを立ち上げる
 * 環境変数PORTでポートを指示可能
 */

const path = require('path');
const fs = require('fs');
const globby = require('globby');
const open = require('open');
const express = require('express');
const nunjucks = require('nunjucks');
const PORT = parseInt(process.env.PORT, 10) || 8080;

const app = express();

// nunjucksをexpressで使用するための設定
nunjucks.configure(path.join(__dirname, 'views'), {
  express: app,
});

// 静的ファイルの配信
app.use('/output', express.static(path.join(__dirname, '../../Outputs')));
app.use('/static', express.static(path.join(__dirname, '../../Samples')));

// トップページは存在する正男を列挙
app.get('/', (req, res, next) => {
  // 正男を列挙
  globby(['__tests__/**/*.masao.json'], {
    cwd: path.join(__dirname, '..'),
  })
    .then(paths => {
      res.render('index.njk', {
        paths,
      });
    })
    .catch(next);
});

// 各ページ
app.get('/__tests__/*', (req, res, next) => {
  // ファイルを読む
  fs.readFile(
    path.join(__dirname, '..', req.url.slice(1)),
    'utf8',
    (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.sendStatus(404);
        } else {
          next(err);
        }
        return;
      }
      const stage = JSON.parse(data);
      res.render('game.njk', {
        params: JSON.stringify(stage.params),
        options: JSON.stringify({
          'advanced-map': data['advanced-map'],
        }),
      });
    },
  );
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);

// コマンドライン引数でJSONファイルが指定されていたらそれを開く
const arg = process.argv[2];
if (arg) {
  const rel = path.relative(
    path.join(__dirname, '../__tests__'),
    path.resolve(process.env.INIT_CWD, arg),
  );
  if (rel.slice(0, 3) !== '..' + path.sep) {
    // この中にありそうなので開く
    console.log(`opening ${arg}`);
    open(`http://localhost:${PORT}/__tests__/${rel}`);
  }
}
