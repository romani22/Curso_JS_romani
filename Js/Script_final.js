//botones por id
let btnNew = document.getElementById("btnNew");
let btnEditWork = document.getElementById("btnEditWork");
let btnNewItems = document.getElementById("btnNewItems");
let btnSearch = document.getElementById("btnSearch");
let btnCreateNewwork = document.getElementById("createNewWork");
let btnDeleteNewWork = document.getElementById("deleteNewWork");
let btnCleanNewWork = document.getElementById("btnCleanNewWork");
let btnSaveNewWork = document.getElementById("btnSaveNewWork");
let btnAddItem = document.getElementById("addItem");


//Elementos de view por id
let dicBtnsPrimary = document.getElementById("dicBtnsPrimary");
let idNewWork = document.getElementById("idNewWork");
let tableWork = document.getElementById("tableWork");
let createItems = document.getElementById("createItems");
let createPresup = document.getElementById("createPresup");
let rubroPresupuesto = document.getElementById("rubroPresupuesto");

let arraySelect = [];
let workStorage = new Array();
let cantStoragePresupuestos = localStorage.getItem("Presup");
let cantNewWork = 0;
let cantItems = 0;
let cantRubros = 0;
let btnsPresupuesto = new Array();

btnCleanNewWork.onclick = () => {
    limpiarOcultarWorks();
}
btnSaveNewWork.onclick = () => {
    saveWork();
}
btnNew.onclick = () => {
    rubroPresupuesto.addEventListener('change', () => {
        completarSelect();
    });
    completarSelect();
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

function completarSelect() {
    let rubro = document.getElementById("rubroPresupuesto").value;
    let select = document.getElementById("namesWork");
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    let options = "";
    workStorage.forEach(element => {
        options += `<option value="${element.id}">${element.name}</option>`;
    });
    select.innerHTML = options;
    valorSelect(rubro, workStorage[0].id);
    select.addEventListener('change', () => {
        var selectedOption = select.options[select.selectedIndex];
        valorSelect(rubro, selectedOption.value);
    });
}

function valorSelect(rubro, selected) {
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    Valor = workStorage.filter((item) => item.id == selected)
    document.getElementById("valueUni").value = Valor[0].valorUni;
}

btnAddItem.onclick = () => {
    addNewItemPres();
}
function addNewItemPres() {
    let itemsPresupuesto = document.getElementById("id_item");
    let valorUniNew = document.getElementById("valueUni").value;
    let select = document.getElementById("namesWork");
    let opcionSeleccionada = select.options[select.selectedIndex];
    let valorSelectNew = opcionSeleccionada.value;
    let textSelectNew = opcionSeleccionada.text;
    let valorCantNew = document.getElementById("CantWork").value;
    let valTotal = valorCantNew * valorUniNew;
    let item = `<div class="d-flex" id="item_${cantItems}">
                    <div class="col-1">
                        <button class="btn btn-sm btn-danger" id="deleteItem_${cantItems}"><i class="fa fa-minus text-light" aria-hidden="true"></i></button>
                    </div>
                    <div class="col">
                        <input type="hidden" disabled class="form-control" value="${valorSelectNew}" id="select_${cantItems}">
                        <input type="text" disabled class="form-control" value="${textSelectNew}" id="select_${cantItems}">
                    </div>
                    <div class="col">
                        <input type="text" disabled class="form-control" value="$ ${valorUniNew}" id="valueUni_${cantItems}">
                    </div>
                    <div class="col">
                        <input type="text" disabled value="$ ${valorCantNew}" class="form-control" id="CantWork_${cantItems}">
                    </div>
                    <div class="col">
                        <input type="text" disabled value="$ ${valTotal}" class="form-control" id="CantWork_${cantItems}">
                    </div>
                </div>`;
    itemsPresupuesto.innerHTML += item;
    let newBoton = document.getElementById("deleteItem_" + cantItems);
    btnsPresupuesto.push(newBoton);
    activarBotones()
    cantItems++;
}

function activarBotones() {
    btnsPresupuesto.forEach(element => {
        let boton = document.getElementById(element.id);
        boton?.addEventListener('click', () => {
            let id = boton.id;
            elem = id.split("_")
            document.getElementById("item_" + elem[1]).remove();

        });
    });

}