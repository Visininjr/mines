(this.webpackJsonpmines=this.webpackJsonpmines||[]).push([[0],{55:function(e,t,n){},85:function(e,t){},88:function(e,t,n){"use strict";n.r(t);var i=n(2),r=n.n(i),c=n(48),o=n.n(c),a=(n(55),n(49)),l=n(5),s=n(8),d=n(1),u=10,h={setup:function(){var e=p(u,25);return{c1:e,c2:e}},turn:{moveLimit:1},moves:{clickCell:function(e,t,n){var i=n.split(" "),r=i[0],c=i[1];"0"===t.currentPlayer?b(e.c1,t,r,c):b(e.c2,t,r,c)},rightClick:function(e,t,n){var i=n.split(" "),r=i[0],c=i[1];if("0"===t.currentPlayer){var o=e.c1[r][c];if(o.open)return d.x;o.flag=!o.flag}else{var a=e.c2[r][c];if(a.open)return d.x;a.flag=!a.flag}}},endIf:function(e,t){return j(e.c1)?{winner:0}:j(e.c2)||f(e.c1)?{winner:1}:f(e.c2)?{winner:0}:void 0},onEnd:function(e,t){console.log(t.gameover)}},b=function(e,t,n,i){if(e[n][i].mine)e[n][i].open=1;else{var r=[];O(n,i);for(r.push([n,i]);r.length>0;){var c=r.shift(),o=Object(s.a)(c,2);n=o[0],i=o[1];var a=e[n][i];a.open||(a.mine||a.flag||(a.open=!0,a.neighborMineCount||O(n,i).forEach((function(e){var t=Object(s.a)(e,2),n=t[0],i=t[1];r.push([n,i])}))))}}},j=function(e){var t=0;return e.forEach((function(e){t+=e.filter((function(e){return e.flag&&e.mine})).length})),25===t},f=function(e){var t=0;return e.forEach((function(e){t+=e.filter((function(e){return e.open&&e.mine})).length})),t},p=function(e,t){for(var n=Object(l.a)(Array(e)).map((function(t){return Array(e)})),i=0;i<e;i++)for(var r=0;r<e;r++)n[i][r]={open:0,flag:0,mine:0,neighborMineCount:0,audio:0};return n=g(n,t)},g=function(e,t){for(var n=e.length,i=[],r=0;r<t;r++){for(var c=Math.floor(3*Math.random()),o=Math.floor(Math.random()*n),a=Math.floor(Math.random()*n),l=o+" "+a;i.includes(l);)l=(o=Math.floor(Math.random()*n))+" "+(a=Math.floor(Math.random()*n));i.push(l),e[o][a].mine=1,1===c?e[o][a].audio=1:2===c&&(e[o][a].audio=3),e=x(e,o,a,c)}return e},x=function(e,t,n,i){return O(t,n).forEach((function(t){var n=Object(s.a)(t,2),r=n[0],c=n[1];e[r][c].neighborMineCount+=1,1!==i||e[r][c].mine?2!==i||e[r][c].mine||(e[r][c].audio=4):e[r][c].audio=2})),e},O=function(e,t){for(var n=[],i=Math.max(0,e-1);i<=Math.min(e+1,9);i++)for(var r=Math.max(0,t-1);r<=Math.min(t+1,9);r++)i===e&&r===t||n.push([i,r]);return n},m=n(0),v=n(4),y=new Audio("audio/mdlow.mp3"),C=new Audio("audio/mdhigh.mp3");var M={button:{backgroundColor:"#04AA6D",border:"none",color:"white",padding:"20px",textAlign:"center",textDecoration:"none",display:"inlineBlock",fontSize:"16px",marginTop:"10px",marginBottom:"5px"},c:{padding:"10px",border:"1px solid black"},container:{paddingTop:"50px",margin:"auto",width:"100%",height:"100%",textAlign:"center",minHeight:"100vh"},htpcontain:{margin:"auto",justifyContent:"center",alignSelf:"center",width:"50%",padding:"10px",border:"2px solid black"},cell:{border:"1px solid #555",width:"50px",height:"50px",lineHeight:"50px",textAlign:"center"},legend:{position:"absolute",left:"50px",top:"180px"},legend2:{position:"absolute",right:"50px",top:"100px"},playAgain:{padding:10,marginTop:10,paddingTop:15,paddingBottom:15,marginLeft:30,marginRight:30,borderRadius:10,backgroundColor:"#00dddd",color:"#fff",fontSize:15,fontWeight:"bold"},switch:{position:"absolute",top:"30%",left:"50%",transform:"translate(-50%, -10%)",fontSize:"50px",backgroundColor:"#D22B2B",padding:20,color:"white",borderRadius:10},text:{textAlign:"center"},table:{marginLeft:"auto",marginRight:"auto"}},w=Object(a.a)({game:h,board:function(e){var t=Object(i.useState)(!0),n=Object(s.a)(t,2),r=n[0],c=n[1],o=Object(i.useState)(0),a=Object(s.a)(o,2),l=a[0],d=a[1],h=Object(i.useState)(!1),b=Object(s.a)(h,2),j=b[0],f=b[1],p=Object(i.useState)(null),g=Object(s.a)(p,2),x=g[0],O=g[1],w=Object(i.useState)([]),k=Object(s.a)(w,2),S=k[0],A=k[1],T=Object(i.useState)([]),D=Object(s.a)(T,2),G=D[0],P=D[1],E=Object(i.useState)([]),L=Object(s.a)(E,2),B=L[0],I=L[1],z=Object(i.useState)(0),F=Object(s.a)(z,2),R=F[0],H=F[1],J=Object(i.useState)(0),W=Object(s.a)(J,2),N=W[0],q=W[1],Q=function(){y.play()},Y=function(){C.play()},K=function(t){var n=t.split(" "),i=parseInt(n[0]),r=parseInt(n[1]);if(X(),"0"===e.ctx.currentPlayer){var c=e.G.c1[i][r];if(c.open||c.flag)return}if("1"===e.ctx.currentPlayer){var o=e.G.c2[i][r];if(o.open||o.flag)return}e.moves.clickCell(t),d(1-l),e.ctx.gamover||(f(!0),setTimeout((function(){f(!1)}),2e3))},U=function(t,n){t.preventDefault(),X(),e.moves.rightClick(n),d(1-l),e.ctx.gamover||(f(!0),setTimeout((function(){f(!1)}),2e3))},V=function(t,n){var i=n.split(" "),r=parseInt(i[0]),c=parseInt(i[1]);"0"===t.target.classList[0]?1===e.G.c1[r][c].audio?Y():2===e.G.c1[r][c].audio&&Q():"1"===t.target.classList[0]&&(3===e.G.c2[r][c].audio?Y():4===e.G.c2[r][c].audio&&Q())},X=function(){y.pause(),y.currentTime=0,C.pause(),C.currentTime=0},Z=function(e,t){for(var n=[],i=0,r=0;r<u;r++){for(var c=[],o=function(n){var o=r+" "+n;c.push(Object(v.jsx)("td",{style:Object(m.a)(Object(m.a)({},M.cell),{backgroundColor:!e[r][n].open||e[r][n].neighborMineCount||e[r][n].mine?"white":"#CDCDCD"}),className:t,onClick:function(){return K(o)},onContextMenu:function(e){return U(e,o)},onMouseEnter:function(e){return V(e,o)},onMouseLeave:function(){return X()},children:e[r][n].open?e[r][n].mine?"\ud83d\udca3":e[r][n].neighborMineCount?e[r][n].neighborMineCount:null:e[r][n].flag?"\ud83d\udea9":null},o)),e[r][n].flag&&i++},a=0;a<u;a++)o(a);n.push(Object(v.jsx)("tr",{children:c},r))}return 1===t?H(i):q(i),n};return Object(i.useEffect)((function(){y.load(),C.load(),y.loop=!0,C.loop=!0;var t=function(e){for(var t=[],n=0;n<u;n++){for(var i=[],r=0;r<u;r++){var c=n+" "+r;i.push(Object(v.jsx)("td",{style:Object(m.a)(Object(m.a)({},M.cell),{backgroundColor:e[n][r].neighborMineCount||e[n][r].mine?"white":"#CDCDCD"}),children:e[n][r].mine?"\ud83d\udca3":e[n][r].neighborMineCount?e[n][r].neighborMineCount:null},c))}t.push(Object(v.jsx)("tr",{children:i},n))}return t}(e.G.c1);I(t)}),[]),Object(i.useEffect)((function(){var t=Z(e.G.c1,0),n=Z(e.G.c2,1);A(t),P(n)}),[e.G]),Object(i.useEffect)((function(){void 0!==e.ctx.gameover&&O(e.ctx.gameover.winner)}),[e.ctx.gameover]),Object(v.jsx)("div",{style:M.container,children:r?Object(v.jsxs)("div",{style:M.container,children:[Object(v.jsx)("h1",{style:{fontSize:"80px"},children:" Mines! "}),Object(v.jsx)("button",{style:M.button,onClick:function(){c(!1)},children:" Click to Start! "}),Object(v.jsx)("h5",{style:{paddingBottom:"50px"},children:" Made by Josh "}),Object(v.jsxs)("div",{style:M.htpcontain,children:[Object(v.jsx)("h2",{children:" How to play: "}),Object(v.jsx)("p",{children:" 1. Decide who goes first "}),Object(v.jsx)("p",{children:" 2. Take turns solving your respective minesweeper boards "}),Object(v.jsx)("p",{children:" 3. Mouse over cells and use audio to help identify mines "}),Object(v.jsx)("p",{children:" 4. Left click to reveal an area. Right click to place/remove a flag "}),Object(v.jsx)("p",{children:" 5. Audio information is player unique, but boards are identical, so be sure to keep your audio secret "}),Object(v.jsx)("p",{children:" 6. There are a lot of mines, so feel free to use the audio to work together, lie, or trade information "}),Object(v.jsx)("p",{children:" 7. The game ends when all mines are correctly flagged or someone opens a mine "}),Object(v.jsx)("p",{children:" 8. When the game is over, the two boards are placed side by side. Feel free to learn from them! "})]}),Object(v.jsxs)("div",{style:M.legend,children:[Object(v.jsx)("p",{style:{fontSize:"20px",fontWeight:"bold"},children:" Mines! Quick Guide Table "}),Object(v.jsx)("table",{children:Object(v.jsxs)("tbody",{children:[Object(v.jsxs)("tr",{children:[Object(v.jsx)("td",{style:M.c,children:"left click"}),Object(v.jsx)("td",{style:M.c,children:"open cell"})]}),Object(v.jsxs)("tr",{children:[Object(v.jsx)("td",{style:M.c,children:"flag (right click)"}),Object(v.jsx)("td",{style:M.c,children:"\ud83d\udea9"})]}),Object(v.jsxs)("tr",{children:[Object(v.jsx)("td",{style:M.c,children:"bomb"}),Object(v.jsx)("td",{style:M.c,children:"\ud83d\udca3"})]})]})})]})]}):null!==x?Object(v.jsxs)("div",{children:[Object(v.jsxs)("h1",{style:M.text,children:[" Player ",x+1," wins \ud83c\udf89\ud83c\udf89"]}),Object(v.jsx)("button",{onClick:function(){window.location.reload()},style:M.playAgain,children:" PLAY AGAIN "}),Object(v.jsx)("h4",{children:" Player 1 "}),Object(v.jsx)("table",{style:M.table,children:Object(v.jsx)("tbody",{children:S})}),Object(v.jsx)("h4",{children:" Player 2 "}),Object(v.jsx)("table",{style:M.table,children:Object(v.jsx)("tbody",{children:G})}),Object(v.jsx)("h4",{children:" Solution "}),Object(v.jsx)("table",{style:M.table,children:Object(v.jsx)("tbody",{children:B})})]}):j?Object(v.jsx)("div",{style:M.switch,children:Object(v.jsx)("h1",{children:"Switch Turns"})}):Object(v.jsxs)("div",{children:[Object(v.jsxs)("h1",{styles:M.text,children:[" Player ",l+1,"'s turn "]}),Object(v.jsx)("table",{id:"board",style:M.table,children:Object(v.jsx)("tbody",{children:l?G:S})}),Object(v.jsx)("table",{style:M.legend2,children:Object(v.jsx)("tbody",{children:Object(v.jsxs)("tr",{children:[Object(v.jsx)("td",{style:M.c,children:"\ud83d\udea9 / \ud83d\udca3"}),Object(v.jsxs)("td",{style:M.c,children:[l?R:N," / ",25]})]})})})]})})},debug:!1}),k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,90)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),i(e),r(e),c(e),o(e)}))};o.a.render(Object(v.jsx)(r.a.StrictMode,{children:Object(v.jsx)(w,{})}),document.getElementById("root")),k()}},[[88,1,2]]]);
//# sourceMappingURL=main.9a64f3a7.chunk.js.map