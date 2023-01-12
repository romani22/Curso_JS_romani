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
let btnCancelarPresup = document.getElementById("btnCancelarPresup");
let btnSavePresup = document.getElementById("btnSavePresup");
let btnsPresupuesto = new Array();


//Elementos de view por id
let idNewWork = document.getElementById("idNewWork");
let tableWork = document.getElementById("tableWork");
let viewPres = document.getElementById("viewPres");
let viewPresXId = document.getElementById("viewPresXId");
let selectRubroTable = document.getElementById("rubrosTableWork");
let createItems = document.getElementById("createItems");
let createPresup = document.getElementById("createPresup");
let rubroPresupuesto = document.getElementById("rubroPresupuesto");

//Array para Storage
let workStorage = new Array();
let Presupuesto = new Array();

//variables de cantidad
let cantNewWork = 0;
let cantItems = 0;

btnCleanNewWork.onclick = () => {
    limpiarOcultarWorks();
}
btnSaveNewWork.onclick = () => {
    saveWork();
}
btnNew.onclick = () => {
    let rubro = document.getElementById("rubroPresupuesto").value;
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    if (workStorage.length > 0) {
        rubroPresupuesto.addEventListener('change', () => {
            completarSelect();
        });
        completarSelect();
        mostrarView("createPresup");
    } else {
        Swal.fire({
            title: 'Atencion!',
            html: 'no existe Trabajo creado.',
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        return false;
    }
}
btnEditWork.onclick = () => {
    let rubro = document.getElementById("rubroPresupuesto").value;
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    if (workStorage.length > 0) {
        mostrarView("tableWork");
        completarTable();
    } else {
        Swal.fire({
            title: 'Atencion!',
            html: 'no existe Trabajo creado.',
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        return false;
    }
}
btnNewItems.onclick = () => {
    mostrarView("createItems");
}
btnCreateNewwork.onclick = () => {
    addNewWork();
}
btnDeleteNewWork.onclick = () => {
    DeleteNewWork();
}
btnAddItem.onclick = () => {
    addNewItemPres();
}
btnSavePresup.onclick = () => {
    savePresup()
}
btnSearch.onclick = () => {
    Presupuesto = JSON.parse(localStorage.getItem("presupuesto")) || new Array();
    if (Presupuesto.length > 0) {
        mostrarView("viewPres");
        mostrarListadoPresupuesto();
    } else {
        Swal.fire({
            title: 'Atencion!',
            html: 'no existen Presupuestos.',
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        return false;
    }
}
selectRubroTable.onchange = () => {
    completarTable();
}
btnCancelarPresup.onclick = () => {
    limpiarPresupuesto()
}

function mostrarView(name) {
    limpiarOcultarWorks();
    tableWork.classList.add("descartar");
    createItems.classList.add("descartar");
    createPresup.classList.add("descartar");
    viewPres.classList.add("descartar")
    viewPresXId.classList.add("descartar")
    document.getElementById(name).classList.remove("descartar");
}
function mostrarPresupuesto(id) {
    document.getElementById("viewPres").classList.add("descartar");
    document.getElementById("viewPresXId").classList.remove("descartar");
    Presupuesto = JSON.parse(localStorage.getItem("presupuesto")) || new Array();
    presupuestoMostrar = Presupuesto.filter((item) => item.id == id)
    let divPresupuestoView = document.getElementById("divPresupuestoView");
    let { name_presupuesto, items, totalPresup } = presupuestoMostrar[0];
    document.getElementById("nameCustomerPres").innerText = name_presupuesto;
    document.getElementById("totalPresView").value = "Total: $ " + totalPresup;
    let itemsView = `<div class="d-flex">
    <div class="col">
        <h5 class="text-center">Trabajo</h5>
    </div>
    <div class="col">
        <h5 class="text-center">Valor Por unidad</h5>
    </div>
    <div class="col">
        <h5 class="text-center">Cantidad de trabajo</h5>
    </div>
    <div class="col">
        <h5 class="text-center">Total por trabajo</h5>
    </div>
</div>`;
    items?.forEach(element => {
        itemsView += `<div class="d-flex">
                    <div class="col">
                        <p class="text-center">${element.name}</p>
                    </div>
                    <div class="col">
                        <p class="text-center">${element.valueUni}</p>
                    </div>
                    <div class="col">
                        <p class="text-center">${element.CantWork}</p>
                    </div>
                    <div class="col">
                        <p class="text-center">${element.CantTotalWork}</p>
                    </div>
                </div>`;
    });
    divPresupuestoView.innerHTML = itemsView;
}
function mostrarListadoPresupuesto() {
    Presupuesto = JSON.parse(localStorage.getItem("presupuesto")) || new Array();
    let tbodyPresup = document.getElementById("tbodyPresup");
    let bodyTable = "";
    let boton = new Array();
    Presupuesto.forEach(element => {
        bodyTable += `<tr>
                            <td>${element.name_presupuesto}</td>
                            <td>$ ${element.totalPresup}</td>
                            <td>
                                <button class="btn bt-sm btn-primary" id="btnViewPres_${element.id}"><i class="fa fa-search"></i></button>
                                <button class="btn bt-sm btn-danger" id="btnDeletePres_${element.id}"><i class="fa fa-search"></i></button>
                            </td>
                        </tr>`;
        boton.push(element.id);
    });
    tbodyPresup.innerHTML = bodyTable;
    boton.forEach(element => {
        boton = document.getElementById("btnViewPres_" + element);
        boton.addEventListener("click", function () { mostrarPresupuesto(element) }, false);
        botonDelete = document.getElementById("btnDeletePres_" + element);
        botonDelete.addEventListener("click", function () { deletePresStorage(element) }, false);
    });
}


function addNewWork() {
    cantNewWork++;
    if (cantNewWork == 1) {
        btnDeleteNewWork.classList.remove("descartar");
    }
    let item = "";
    for (let i = 0; i <= cantNewWork; i++) {
        let name = document.getElementById("nameWork_" + i)?.value || "";
        let Valor = document.getElementById("valueUni_" + i)?.value || "";

        item += `<div class="col-6 mt-3">
                    <input type="text" placeholder="Nombre del trabajo a realizar" class="form-control" id="nameWork_${i}" value="${name}">
                </div>
                <div class="col-6 mt-3">
                    <input type="number" placeholder="Valor por unidad del trabajo" class="form-control" id="valueUni_${i}" value="${Valor}">
                </div>`;
    }

    idNewWork.innerHTML = item;
}
function addNewItemPres() {
    let itemsPresupuesto = document.getElementById("id_item");
    let valorUniNew = document.getElementById("valueUni").value;
    let select = document.getElementById("namesWork");
    let opcionSeleccionada = select.options[select.selectedIndex];
    let valorSelectNew = opcionSeleccionada.value;
    let textSelectNew = opcionSeleccionada.text;
    let valorCantNew = document.getElementById("CantWork").value;
    let rubroPresupuesto = document.getElementById("rubroPresupuesto").value;
    let valTotal = valorCantNew * valorUniNew;
    let item = `<div class="d-flex" id="item_${cantItems}">
                    <div class="col-1">
                        <button class="btn btn-sm btn-danger" id="deleteItem_${cantItems}"><i class="fa fa-minus text-light" aria-hidden="true"></i></button>
                    </div>
                    <div class="col">
                        <input type="hidden" disabled class="form-control" value="${valorSelectNew}" id="select_val_${cantItems}">
                        <input type="hidden" disabled class="form-control" value="${rubroPresupuesto}" id="rubro_id_${cantItems}">
                        <input type="text" disabled class="form-control" value="${textSelectNew}" id="select_${cantItems}">
                    </div>
                    <div class="col">
                        <input type="text" disabled class="form-control" value="$ ${valorUniNew}" id="valorUni_pres_${cantItems}">
                    </div>
                    <div class="col">
                        <input type="text" disabled value="${valorCantNew}" class="form-control" id="CantWork_${cantItems}">
                    </div>
                    <div class="col">
                        <input type="text" disabled value="$ ${valTotal}" class="form-control" id="CantTotalWork_${cantItems}">
                    </div>
                </div>`;
    itemsPresupuesto.innerHTML += item;
    let newBoton = document.getElementById("deleteItem_" + cantItems);
    btnsPresupuesto.push(newBoton);
    activarBotones()
    cantItems++;
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
function completarSelect() {
    let rubro = document.getElementById("rubroPresupuesto").value;
    let select = document.getElementById("namesWork");
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    if (workStorage.length > 0) {
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
    } else {
        Swal.fire({
            title: 'Atencion!',
            html: 'no existe Trabajos Creados.',
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        return false;

    }
}
function valorSelect(rubro, selected) {
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    Valor = workStorage.filter((item) => item.id == selected)
    document.getElementById("valueUni").value = Valor[0].valorUni;
}
function savePresup() {
    let itemsPresup = Array();
    let totalFinal = 0;
    let name_presupuesto = document.getElementById("nameCustomer")?.value
    if (name_presupuesto) {
        for (let i = 0; i < cantItems; i++) {
            let id_name = document.getElementById("select_val_" + i)?.value;
            let name = document.getElementById("select_" + i)?.value;
            let rubro = document.getElementById("rubro_id_" + i)?.value;
            let valueUni = document.getElementById("valorUni_pres_" + i)?.value;
            let CantWork = document.getElementById("CantWork_" + i)?.value;
            let CantTotalWork = document.getElementById("CantTotalWork_" + i)?.value;
            if (id_name) {
                itemsPresup.push({ "rubro": rubro, "id_name": id_name, "name": name, "valueUni": valueUni, "CantWork": CantWork, "CantTotalWork": CantTotalWork });
                elem = CantTotalWork.split("$ ")
                totalFinal = totalFinal + parseInt(elem[1]);
            }
        }
        if (itemsPresup.length > 0) {
            Presupuesto = JSON.parse(localStorage.getItem("presupuesto")) || new Array();
            Presupuesto.push({ "id": Presupuesto.length, "name_presupuesto": name_presupuesto, "items": itemsPresup, "totalPresup": totalFinal });
            newPresupuestoJSON = JSON.stringify(Presupuesto);
            localStorage.setItem("presupuesto", newPresupuestoJSON);
            limpiarPresupuesto();
            let idPresupuesto = Presupuesto.length - 1;
            mostrarPresupuesto(idPresupuesto);

            Swal.fire({
                title: 'Correcto!',
                html: 'Se guardo correctamente el trabajo nuevo.',
                icon: 'success',
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                title: 'Atencion!',
                html: 'Falta completar con los trabajos a realizar.',
                icon: 'error',
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false
            });
            return false;
        }
    } else {
        Swal.fire({
            title: 'Atencion!',
            html: 'Falta completar el nombre del Cliente.',
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        return false;
    }
}
function saveWork() {
    let rubro = document.getElementById("rubrosNewWork").value;
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    let id = workStorage?.length || 0;
    let idControl = id;
    for (let i = 0; i <= cantNewWork; i++) {
        let nameNewWork = document.getElementById("nameWork_" + i).value || "";
        let valorNewWork = document.getElementById("valueUni_" + i).value || "";
        if (nameNewWork != "" && valorNewWork != "") {
            workStorage[id] = { "id": id, "name": nameNewWork, "valorUni": valorNewWork };
            id++;
            newWorkJSON = JSON.stringify(workStorage);
            localStorage.setItem(rubro, newWorkJSON);
        }
    }
    if (idControl < id) {
        Swal.fire({
            title: 'Correcto!',
            html: 'Se guardo correctamente el trabajo nuevo.',
            icon: 'success',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        limpiarOcultarWorks();
    } else {
        Swal.fire({
            title: 'Atencion!',
            html: 'Debe completar todo los campos.',
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        return false;
    }


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
function limpiarPresupuesto() {
    for (let i = cantItems; i >= 0; i--) {
        let div = document.getElementById("item_" + i);
        div?.remove()
    }
    document.getElementById("CantWork").value = "";
    document.getElementById("nameCustomer").value = "";
    cantItems = 0;
    document.getElementById("createPresup").classList.add("descartar");
}
function limpiarOcultarWorks() {
    for (let i = cantNewWork; i > 0; i--) {
        DeleteNewWork();
    }
    document.getElementById("nameWork_0").value = "";
    document.getElementById("valueUni_0").value = "";
    document.getElementById("createItems").classList.add("descartar");
}
function deletePresStorage(id) {
    Presupuesto = JSON.parse(localStorage.getItem("presupuesto")) || new Array();
    Swal.fire({
        title: '¿desea eliminar este Presupuesto? No se puede recuperar',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Sí',
        denyButtonText: `No`,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            Presupuesto = Presupuesto.filter((item) => item.id != id)
            newWorkJSON = JSON.stringify(Presupuesto);
            localStorage.setItem("presupuesto", newWorkJSON);
            mostrarListadoPresupuesto();
        }
    })

}
function DeleteNewWork() {
    document.getElementById("idNewWork").innerHTML = "";
    cantNewWork = -1;
    addNewWork()
    if (cantNewWork == 0) {
        btnDeleteNewWork.classList.add("descartar");
    }
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