const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  //req.qyery.nameで入力された内容をとってくることができる
  let hand = req.query.hand;
  //文字列をNumber関数で数字に変換
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  total += 1;
  //デバッグ用
  console.log( {hand, win, total});
  //cpu側操作
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー'; //3
  // ここに勝敗の判定を入れる
  let judgement = '';
  let plnum = 0;
  if (hand == 'グー')plnum = 1;
  else if( hand =='チョキ' ) plnum = 2;
  else plnum = 3; //パー

  if(num == plnum) judgement = 'あいこ';
  else if(num == 3 & plnum == 1)judgement = '負け';
  else if(num == 1 & plnum == 3)judgement = '勝ち';
  else if(num < plnum)judgement = '負け';
  else if(num > plnum)judgement = '勝ち';
  else 0;

  if(judgement == '勝ち')win += 1;
  //デバッグ用２
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  //janken.ejsを見にいく
  //テンプレファイルのjanken使用
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
