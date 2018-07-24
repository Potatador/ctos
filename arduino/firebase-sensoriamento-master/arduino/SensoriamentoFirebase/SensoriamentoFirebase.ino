

#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <Ticker.h>

// Set these to run example.
#define FIREBASE_HOST "https://ctos-bee27.firebaseio.com/"
#define FIREBASE_AUTH "M17EUG8AFbZGiidKPfvzAZbD4yPQw3I3g1HyaOWP"
#define WIFI_SSID "Naka"
#define WIFI_PASSWORD "124567890"

#define PUBLISH_INTERVAL 1000*60*5

Ticker ticker;
bool publishNewState = true;
bool teste = true;

void publish(){
  publishNewState = true;
}

void setupPins(){ 
}

void setupWifi(){
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
}

void setupFirebase(){
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.setBool("teste", !teste);
}

void setup() {
  Serial.begin(9600);

  setupPins();
  setupWifi();    

  setupFirebase();

  // Registra o ticker para publicar de tempos em tempos
  ticker.attach_ms(PUBLISH_INTERVAL, publish);
}

void loop() {

  // Apenas publique quando passar o tempo determinado
  if(publishNewState){
    Serial.println("Publish new State");
    if(!isnan(humidity) && !isnan(temperature)){ 
      publishNewState = false;
      Firebase.setBool("teste", teste);
      teste = !teste; 
    }else{
      Serial.println("Error Publishing");
    }
  }
}
