var modal = document.getElementById("myModal");
function generateTable() {
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;
    modal.style.display = "block";

    const body = document.getElementById("tabulka");
    var tbl = document.createElement('table');
    tbl.id = "table";
    tbl.style.width = '50%';
    tbl.style.border = '1px solid black';

    for (let i = 0; i <= y; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j <= x; j++) {
            const td = tr.insertCell();
            if (i == 0 && j != 0) {
                td.appendChild(document.createTextNode("X="+j));
            }
            else if (j == 0 && i != 0) {
                td.appendChild(document.createTextNode("Y="+i));
            } else if (i !=0 || j != 0){
                td.appendChild(document.createTextNode(i * j));
            }
            if (j == 0 && i == 0) {
                td.appendChild(document.createTextNode(""));
            }

            td.style.border = '1px solid black';

        }
    }
    body.appendChild(tbl);

}
function inputCheck() {
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;

    if (document.getElementById("table") != null) {
        deleteTable();
    }
    if (x > 0 && x <= 9 && y > 0 && y <= 9) {
        document.getElementById("alert").style.display = "none";
        generateTable();
    } else {
        document.getElementById("alert").style.display = "block";

    }

}
function deleteTable() {

    document.getElementById("table").remove();
}
function closeModal(){
    modal.style.display = "none";
}