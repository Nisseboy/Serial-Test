let rx = document.getElementById("rx");
let tx = document.getElementById("tx");
let connectBtn = document.getElementById("connectBtn");

let s = navigator.serial;

if (!("serial" in navigator)) {
  s = serial;
}

let port;
let canceled = false;

s.onconnect =  (e) => {
  port = e.target;
};

connectBtn.addEventListener("click", async () => {
  const p = await s.requestPort();
  await p.open({ baudRate: 9600 });
  console.log("Serial port opened:", p);

  port = p;

  canceled = false;
  tryRead();

  p.ondisconnect = () => {
    port = undefined;
    canceled = true;
  };
});

tx.addEventListener("change", async () => {
  let v = tx.value;
  tx.value = "";

  const textEncoder = new TextEncoderStream();
  const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
  const writer = textEncoder.writable.getWriter();

  await writer.write(v);

  writer.releaseLock();
});


async function tryRead() {
  while (port.readable) {
    if (canceled) return;

    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          console.log("Reader cancelled");
          
          break;
        }
        rx.value += value;
      }
    } catch (error) {
      
    } finally {
      reader.releaseLock();
    }
  }
}