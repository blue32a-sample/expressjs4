const express = require('express');
const app = express();
const port = 3000;

const mw1 = (req, res, next) => {
  console.log('1 (mw1)');
  next();
  // nextの後は、エラー処理ミドルウェアでも有効
  console.log('6 (mw1)');
}

const mw2 = (req, res, next) => {
  console.log('2 (mw2)');

  if (req.query.fuga) {
    console.log('3 (mw2) fuga exist');
    return next();
    // returnすればこの後は実行されない
  }

  console.log('3 (mw2) fuga not exist');
  next();
  // nextの後は、エラー処理ミドルウェアでも有効
  console.log('5 (mw2)');
}

app.get('/', mw1, mw2, (req, res) => {
  console.log('4 (hello)');
  res.send('Hello World!');
});

app.get('/error', mw1, mw2, (req, res) => {
  console.log('4 (error)');
  throw new Error('example');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Oops!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
