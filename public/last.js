"use strict";

//期末レポ関係
let total_count = 0;
let nedan_count = 0;
let number_kanri = 0;
const ji = document.querySelector('#ji');
const result = document.querySelector('#result');
const total = document.querySelector('#total');
const nedan = document.querySelector('#nedan_total');

document.querySelector('#buy').addEventListener('click', () => {
    const want = document.querySelector('#want').value;

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
        total_count += response.nun;
        if(response.want == ""){
            response.want = "無";
        }
        result.innerHTML = `<p>ルーレットの結果は${response.luck}，${response.want}が${response.nun}本</p>`;
        total.innerHTML = `<p>総合計本数：${total_count}本`;
        number_kanri += response.kanri;

        document.querySelector('#want').value = "";
    });
});

document.querySelector('#nedan').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  'total_count='+total_count+'&nedan_count='+nedan_count,
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
        nedan_count += response.nedan_total;
        nedan.innerHTML = ` 総額：${nedan_count}円 `
    });
});

document.querySelector('#reset').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/reset";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#want').value = "";
        document.querySelector('#result').value = "";
        document.querySelector('#total').value = "";
        document.querySelector('#nedan').value = "";
    });
});
