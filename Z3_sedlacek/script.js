

var sel1 = document.querySelector('#sel1');
var sel2 = document.querySelector('#sel2');
var options2 = sel2.querySelectorAll('option');

function giveSelection(selValue) {
  sel2.innerHTML = '';
  for (var i = 0; i < options2.length; i++) {
    if (options2[i].dataset.option === selValue) {
      sel2.appendChild(options2[i]);
    }
  }
}

var sel3 = document.querySelector('#sel3');
var options3 = sel3.querySelectorAll('option');

function giveSelection2(selValue) {
  sel3.innerHTML = '';
  for (var i = 0; i < options3.length; i++) {
    if (options3[i].dataset.option === selValue) {
      sel3.appendChild(options3[i]);
    }
  }
}

giveSelection(sel1.value);
giveSelection2(sel2.value);

function otherChoice() {
  var checkBox = document.getElementById("ine");
  var text = document.getElementById("txt1");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}
function show(){
  var radio1 = document.getElementById("option1");
  var radio2 = document.getElementById("option2");

  if(radio1.checked){
    document.getElementById("prepinac2").style.display = "block";
  }
  else{
    document.getElementById("prepinac2").style.display = "none";
  }

  if(radio2.checked){
    document.getElementById("prepinac3").style.display = "block";
  }
  else{
    document.getElementById("prepinac3").style.display = "none";
  }
}
function porovnaj() {   
  var datum= document.getElementById('date').value;
  var datum2 = datum.split('-');
  var datum3 = new this.Date(datum2[0], datum2[1]-1, datum2[2]);
  var rok = datum3.getFullYear();
  var vek = document.getElementById('vek');
  if(rok!=(2021-vek.value)){
    alert("Zadany rok narodenia sa nezhoduje !! ");
  }
}

