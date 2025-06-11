

let rx = document.getElementById("rx");
let tx = document.getElementById("tx");
let connectBtn = document.getElementById("connectBtn");

connectBtn.addEventListener("click", async () => {
  ser.connect({ baudRate: 31250 });
});

tx.addEventListener("change", async () => {
  let v = tx.value;
  tx.value = "";
  
  ser.send(v + "\n");
});

ser.on = (data) => {
  rx.value += data;
}