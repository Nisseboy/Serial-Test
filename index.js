

let rx = document.getElementById("rx");
let tx = document.getElementById("tx");
let connectBtn = document.getElementById("connectBtn");


let f  = (arg) => {
  rx.value += JSON.stringify(arg);
}
console.log = f;
console.warn = f;
console.error = f;

connectBtn.addEventListener("click", async () => {
  ser.connect({ baudRate: 9600 });
});

tx.addEventListener("change", async () => {
  let v = tx.value;
  tx.value = "";
  
  ser.send(v + "\n");
});

ser.on = (data) => {
  rx.value += data;
}