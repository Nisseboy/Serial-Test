

let rx = document.getElementById("rx");
let tx = document.getElementById("tx");
let connectBtn = document.getElementById("connectBtn");

let l = console.log;
let f  = (...args) => {
  for (let arg of args) {
    if (arg.reason) rx.value += arg.reason + ", ";
    else rx.value += JSON.stringify(arg) + ", ";
  }
  rx.value +=  + "\n";
}
console.log = f;
console.warn = f;
console.error = f;
window.onerror = f;
window.onunhandledrejection = f;

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