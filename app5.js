const e = require("express");
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


app.get("/bj", (req, res) => {
  //req.qyery.radioでどの操作するか
  const value =req.query.radio;
  //トランプ配列定義
  const tranp = [];
  for (let t = 1; t <= 14; t++){
    if(t==14){
      for(let j = 0; j < 2; j++){
        tranp.push(t);
      }
    }else if(t >= 10){
      for(let i = 0;i < 4;i++){
        tranp.push(10);
      }
    }else{
      for(let k = 0; k < 4; k++){
        tranp.push(t);
      }
    }
  }
  //文字列をNumber関数で数字に変換
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  let judgement = '';
  total += 1;
  //デバッグ用
  console.log( {value, win, total});

  function draw(array){
    const num = Math.floor( Math.random() * array.length);
    const drawc = array.splice(num,1)[0];
    return drawc;
  }
  
  //gm側操作
  // let gm = 0;
  // while(gm <= 17){
  //   const num = Math.floor( Math.random() * tranp.length);
  //   const [gmdraw] = tranp.splice(num,1);
  //   gm = gm + gmdraw;
  // }
  let gmhand = [];
  let gmdraw = 0;
  let gm = 0;
  while( gm <= 17 ){
    gmdraw = draw(tranp);
    gmhand.push(gmdraw);
    gm += gmdraw;
  }
  console.log( {gmdraw,gm});


  //PL側操作
  let plhand =[];
  let pldraw = 0;
  let pl = 0;
  for(let i = 0;i < 2;i++){
    pldraw = draw(tranp);
    plhand.push(pldraw);
    pl += pldraw;
  }
  console.log( {pldraw,pl});

  if (value == 1){
    pldraw = draw(tranp);
    plhand.push(pldraw);
    pl += pldraw;
  }
  else 
    if(pl & gm ==21) judgement = '引き分け';
    else if(pl >= 21) judgement = 'バースト！あなたの負け';
    else if(gm >= 21) judgement = '勝利！';
    else if(pl > gm) judgement = '勝利！';
    else if(pl = gm) judgement = '引き分け';
    else judgement = '負け';
  if(judgement == '勝利！')win += 1;

  const display = {
    your: plhand,
    cpu: gmhand,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render('bj', display );

});

app.get("/jihanki", (req, res) => {
  //req.qyery.nameで入力された内容をとってくることができる
  let drink = req.query.drink;
  let N = 1;
  //文字列をNumber関数で数字に変換
  let total = Number( req.query.total );

  let luck = [];
  let hon = 1;
  let com = '';
  for(let i = 0;i < 3;i++){
    const num = Math.floor( Math.random() * 10);
    luck.push(num);
  }
  if (luck[0] === luck[1] && luck[1] === luck[2]) {
    hon = Math.floor(Math.random() * 50000 + 50001); 
    com = '超大当たり！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！'
  }else{
    hon = Math.floor(Math.random() * 500 + 501);
    com = '大当たり！！！！！！！！！！'
  }
  N *= hon;
  total += N;

  console.log({drink,N,luck,com,total})
  const display = {
    your: drink,
    hon: N,
    luck: luck,
    com: com,
    total: total
  }

  res.render( 'jihanki', display );
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
