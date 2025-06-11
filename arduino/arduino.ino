void setup() {
  Serial.begin(9600);
}

bool sending = false;
void loop() {
  if (Serial.available()) {
    char a = Serial.read();
    if (a == 'w') sending = !sending;
  }

  if (sending) {
    Serial.write("asdf");
  }
}
