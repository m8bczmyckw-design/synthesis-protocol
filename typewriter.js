window.typeText=(el,text,speed=22)=>new Promise(r=>{el.textContent='';let i=0;(function tick(){el.textContent+=text[i++]||'';if(i<=text.length)setTimeout(tick,speed);else r()})()});
