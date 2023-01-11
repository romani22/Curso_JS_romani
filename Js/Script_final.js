//botones por id
let btnNew = document.getElementById("btnNew");
let btnEditWork = document.getElementById("btnEditWork");
let btnNewItems = document.getElementById("btnNewItems");
let btnSearch = document.getElementById("btnSearch");
let btnCreateNewwork = document.getElementById("createNewWork");
let btnDeleteNewWork = document.getElementById("deleteNewWork");
let btnCleanNewWork = document.getElementById("btnCleanNewWork");
let btnSaveNewWork = document.getElementById("btnSaveNewWork");
let btnAddItem = document.getElementById("addItem_0");
let btnAddRubro = document.getElementById("addRubro");


//Elementos de view por id
let dicBtnsPrimary = document.getElementById("dicBtnsPrimary");
let idNewWork = document.getElementById("idNewWork");
let tableWork = document.getElementById("tableWork");
let createItems = document.getElementById("createItems");
let createPresup = document.getElementById("createPresup");

let arraySelect = [];
let workStorage = new Array();
let cantStoragePresupuestos = localStorage.getItem("Presup");
let cantNewWork = 0;
let cantItems = 0;
let cantRubros = 0;
btnCleanNewWork.onclick = () => {
    limpiarOcultarWorks();
}
btnSaveNewWork.onclick = () => {
    saveWork();
}
btnNew.onclick = () => {
    rubroPresupuesto = document.getElementById("rubroPresupuesto_0");
    rubroPresupuesto.addEventListener('change', () => {
        cambiarSelectPresupuesto(0);
    });
    completarSelect(0, 0);
    mostrarView("createPresup");

}
btnEditWork.onclick = () => {
    mostrarView("tableWork");
    completarTable();
}
btnNewItems.onclick = () => {
    mostrarView("createItems");
}
function mostrarView(name) {
    limpiarOcultarWorks();
    tableWork.classList.add("descartar");
    createItems.classList.add("descartar");
    createPresup.classList.add("descartar");
    document.getElementById(name).classList.remove("descartar");
}
function limpiarOcultarWorks() {
    for (let i = cantNewWork; i > 0; i--) {
        DeleteNewWork();
    }
    document.getElementById("nameWork_0").value = "";
    document.getElementById("valueUni_0").value = "";
    document.getElementById("createItems").classList.add("descartar");
}
function DeleteNewWork() {
    document.getElementById("id_work_" + cantNewWork).remove()
    cantNewWork--;
    if (cantNewWork == 0) {
        btnDeleteNewWork.classList.add("descartar");
    }
}
function addNewWork() {
    cantNewWork++;
    if (cantNewWork == 1) {
        btnDeleteNewWork.classList.remove("descartar");
    }
    let item = `<div class="col-8 row" id="id_work_${cantNewWork}">
                    <div class="col-6 mt-3">
                        <input type="text" placeholder="Nombre del trabajo a realizar" class="form-control" id="nameWork_${cantNewWork}">
                    </div>
                    <div class="col-6 mt-3">
                        <input type="number" placeholder="Valor por unidad del trabajo" class="form-control" id="valueUni_${cantNewWork}">
                    </div>
                </div>`;
    idNewWork.innerHTML += item;
}
btnCreateNewwork.onclick = () => {
    addNewWork();
}
btnDeleteNewWork.onclick = () => {
    DeleteNewWork();
}
function saveWork() {
    let rubro = document.getElementById("rubrosNewWork").value;
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    let id = workStorage?.length || 0;
    for (let i = 0; i <= cantNewWork; i++) {
        let nameNewWork = document.getElementById("nameWork_" + i).value;
        let valorNewWork = document.getElementById("valueUni_" + i).value;
        workStorage[id] = { "id": id, "name": nameNewWork, "valorUni": valorNewWork };
        id++;
        newWorkJSON = JSON.stringify(workStorage);
        localStorage.setItem(rubro, newWorkJSON);
    }
    limpiarOcultarWorks();

}
function completarTable() {
    let rubro = document.getElementById("rubrosTableWork").value;
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    let tbodyWorks = document.getElementById("tbodyWorks");
    let bodyTable = "";
    let boton = new Array();
    workStorage.forEach(element => {
        bodyTable += `<tr>
                        <td>${element.name}</td>
                        <td>${element.valorUni}</td>
                        <td><button class="btn bt-sm btn-danger" id="${rubro}_${element.id}"><i class="fa fa-times"></i></button></td>
                    </tr>`;
        boton.push(rubro + "_" + element.id);

    });

    tbodyWorks.innerHTML = bodyTable;
    boton.forEach(element => {
        boton = document.getElementById(element);
        boton.addEventListener("click", function () { deleteStorage(element) }, false);
    });
}

function deleteStorage(elem) {
    elem = elem.split("_")
    rubro = elem[0];
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    work_Id = elem[1];
    if (confirm("¿desea eliminar este trabajo?")) {
        workStorage = workStorage.filter((item) => item.id != work_Id)
        newWorkJSON = JSON.stringify(workStorage);
        localStorage.setItem(rubro, newWorkJSON);
        completarTable();
    }
}

function completarSelect(id_item, id_items) {
    let rubro = document.getElementById("rubroPresupuesto_" + id_item).value;
    let select = document.getElementById("namesWork_" + id_item + "_" + id_items);
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    let options = "";
    workStorage.forEach(element => {
        options += `<option value="${element.id}">${element.name}</option>`;
    });
    select.innerHTML += options;
    arraySelect.push(select);
    activarSelect();
}
function activarSelect() {
    arraySelect.forEach(element => {
        let select = document.getElementById(element.id);
        select.addEventListener('change', () => {
            var selectedOption = select.options[select.selectedIndex];
            valorSelect(select.id, selectedOption.value);
        });
    });

}
function valorSelect(idSelect, idValue) {
    let datosSelect = idSelect.split("_");
    let rubro = document.getElementById("rubroPresupuesto_" + datosSelect[1]).value;
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    Valor = workStorage.filter((item) => item.id == idValue)
    document.getElementById("valueUni_" + datosSelect[1] + "_" + datosSelect[2]).value = Valor[0].valorUni;
}

function addItemPresupuesto(id) {
    let cantItems = document.getElementById("cantItems_" + id).value;
    cantItems++;
    document.getElementById("cantItems_" + id).value = cantItems;

    let itemsPresupuesto = document.getElementById("id_item_0");
    let item = `<div class="row mt-3" id="divitems_${cantItems}">
                    <div class="col-4">
                        <select name="namesWork_${id}_${cantItems}" class="form-control" id="namesWork_${id}_${cantItems}"></select>
                    </div>
                    <div class="col-4">
                        <input type="number" disabled class="form-control" value="0" id="valueUni_${id}_${cantItems}">
                    </div>
                    <div class="col-4">
                        <input type="number" placeholder="Cantidad de trabajo a realizar" class="form-control" id="CantWork_${id}_${cantItems}">
                    </div>
                </div>`;
    console.log(itemsPresupuesto);
    itemsPresupuesto.innerHTML += item;
    completarSelect(id, cantItems);
}

btnAddItem.onclick = () => {
    datosbtn = btnAddItem.id.split("_");
    addItemPresupuesto(datosbtn[1]);
}

function cambiarSelectPresupuesto(id) {

    let cantItems = document.getElementById("cantItems_" + id).value;
    document.getElementById("cantItems_" + id).value = 0;
    for (let i = 1; i <= cantItems; i++) {
        document.getElementById("divitems_" + i).remove();
    }
    // namesWork_
}