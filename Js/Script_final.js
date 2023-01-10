//botones por id
let btnNew = document.getElementById("btnNew");
let btnNewItems = document.getElementById("btnNewItems");
let btnSearch = document.getElementById("btnSearch");
let btnCreateNewItem = document.getElementById("createNewItem");
let btnAddItem = document.getElementById("addItem");
let btnAddRubro = document.getElementById("addRubro");


//Elementos de view por id
let itemsPresupuesto = document.getElementById("id_item");
let idNewWork = document.getElementById("idNewWork");


let cantNewWork = 0;
let cantItems = 0;
let cantRubros = 0;


btnNew.onclick = () => {
    document.getElementById("createPresup").classList.remove("descartar");
    ocultarBotones();
}

btnNewItems.onclick = () => {
    document.getElementById("createItems").classList.remove("descartar");
    ocultarBotones();
}

function ocultarBotones() {
    btnNew.classList.add("descartar");
    btnSearch.classList.add("descartar");
    btnNewItems.classList.add("descartar");
}
function mostrarBotones() {
    btnNew.classList.add("descartar");
    btnSearch.classList.add("descartar");
    btnNewItems.classList.add("descartar");
}
btnCreateNewItem.onclick = () => {
    cantNewWork++;
    let item = `<div class="col-8 row">
                    <div class="col-6 mt-3">
                        <input type="text" placeholder="Nombre del trabajo a realizar" class="form-control" id="nameWork_${cantItems}">
                    </div>
                    <div class="col-6 mt-3">
                        <input type="number" placeholder="Valor por unidad del trabajo" class="form-control" id="valueUni_${cantNewWork}">
                    </div>
                </div>`;
    idNewWork.innerHTML += item;
}
btnAddItem.onclick = () => {
    cantItems++;
    let item = `<div class="col-4 mt-3">
                    <input type="text" placeholder="Trabajo a realizar" class="form-control" id="nameWork_${cantItems}">
                </div>
                <div class="col-4 mt-3">
                    <input type="number" placeholder="Valor por unidad" class="form-control" id="valueUni_${cantItems}">
                </div>
                <div class="col-4 mt-3">
                    <input type="number" placeholder="Cantidad de trabajo a realizar" class="form-control" id="CantWork_${cantItems}">
                </div>`;
    itemsPresupuesto.innerHTML += item;
}
btnAddRubro.onclick = () => {
    cantRubros++;
    let item = `<div class="col-4 mt-3">
                    <input type="text" placeholder="Trabajo a realizar" class="form-control" id="nameWork_${cantRubros}">
                </div>
                <div class="col-4 mt-3">
                    <input type="number" placeholder="Valor por unidad" class="form-control" id="valueUni_${cantRubros}">
                </div>
                <div class="col-4 mt-3">
                    <input type="number" placeholder="Cantidad de trabajo a realizar" class="form-control" id="CantWork_${cantRubros}">
                </div>`;
    itemsPresupuesto.innerHTML += item;
}