document.addEventListener("DOMContentLoaded", function(){
  var pageId = location.pathname;

  // LIKE - h1 title ke neeche
  if(!document.getElementById('likeBtn')){
    var title = document.querySelector('h1');
    if(title){
      var cnt = localStorage.getItem('like_'+pageId)||0;
      var div = document.createElement('div');
      div.style.textAlign='center'; 
      div.style.margin='15px 0';
      div.innerHTML = '<button id="likeBtn" style="background:#e91e63;color:#fff;border:0;padding:10px 25px;border-radius:25px;font-size:18px">❤️ Like <span>'+cnt+'</span></button>';
      title.insertAdjacentElement('afterend', div);
      div.querySelector('button').onclick = function(){
        var n=parseInt(localStorage.getItem('like_'+pageId)||0)+1;
        localStorage.setItem('like_'+pageId,n);
        div.querySelector('span').innerText=n;
      };
    }
  }

  // COMMENT - mazid kahaniyan se pehle - button neeche fixed
  var more = null;
  document.querySelectorAll('*').forEach(function(e){
    if(e.textContent.includes('مزید کہانیاں پڑھیں') && e.children.length==0 && !more){ more=e; }
  });
  if(more && !document.getElementById('cmtBox')){
    var box = document.createElement('div');
    box.id='cmtBox';
    box.style.cssText='background:#111;padding:15px;border-radius:12px;margin:20px 10px;border:1px solid #444;box-sizing:border-box';
    box.innerHTML = '<h3 style="color:gold;text-align:center;margin:0 0 10px 0">💬 کمنٹ کریں</h3><input id="cmtIn" placeholder="اپنا خیال لکھیں..." style="width:100%;box-sizing:border-box;padding:12px;border-radius:10px;border:0;background:#222;color:#fff;text-align:right;display:block"><button id="cmtSend" style="width:100%;margin-top:10px;padding:12px;border-radius:10px;background:gold;color:#000;border:0;font-weight:bold;font-size:16px">بھیجیں</button><div id="cmtList" style="margin-top:12px"></div>';
    more.parentElement.parentElement.insertBefore(box, more.parentElement);
    function load(){
      var a=JSON.parse(localStorage.getItem('cmt_'+pageId)||"[]");
      var l=document.getElementById('cmtList');
      l.innerHTML='';
      a.forEach(function(t){ l.innerHTML+='<div style="background:#222;color:#fff;padding:8px 12px;border-radius:8px;margin:6px 0;text-align:right;word-break:break-word">'+t+'</div>'; });
    }
    document.getElementById('cmtSend').onclick=function(){
      var i=document.getElementById('cmtIn');
      if(!i.value.trim()) return;
      var a=JSON.parse(localStorage.getItem('cmt_'+pageId)||"[]");
      a.push(i.value);
      localStorage.setItem('cmt_'+pageId, JSON.stringify(a));
      i.value='';
      load();
    };
    load();
  }
});