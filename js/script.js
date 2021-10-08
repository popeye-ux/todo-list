//指定DOM
let send = document.querySelector('.send');
let list = document.querySelector('.list');
let finishList = document.getElementById('finishlist');

//資料：設定計畫邀請名單「listData」的localStorage資料，轉為陣列物件
let data = JSON.parse(localStorage.getItem('listData')) || [];
//資料：設定寄出名單「listFinish」的localStorage資料，轉為陣列物件
let finishData = JSON.parse(localStorage.getItem('listFinish')) || [];


//事件綁定，監聽與更新
send.addEventListener('click', addData);
list.addEventListener('click', toggleDone);
finishList.addEventListener('click', deleDone);

//更新畫面上的資料
updateList(data);
updateFinish(finishData);

function addData(e) {
    var txt = document.querySelector('.text');
    if (txt.value == "") {
        alert('必須輸入與會者姓名');
        return;
    }
    var toInvite =
    {
        content: txt.value
    }

    data.push(toInvite);    
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
    txt.value = '';
}
//更新邀請清單
function updateList(items) {
    str = '';
    let len = items.length;    
    for (let i = 0; len > i; i++) {
        console.log(items[i])
        str += `<li><a href="#" data-index=${i}>移到已邀請</a><span>${items[i].content}</span></li>`;
    }
    list.innerHTML = str;
    let noneNum = document.querySelector('.noneNum');
    noneNum.textContent = len;
}

//將與會者由邀請清單移至邀請函已寄出清單
function toggleDone(e){
    e.preventDefault();
    if(e.target.nodeName !== 'A'){
        return;
    }
    let index = e.target.dataset.index;
    console.log(index);
    finishData.push(data[index]);
    console.log(data[index]);
    data.splice(index,1);
    localStorage.setItem('listData',JSON.stringify(data));
    updateList(data);
    localStorage.setItem('listFinish',JSON.stringify(finishData));
    updateFinish(finishData);
}

//更新已寄邀請函清單
function updateFinish(finishItems){
    let mailStr = '';
    let len = finishItems.length;
    console.log(finishItems);
    console.log(len);
    for(let i=0;i<len; i++){
        console.log(finishItems[i]);
        mailStr+= `<li><a href="#" data-num=${i}>移除</a><span>${finishItems[i].content}</span></li>`
    }
    finishList.innerHTML = mailStr;
    var doneNum = document.querySelector('.doneNum');
    doneNum.textContent = len;
}

//刪除已邀請的貴賓
function deleDone(e){
    e.preventDefault();
    if(e.target.nodeName !== 'A'){
        return;
    }
    let num = e.target.num;
    finishData.splice(num,1);
    localStorage.setItem('listFinish',JSON.stringify(finishData));
    updateFinish(finishData);
}

