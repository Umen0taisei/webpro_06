"use strict";

//期末レポ関係
let totalcon = 0;
let nedancon = 0;
const ji = document.querySelector('#ji');
const result = document.querySelector('#result');
const total = document.querySelector('#total');
const nedan = document.querySelector('#nedan_total');

document.querySelector('#buy').addEventListener('click', () => {
    const want = document.querySelector('#want').value;
    // const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'want='+want,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/buy";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        totalcon += response.nun
        result.innerHTML = `<p>ルーレットの結果は${response.luck}，${response.want}が${response.nun}本</p>`
        total.innerHTML = `<p>総合計本数：${totalcon}本`

        document.querySelector('#want').value = "";
    });
});

document.querySelector('#nedan').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  'totalcon='+totalcon+'&nedancon='+nedancon,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/nedan";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        nedancon += response.nedan;
        nedan.innerHTML = `<p>総額：${nedancon}円`
    });
});
