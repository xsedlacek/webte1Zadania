var source
function start() {
    let x, y1, y2;
    if (typeof (EventSource) !== "undefined") {
        source = new EventSource("https://iolab.sk/evaluation/sse/sse.php");
        var config = {responsive: true};
        var layout = { 

            title: 'Graf zašumeného sínusu a kosínusu',
          
            font: {size: 18}
          
          };
        Plotly.newPlot('graf', [{ y: [0] }, { y: [1] }],layout,config);
        source.onmessage = function (event) {
            let inData = JSON.parse(event.data);
            let num = document.getElementById('num').value;
            x = inData.x;
            y1 = inData.y1;
            y2 = inData.y2;

            console.log(x, y1, y2);

            Plotly.extendTraces('graf', { y: [[y1*num], [y2*num]] }, [0, 1]);
        }
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
    }
}

function hideTrace() {
    var checkbox1 = document.getElementById('sin');
    var checkbox2 = document.getElementById('cos');
    var update;
    if (checkbox1.checked) {
        update = {

            opacity: 0,

        };

        Plotly.restyle('graf', update, 0);
    } else {
        update = {

            opacity: 1,

        };
        Plotly.restyle('graf', update, 0);
    }
    if (checkbox2.checked) {
        update = {

            opacity: 0,


        };

        Plotly.restyle('graf', update, 1);
    } else {
        update = {

            opacity: 1,

        };
        Plotly.restyle('graf', update, 1);
    }
}

function stop() {
    source.close();

}

class sliderText extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <div onchange = "show()" class="border border-info" id = "ramik">
        <p><b>Zmena amplitúdy</b></p>
        <input type="radio" id="slider" name="choice">
        <label for="slider">Posuvník</label>
        <input type="radio" id="number" name="choice">
        <label for="number">Čiselne pole</label> <br>
        <input type="range" id="amp" name="amp" min="1" max="15" style = "display:none" value = "1">
        <input type="number" id="num" name="num" min="1" max="15" style = "display:none" value = "1">
    </div>`;
    var range = document.getElementById('amp');
    var field = document.getElementById('num');

    range.addEventListener('input', function (e) {
        field.value = e.target.value;
    });
    field.addEventListener('input', function (e) {
        range.value = e.target.value;
    });
    }
    
}
function show(){
    var radio1 = document.getElementById("slider");
    var radio2 = document.getElementById("number");
  
    if(radio1.checked){
      document.getElementById("amp").style.display = "block";
    }
    else{
      document.getElementById("amp").style.display = "none";
    }
  
    if(radio2.checked){
      document.getElementById("num").style.display = "block";
    }
    else{
      document.getElementById("num").style.display = "none";
    }
  }
customElements.define('slider-text', sliderText);
