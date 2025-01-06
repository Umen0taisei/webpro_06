"use strict";

//期末レポ関係
let total_count = 0;
let nedan_count = 0;
let countA = 0;
let countB = 0;
let countC = 0;
let number_kanri = 0;
const ji = document.querySelector('#ji');
const result = document.querySelector('#result');
const total = document.querySelector('#total');
const nedan = document.querySelector('#nedan_total');
const luck = document.querySelector('#luck');

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
        luck.innerHTML = `<p>${response.luck}</p>`;
        result.innerHTML = `<p>ルーレットの結果は${response.luck}，${response.want}を${response.nun}本獲得しました！</p>`;
        total.innerHTML = `<p>総合計本数：<span class="big">${total_count}本</span>`;
        number_kanri = response.kanri;
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
        countA += response.count_a;
        countB += response.count_b;
        countC += response.count_c;
        number_kanri = 0;
        nedan.innerHTML = `500円の本数は<span class="big">${countA}本</span>,
                            300円の本数は<span class="big">${countB}本</span>,
                            100円の本数は<span class="big">${countC}本</span>でした．
                            <br>
                            総額：<span class="big">${nedan_count}円</span> `
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
        number_kanri = response;
        document.querySelector('#want').value = "";
        nedan.innerHTML = ` 総額：0円 `;
        result.innerHTML = ``;
        luck.innerHTML = `<p>ルーレット</p>`;
        total.innerHTML = `<p>総合計本数：0本</p>`;
        total_count = 0;
        nedan_count = 0;
        countA = 0;
        countB = 0;
        countC = 0;

    });
});
