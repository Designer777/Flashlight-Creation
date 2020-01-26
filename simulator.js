peltier = {
  leftx: 200,
  topy: 200,
  width: 50,
  additionalLength: 100,
}

hotPeltier = {
  r: 255,
  g: 255,
  b: 255,
}

coldPeltier = {
  r: 255,
  g: 255,
  b: 255,
}

battery = {
  leftx: 100,
  topy: 300,
  width: 50,
}

voltmeter = {
  leftx: 600,
  bottomy: 400,
  width: 50,
  length:100,
  topy: 150,
  totalLength: 350, //500 - 150 = 350 OR bottomy + totalLength - topy

}

current = 1.0;
voltage = 0.0;
maxVoltage = 5.0;
mouseOnVM = false;
a = -72;
b = -15;
theta_1 = null;
theta_2 = null;

function calculateTemperatureDifference() {
  theta_1 = (-b + (b^2 - 4*a*voltage)^0.5)/(2*a)
  theta_2 = (-b - (b^2 - 4*a*voltage)^0.5)/(2*a)
  if (theta_1 < 0) {
    theta_1 = 0;
  }
  temperatureDifferenceDisplay.elt.innerText = 'Temperature Difference: '+theta_1;
}

function draw () {
  background(255,255,255);
  fill(hotPeltier.r, hotPeltier.g, hotPeltier.b)
  drawPeltiers();
  fill(coldPeltier.r, coldPeltier.g, coldPeltier.b)
  drawPeltiers2();
  fill(255, 255, 255)
  drawCircuit();
  drawCircuit2();
  drawVoltmeter();
  checkVMChange();
  calculateTemperatureDifference();
}

function checkVMChange(){
  if (mouseX <= voltmeter.leftx + voltmeter.width && mouseX >= voltmeter.leftx && mouseY >= voltmeter.bottomy && mouseY <= voltmeter.bottomy + voltmeter.length && mouseIsPressed){
    mouseOnVM = true;
  }
  else{
    mouseOnVM = false;
  }
}

function mouseDragged(event) {
     if (mouseOnVM){
       if (event.movementY < 0 && voltmeter.bottomy > voltmeter.topy){
         voltmeter.bottomy += event.movementY;
         if (event.movementY > 100 && event.movementY <= 200) {
         }
       }
       else if (event.movementY > 0 && voltmeter.bottomy + voltmeter.length < voltmeter.totalLength + voltmeter.topy) {
         voltmeter.bottomy += event.movementY;
       }
       voltage = 5*(400-voltmeter.bottomy)/250;
       hotPeltier.r = 255;
       hotPeltier.g = 255*(voltmeter.bottomy-150)/250;
       hotPeltier.b = 255*(voltmeter.bottomy - 150)/250;

       coldPeltier.r = 255*(voltmeter.bottomy - 150)/250;
       coldPeltier.g = 255*(voltmeter.bottomy - 150)/250;
       coldPeltier.b = 255;
       voltageDisplay.elt.innerText = voltage + ' Volts'
    }
}

function mousePressed(){

}

function drawVoltmeter () {
  line (voltmeter.leftx + 0.5*voltmeter.width, voltmeter.topy + voltmeter.totalLength, voltmeter.leftx + 0.5*voltmeter.width, voltmeter.topy);
  rect (voltmeter.leftx, voltmeter.bottomy,voltmeter.width, voltmeter.length);
}

function drawCircuit () {
  rect (battery.leftx, battery.topy, battery.width, battery.width );
  line (battery.leftx + 0.5*battery.width, battery.topy, peltier.leftx, peltier.topy + 0.5*peltier.width);
  line (peltier.leftx + peltier.width, peltier.topy + 0.5*peltier.width, peltier.leftx + peltier.additionalLength, peltier.topy + 0.5*peltier.width);
  line (peltier.leftx + peltier.width + peltier.additionalLength, peltier.topy + 0.5*peltier.width, peltier.leftx + peltier.additionalLength*2, peltier.topy + 0.5*peltier.width);
  line (peltier.leftx + peltier.additionalLength*2 + 0.5*peltier.width , peltier.topy + peltier.width, peltier.leftx + 0.5*peltier.width,peltier.topy + peltier.additionalLength);
  line (peltier.leftx + peltier.width,peltier.topy + peltier.additionalLength + 0.5*peltier.width,peltier.leftx + peltier.additionalLength, peltier.topy + peltier.additionalLength + 0.5*peltier.width);
  line (peltier.leftx + peltier.width + peltier.additionalLength,peltier.topy + peltier.additionalLength + 0.5*peltier.width,peltier.leftx + peltier.additionalLength + peltier.additionalLength, peltier.topy + peltier.additionalLength + 0.5*peltier.width);
  line (peltier.leftx + 2*peltier.additionalLength + 0.5*peltier.width, peltier.topy + peltier.additionalLength + peltier.width, peltier.leftx + 2*peltier.additionalLength + 0.5*peltier.width,peltier.topy + peltier.additionalLength*2);
  line (peltier.leftx + 2*peltier.additionalLength, peltier.topy + 2*peltier.additionalLength + 0.5*peltier.width, peltier.leftx + peltier.additionalLength + peltier.width,  peltier.topy + 2*peltier.additionalLength + 0.5*peltier.width);
  line (peltier.leftx + peltier.additionalLength, peltier.topy + 2*peltier.additionalLength + 0.5*peltier.width, peltier.leftx + peltier.width,  peltier.topy + 2*peltier.additionalLength + 0.5*peltier.width);
  line (peltier.leftx, peltier.topy + 2*peltier.additionalLength + 0.5*peltier.width, battery.leftx + 0.5*battery.width, battery.topy + battery.width);
}

function drawPeltiers () {
  rect (peltier.leftx,peltier.topy,peltier.width,peltier.width);
  rect (peltier.leftx + peltier.additionalLength, peltier.topy, peltier.width, peltier.width);
  rect (peltier.leftx + peltier.additionalLength*2, peltier.topy, peltier.width, peltier.width);
  rect (peltier.leftx,peltier.topy + peltier.additionalLength,peltier.width,peltier.width);
  rect (peltier.leftx + peltier.additionalLength, peltier.topy + peltier.additionalLength, peltier.width, peltier.width);
  rect (peltier.leftx + peltier.additionalLength*2, peltier.topy + peltier.additionalLength, peltier.width, peltier.width);
  rect (peltier.leftx,peltier.topy + peltier.additionalLength*2,peltier.width,peltier.width);
  rect (peltier.leftx + peltier.additionalLength, peltier.topy + peltier.additionalLength*2, peltier.width, peltier.width);
  rect (peltier.leftx + peltier.additionalLength*2, peltier.topy + peltier.additionalLength*2, peltier.width, peltier.width);
}

function drawPeltiers2() {
  rect (peltier.leftx + 800,peltier.topy,peltier.width,peltier.width);
  rect (peltier.leftx + peltier.additionalLength + 800, peltier.topy, peltier.width, peltier.width);
  rect (peltier.leftx + peltier.additionalLength*2 + 800, peltier.topy, peltier.width, peltier.width);
  rect (peltier.leftx + 800,peltier.topy + peltier.additionalLength,peltier.width,peltier.width);
  rect (peltier.leftx + peltier.additionalLength + 800, peltier.topy + peltier.additionalLength, peltier.width, peltier.width);
  rect (peltier.leftx + peltier.additionalLength*2 + 800, peltier.topy + peltier.additionalLength, peltier.width, peltier.width);
  rect (peltier.leftx + 800,peltier.topy + peltier.additionalLength*2,peltier.width,peltier.width);
  rect (peltier.leftx + peltier.additionalLength + 800, peltier.topy + peltier.additionalLength*2, peltier.width, peltier.width);
  rect (peltier.leftx + peltier.additionalLength*2 + 800, peltier.topy + peltier.additionalLength*2, peltier.width, peltier.width);
}

function drawCircuit2 () {
  rect (battery.leftx + 800 + peltier.additionalLength*2 + battery.leftx*2, battery.topy, battery.width, battery.width );
  line (battery.leftx + 2.5*battery.width + 800, battery.topy - peltier.width, peltier.leftx + 800 + 4.5*peltier.width, peltier.topy + 2*peltier.width);
  line (peltier.leftx + peltier.width + 800, peltier.topy + 0.5*peltier.width, peltier.leftx + peltier.additionalLength + 800, peltier.topy + 0.5*peltier.width);
  line (peltier.leftx + peltier.width + peltier.additionalLength + 800, peltier.topy + 0.5*peltier.width, peltier.leftx + peltier.additionalLength*2 + 800, peltier.topy + 0.5*peltier.width);
  line (peltier.leftx + peltier.additionalLength*2 + peltier.width + 800 , peltier.topy + 0.5*peltier.width, peltier.leftx + 6.5*peltier.width + 800,peltier.topy + peltier.additionalLength);
  line (peltier.leftx + peltier.width + 800,peltier.topy + peltier.additionalLength + 0.5*peltier.width,peltier.leftx + peltier.additionalLength + 800, peltier.topy + peltier.additionalLength + 0.5*peltier.width);
  line (peltier.leftx + peltier.width + peltier.additionalLength + 800,peltier.topy + peltier.additionalLength + 0.5*peltier.width,peltier.leftx + peltier.additionalLength + peltier.additionalLength + 800, peltier.topy + peltier.additionalLength + 0.5*peltier.width);
  line (peltier.leftx + 2*peltier.additionalLength -3.5*peltier.width + 800, peltier.topy + peltier.additionalLength + peltier.width, peltier.leftx + 2*peltier.additionalLength -3.5*peltier.width + 800,peltier.topy + peltier.additionalLength*2);
  line (peltier.leftx + 2*peltier.additionalLength + 800, peltier.topy + 2*peltier.additionalLength + 0.5*peltier.width, peltier.leftx + peltier.additionalLength + peltier.width + 800,  peltier.topy + 2*peltier.additionalLength + 0.5*peltier.width);
  line (peltier.leftx + peltier.additionalLength + 800, peltier.topy + 2*peltier.additionalLength + 0.5*peltier.width, peltier.leftx + peltier.width + 800, peltier.topy + 2*peltier.additionalLength + 0.5*peltier.width);
  line (peltier.leftx + 800 + 5*peltier.width, peltier.topy + 2*peltier.additionalLength + 0.5*peltier.width, battery.leftx + 8.5*battery.width + 800, battery.topy + battery.width);
}

function setup () {
  createCanvas(window.innerWidth, window.innerHeight);
  welcomeText = createElement ('h1', 'Thermoelectric Generator (Seebeck Effect)');
  welcomeText.position (100,20);
  voltMeterText = createElement ('h2', 'Voltmeter');
  voltMeterText.position (580, 100);
  batteryPlusSignText = createElement ('h2', '+');
  batteryPlusSignText.position (127,290);
  batteryMinusSignText = createElement ('h2', '-');
  batteryMinusSignText.position (130,312);
  batteryPlusSignText2 = createElement ('h2', '+');
  batteryPlusSignText2.position (1327,290);
  batteryMinusSignText2 = createElement ('h2', '-');
  batteryMinusSignText2.position (1327,312);
  voltageDisplay = createElement ('h3',voltage + ' Volts');
  voltageDisplay.position (450,500);
  temperatureDifferenceDisplay = createElement ('h3', 'Temperature Difference: 0');
  temperatureDifferenceDisplay.position (450,550);
}
