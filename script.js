diskWidth = 120
diskHeight = 50
towerWidth = 45
titleHeight = 163
timeDelay = 600
n = 0
bodyT = document.getElementsByTagName('body')[0];
width = bodyT.clientWidth;
height = bodyT.clientHeight;
diskColors = ["#ef4444", "#fbbf24", "#06b6d4", "#d946ef", "#a5b4fc"]
dstBtwTower = (width * 0.2)
window.addEventListener('resize', () => { reset(); location.reload(); console.log("hello") });
let animation, tower;
function towerOfHanoi(n, from_rod, to_rod, aux_rod) {
  if (n == 0) {
    return;
  }
  towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
  move(from_rod, to_rod)
  // console.log(n);
  towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
}

function move(src, dst) {
  steps = dst.codePointAt(0) - src.codePointAt(0)
  diskToMove = towers[src].pop()
  lenSrc = towers[src].length
  dec = (dstBtwTower - towerWidth) / n
  // console.log(steps, diskToMove, lenSrc, dec)
  towers[dst].push(diskToMove)
  lenDst = towers[dst].length
  if (src == "A") {
    transX = (steps + 1) * 0.25 * (width - towerWidth * 3) + steps * towerWidth - (dstBtwTower - dec * (n - diskToMove) - towerWidth) / 2
  }
  else if (dst == "A") {
    // console.log((dstBtwTower -dec*(n-diskToMove)-towerWidth))
    transX = 0.25 * (width - towerWidth * 3) + towerWidth / 2 - (dstBtwTower - dec * (n - diskToMove)) / 2
  }
  else if (dst == "B") {
    transX = 0.5 * (width - towerWidth * 3) + towerWidth + towerWidth / 2 - (dstBtwTower - dec * (n - diskToMove)) / 2
  }
  else if (dst == "C") {
    transX = 0.75 * (width - towerWidth * 3) + towerWidth * 2 + towerWidth / 2 - (dstBtwTower - dec * (n - diskToMove)) / 2
    console.log(transX)
  }
  // console.log(transX)   
  animation.add({
    targets: `#disk${diskToMove}`,
    translateY: [{ value: titleHeight - 40, duration: timeDelay }],
  }).add({
    targets: `#disk${diskToMove}`,
    translateX: [{ value: transX, duration: timeDelay }],
  }).add({
    targets: `#disk${diskToMove}`,
    translateY: [{ value: titleHeight + 0.5 * height - (lenDst) * diskHeight, duration: timeDelay }],
  })
}
function intialize(n) {
  doc = document.getElementsByClassName("disk__container")[0];
  dec = (dstBtwTower - towerWidth) / n
  lft = 0.25 * (width - towerWidth * 3)
  for (let i = 0; i < n; ++i) {
    anime({
      targets: `#disk${n - i}`,
      translateX: [{ value: lft - ((dstBtwTower - dec * i) - towerWidth) / 2 }],
      translateY: [{ value: titleHeight + height * 0.5 - diskHeight * (i + 1) }],
      duration: 0,
    })
  }
  towerOfHanoi(n, "A", "C", "B");
  animation.add({
    complete: () => { document.getElementById("range").disabled = false; }
  })
  animation.play();
  // document.getElementById("range").disabled=false;
}
function reset() {
  doc = document.getElementsByClassName("disk__container")[0];
  doc.innerHTML = "";
  towers = { "A": [], "B": [], "C": [] }
  timeDelay = (100 - document.getElementById("range").value) * 10;
  document.getElementById("range").disabled = false;
  console.log(timeDelay);
  animation = anime.timeline({
    duration: timeDelay,
    easing: 'easeInOutSine',
    autoplay: false,
  });
}
function createDisks() {
  n = document.getElementById("hanoi_n").value;
  if (n < 2 || n > Math.min((0.5 * height) / diskHeight, 8)) {
    alert("Enter number between 2 and 8")
    return;
  }
  dec = (dstBtwTower - towerWidth) / n
  doc = document.getElementsByClassName("disk__container")[0];
  reset();
  document.getElementById("range").disabled = true;
  for (let i = 0; i < n; ++i) {
    towers.A.push(n - i)
    doc.innerHTML += `<div style="background-color:${diskColors[i % diskColors.length]}; width:${dstBtwTower - dec * i}px;" id="disk${n - i}" class="disk"></div>`;
  }
  console.log(towers, Math.abs("C".codePointAt(0) - "A".codePointAt(0)));
  intialize(n)
}
function start() {
  createDisks();
}
document.getElementById("inp_btn").onclick = start;
document.getElementById("rst_btn").onclick = reset;
