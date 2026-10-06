document.addEventListener("DOMContentLoaded", function(){
  var pageId = location.pathname;

  // LIKE - h1 title ke neeche - har kahani me pakka
  if(!document.getElementById('likeBtn')){
    var title = document.querySelector('h1');
    if(title){
      var cnt = localStorage.getItem('like_'+pageId)||0;
      var div = document.createElement('div');
      div.style.textAlign='center'; div.style.margin='15px 0';
      div.innerHTML = '<button id="likeBtn" style="background:#e91e63;color:#fff;border:0;padding:10px 25px;border-radius:25px;font-size:18px;box-shadow:0 0 8px #e91e63">❤️ Like <span>'+cnt+'</span></button>';
      title.insertAdjacentElement('afterend', div);
      div.querySelector('button').onclick = function(){
        var n=parseInt(localStorage.getItem('like_'+pageId)||0)+1;
        localStorage.setItem('like_'+pageId,n);
        div.querySelector('span').innerText=n;
      };
    }
  }

  // COMMENT - mazid kahaniyan se pehle
  var more = null;
  document.querySelectorAll('*').forEach(function(e){
    if(e.textContent.includes('مزید کہانیاں پڑھیں') && e.children.length==0 && !more){ more=e; }
  });
  if(more && !document.getElementById('cmtBox')){
    var box = document.createElement('div');
    box.id='cmtBox';
    box.style.cssText='background:#111;padding:15px;border-radius:12px;margin:20px 10px;border:1px solid #444';
    box.innerHTML = '<h3 style="color:gold;text-align:center;margin:0">💬 کمنٹ کریں</h3><div style="display:flex;gap:5px;margin-top:10px"><input id="cmtIn" placeholder="اپنا خیال لکھیں..." style="flex:1;padding:10px;border-radius:20px;border:0;background:#222;color:#fff"><button id="cmtSend" style="padding:10px 15px;border-radius:20px;background:gold;border:0">بھیجیں</button></div><div id="cmtList" style="margin-top:10px"></div>';
    more.parentElement.parentElement.insertBefore(box, more.parentElement);
    function load(){var a=JSON.parse(localStorage.getItem('cmt_'+pageId)||"[]");var l=document.getElementById('cmtList');l.innerHTML='';a.forEach(t=>{l.innerHTML+='<div style="background:#222;color:#fff;padding:8px 12px;border-radius:8px;margin:6px 0;text-align:right">'+t+'</div>';});}
    document.getElementById('cmtSend').onclick=function(){var i=document.getElementById('cmtIn');if(!i.value.trim())return;var a=JSON.parse(localStorage.getItem('cmt_'+pageId)||"[]");a.push(i.value);localStorage.setItem('cmt_'+pageId,JSON.stringify(a));i.value='';load();};
    load();
  }
});