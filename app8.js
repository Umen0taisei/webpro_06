"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

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
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log( req.query );
  const num1 = Number( req.query.num1 );
  const num2 = Number( req.query.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log( req.body );
  const num1 = Number( req.body.num1 );
  const num2 = Number( req.body.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});





// これより下はBBS関係
app.post("/check", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  res.json( {number: bbs.length });
});

app.post("/read", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  const start = Number( req.body.start );
  console.log( "read -> " + start );
  if( start==0 ) res.json( {messages: bbs });
  else res.json( {messages: bbs.slice( start )});
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  console.log( [name, message] );
  // 本来はここでDBMSに保存する
  bbs.push( { name: name, message: message } );
  res.json( {number: bbs.length } );
});

app.get("/bbs", (req,res) => {
    console.log("GET /BBS");
    res.json( {test: "GET /BBS" });
});

app.post("/bbs", (req,res) => {
    console.log("POST /BBS");
    res.json( {test: "POST /BBS"});
})

app.get("/bbs/:id", (req,res) => {
    console.log( "GET /BBS/" + req.params.id );
    res.json( {test: "GET /BBS/" + req.params.id });
});

app.put("/bbs/:id", (req,res) => {
    console.log( "PUT /BBS/" + req.params.id );
    res.json( {test: "PUT /BBS/" + req.params.id });
});

app.delete("/bbs/:id", (req,res) => {
    console.log( "DELETE /BBS/" + req.params.id );
    res.json( {test: "DELETE /BBS/" + req.params.id });
});

//これより下は期末レポート関係

let ji = [];
let total_memo = 0;

app.post('/buy', (req,res) => {
  const want = req.body.want;
  let nun = 1;
  let luck =[];

  for(let i = 0;i < 3;i++){
    const num = Math.floor( Math.random() * 10);
    luck.push(num);
  }

  if (luck[0] == luck[1] && luck[1] == luck[2]) {
    nun = Math.floor(Math.random() * 50000 + 50001); 
    //50001~100000
  }else if(luck[0] == luck[1]){
    nun = Math.floor(Math.random() * 500 + 501);
    //501~1000
  }else if(luck[1] == luck[2]){
    nun = Math.floor(Math.random() * 500 + 501);
  }else if(luck[0] == luck[2]){
    nun = Math.floor(Math.random() * 500 + 501);
  }
  ji.push(want);
  let kanri = ji.length;
  console.log([
    "買いたいもの:"+want,
    "ルーレットの結果:"+luck,
    "獲得本数"+nun,
    "管理番号"+kanri
  ]);
  res.json({want,luck,nun,kanri});
});

app.post('/nedan', (req,res) => {
  let total = req.body.total_count; //総合計数
  let nedan_total = req.body.nedan_count; //総額
  let nedan_puls = 0; //総額加算用変数
  let total_puls = 0; //追加分カウント用
  let count_a = 0;
  let count_b = 0;
  let count_c = 0;
  let kanri = ji.length;
  let keisan_ok = 0;

  total_puls = total - total_memo;

  console.log([
    "総合計:"+total,
    "総額:"+nedan_total,
    "加算金額"+nedan_puls,
    "増加数:"+total_puls,
    "前回の合計:"+total_memo,
    "管理番号"+kanri,
    "計算済み管理番号"+keisan_ok
  ]);

  if(kanri != keisan_ok){
  for(let i = keisan_ok; i < total_puls; i++){
    const number = Math.floor(Math.random()*10);
    if(number == 0){
      nedan_puls += 500; 
      count_a += 1;
    }else if(number < 3){
      nedan_puls += 300;
      count_b += 1;
    }else{
      nedan_puls += 100;
      count_c += 1;
      }
      keisan_ok += 1;
    }
  }
  ji = [];
  total_memo = total;
  nedan_total = nedan_puls;

  console.log([
    "計算後結果",
    "総合計:"+total,
    "総額:"+nedan_total,
    "加算金額"+nedan_puls,
    "管理番号"+kanri,
    "計算済み管理番号"+keisan_ok,
    "増加数:"+total_puls,
    "前回の合計:"+total_memo,
    "500:"+count_a,
    "300:"+count_b,
    "100:"+count_c
  ]);

  res.json({nedan_total,count_a,count_b,count_c});
});

app.post("/reset", (req,res) => {
  ji = [];
  total_memo = 0;
  let kanri = ji.length
  console.log(ji,total_memo,kanri);
  res.json(kanri);
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));