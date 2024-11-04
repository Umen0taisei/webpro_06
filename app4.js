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

app.get("/gatya10", (req, res) => {
  //１０連用にfor文回す
  const resu = [];
  for(let i =0;i<10;i++){
  const num = Math.floor( Math.random() * 101 + 1 );
  let gatya = '';

  if(num == 101)gatya = '[USSR]完全無欠'; /*0.01% */
  else if(num > 95)gatya = '[SSR]不倶戴天'/*0.05%*/
  else if(num <= 95,num > 90)gatya = '[SSR]画竜点睛'/*0.05%*/
  else if(num <= 90,num > 75)gatya = '[SR]大胆不敵'/*0.15%*/
  else if(num <= 75,num > 50)gatya = '[SR]前途洋々'/*0.15%*/
  else if(num <= 50,num > 25)gatya = '[R]起承転結'/*0.15%*/
  else gatya = '[R]焼肉定食'

  resu.push(gatya);
  }
  res.render( 'gatya10', {resu:resu} );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
