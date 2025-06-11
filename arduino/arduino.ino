void setup() {
  Serial.begin(31250);
}

bool sending = false;
void loop() {
  if (Serial.available()) {
    Serial.write(Serial.read());
  }
}
