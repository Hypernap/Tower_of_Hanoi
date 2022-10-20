bodyT = document.getElementsByTagName('body')[0];
width = bodyT.clientWidth;
height = bodyT.clientHeight;
diskColors = ["#944941", "#444941","#244941"]
diskWidth=120
diskHeight=30
// anime({
//   targets: "#testing",
//   translateY:[0,164+height/2-diskHeight],
//   translateX:[0,0.25*(width-135)+45/2-diskWidth/2],
//   duration:0
// });
function createDisks() {
  n = document.getElementById("hanoi_n").value;
  doc= document.getElementsByClassName("disk__container")[0];
  doc.innerHTML="";
  console.log(n,Array(n));
  for (let i = 0; i < n; ++i) {
    doc.innerHTML+=`<div style="background-color:${diskColors[i%diskColors.length]}" id="disk${i}" class="disk"></div>`;
  }
}
function start() {
  createDisks();
}
document.getElementById("inp_btn").onclick = start;