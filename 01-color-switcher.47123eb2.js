const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let n=!1,r=null;function o(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.addEventListener("click",(function(){if(n)return;n=!0,document.body.style.backgroundColor=o(),r=setInterval((()=>{document.body.style.backgroundColor=o()}),1e3)})),e.addEventListener("click",(function(){if(!n)return;clearInterval(r)}));
//# sourceMappingURL=01-color-switcher.47123eb2.js.map
