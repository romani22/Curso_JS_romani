function limpiezaStorage() {
    Inicio = JSON.parse(localStorage.getItem("InicioNuevo")) || new Array();
    if (Inicio.length == 0) {
        localStorage.clear();
        localStorage.setItem("InicioNuevo", "1");
    }

}
limpiezaStorage()
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

//Array para datos de JSON
let DataBase = new Array();
let DataComnplete = new Array();

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
    UploadDataBase()
    if (DataComnplete.length > 0) {
        rubroPresupuesto.addEventListener('change', () => {
            completarSelect();
        });
        completarSelect();
        mostrarView("createPresup");
    } else {
        Swal.fire({
            title: 'Atencion!',
            html: 'No existe trabajo creado.',
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        return false;
    }
}

btnEditWork.onclick = () => {
    UploadDataBase()
    if (DataComnplete.length > 0) {
        mostrarView("tableWork");
        completarTable();
    } else {
        Swal.fire({
            title: 'Atencion!',
            html: 'No existe trabajo creado.',
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        return false;
    }
}

btnNewItems.onclick = () => {
    btnCreateNewwork.classList.remove("descartar");
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
            html: 'No existen presupuestos.',
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
        <h5 class="text-center TextPresu">Trabajo</h5>
    </div>
    <div class="col">
        <h5 class="text-center TextPresu">Valor por unidad</h5>
    </div>
    <div class="col">
        <h5 class="text-center TextPresu">Cantidad de trabajo</h5>
    </div>
    <div class="col">
        <h5 class="text-center TextPresu">Total por trabajo</h5>
    </div>
</div>`;
    items?.forEach(element => {
        itemsView += `<div class="d-flex">
                    <div class="col">
                        <p class="text-center TextPresu">${element.name}</p>
                    </div>
                    <div class="col">
                        <p class="text-center TextPresu">${element.valueUni}</p>
                    </div>
                    <div class="col">
                        <p class="text-center TextPresu">${element.CantWork}</p>
                    </div>
                    <div class="col">
                        <p class="text-center TextPresu">${element.CantTotalWork}</p>
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
                                <button class="btn bt-sm btn-danger" id="btnDeletePres_${element.id}"><i class="fa fa-trash"></i></button>
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
        let Unidad = document.getElementById("uniWork_" + i)?.value || "";
        let Valor = document.getElementById("valueUni_" + i)?.value || "";
        item += `<div class="col-4 mt-3">
                    <input type="text" placeholder="Nombre del trabajo a realizar" class="form-control" id="nameWork_${i}" value="${name}">
                </div>
                <div class="col-4 mt-3">
                    <input type="text" placeholder="Unidad del trabajo a realizar" class="form-control" id="uniWork_${i}" value="${Unidad}">
                </div>
                <div class="col-4 mt-3">
                    <input type="number" placeholder="Valor por unidad del trabajo" class="form-control" id="valueUni_${i}" value="${Valor}">
                </div>`;
    }

    idNewWork.innerHTML = item;
}

function addNewItemPres() {
    let itemsPresupuesto = document.getElementById("id_item");
    let valorUniNew = document.getElementById("valueUni").value;
    let unidad = document.getElementById("unidad").value;
    let select = document.getElementById("namesWork");
    let opcionSeleccionada = select.options[select.selectedIndex];
    let valorSelectNew = opcionSeleccionada.value;
    let textSelectNew = opcionSeleccionada.text;
    let valorCantNew = document.getElementById("CantWork").value;
    if (valorCantNew != "") {
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
                    <div class="col descartarCelular">
                        <input type="text" disabled class="form-control" value="$ ${unidad}" id="unidad_pres_${cantItems}">
                    </div> 
                    <div class="col descartarCelular">
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
        document.getElementById("CantWork").value = "";
        cantItems++;
    } else {
        Swal.fire({
            title: 'Atencion!',
            html: 'Falta completar la cantidad de trabajo a realizar.',
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        return false;
    }
}

function completarTable() {
    let rubro = document.getElementById("rubrosTableWork").value;
    let works = new Array();
    DataBase?.forEach(elRubro => {
        nameRubro = Object.keys(elRubro)[0];
        if (nameRubro == rubro) {
            works = elRubro[nameRubro]
        }
    })
    let tbodyWorks = document.getElementById("tbodyWorks");
    let bodyTable = "";
    let boton = new Array();
    works.forEach(element => {
        bodyTable += `<tr>
            <td>${element.name}</td>
            <td class="descartarCelular">${element.unidad}</td>
            <td>${element.valorUni}</td>
            <td><button class="btn bt-sm btn-warning text-white" id="${rubro}_${element.id}"><i class="fa fa-pencil"></i></button></td>
        </tr>`;
        boton.push(rubro + "_" + element.id);
    });

    tbodyWorks.innerHTML = bodyTable;
    boton.forEach(element => {
        boton = document.getElementById(element);
        boton.addEventListener("click", function () { changeWork(element) }, false);
    });
}

function completarSelect() {
    let rubro = document.getElementById("rubroPresupuesto").value;
    let select = document.getElementById("namesWork");
    UploadDataBase()
    if (DataComnplete.length > 0) {
        let options = "";
        DataComnplete?.forEach(elDataBase => {
            nameRubro = Object.keys(elDataBase)[0];
            if (nameRubro == rubro) {
                elDataBase[nameRubro]?.forEach(element => {
                    options += `<option value="${element.id}">${element.name}</option>`;
                })
            }
        });
        select.innerHTML = options;
        valorSelect(rubro, DataComnplete[0]["Albanileria"][0].id);
        select.addEventListener('change', () => {
            var selectedOption = select.options[select.selectedIndex];
            valorSelect(rubro, selectedOption.value);
        });
    } else {
        Swal.fire({
            title: 'Atencion!',
            html: 'No existe trabajos creados.',
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        return false;

    }
}

function valorSelect(rubro, selected) {
    workStorage = new Array();
    DataComnplete?.forEach(elRubro => {
        nameRubro = Object.keys(elRubro)[0];
        WorksDateBase = elRubro;
        if (nameRubro == rubro) {
            WorksDateBase[nameRubro].forEach(el => {
                if (el.id == selected) {
                    workStorage.push(el)
                }
                return workStorage;
            })
        }
    });
    Valor = workStorage.filter((item) => item.id == selected)
    document.getElementById("unidad").value = Valor[0].unidad;
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
            html: 'Falta completar el nombre del cliente.',
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        return false;
    }
}

function saveWork() {
    Swal.fire({
        title: '¿Desea crear este/os trabajos? </br>El trabajo que no tenga todo los campos completos, no se creara',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Sí',
        denyButtonText: `No`,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            let rubro = document.getElementById("rubrosNewWork").value;
            workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
            let id_work = document.getElementById("id_work")?.value || "";
            let idControl = ""
            let id = ""

            if (id_work == "") {
                id = workStorage?.length || 0;
                if (id > 0) {
                    ubic = id - 1;
                    id = workStorage[ubic].id;
                    id++;
                }
                DataComnplete?.forEach(elRubro => {
                    nameRubro = Object.keys(elRubro)[0];
                    if (nameRubro == rubro) {
                        if (id < elRubro[nameRubro].length) {
                            id = elRubro[nameRubro].length;
                            console.log(elRubro[nameRubro]);
                        }
                    }
                })

                idControl = id;
                for (let i = 0; i <= cantNewWork; i++) {
                    let nameNewWork = document.getElementById("nameWork_" + i).value || "";
                    let uniNewWork = document.getElementById("uniWork_" + i).value || "";
                    let valorNewWork = document.getElementById("valueUni_" + i).value || "";
                    if (nameNewWork != "" && valorNewWork != "" && uniNewWork != "") {
                        workStorage.push({ "id": id, "name": nameNewWork, "unidad": uniNewWork, "dataBase": "storage", "status": 1, "valorUni": valorNewWork });
                        id++;
                        newWorkJSON = JSON.stringify(workStorage);
                        localStorage.setItem(rubro, newWorkJSON);
                    }
                }
            } else {
                id = parseInt(id_work);
                idControl = id;
                let nameNewWork = document.getElementById("nameWork_0").value
                let uniNewWork = document.getElementById("uniWork_0").value
                let valorNewWork = document.getElementById("valueUni_0").value
                if (nameNewWork != "" && valorNewWork != "" && uniNewWork != "") {
                    let paso = false;
                    workStorage.map(function (dato) {
                        if (dato.id == id) {
                            paso = true;
                            dato.name = nameNewWork;
                            dato.unidad = uniNewWork;
                            dato.dataBase = "storage";
                            dato.valorUni = valorNewWork;
                            id++;
                        }
                        return dato;
                    })
                    if (paso == true) {
                        id++;
                        newWorkJSON = JSON.stringify(workStorage);
                        localStorage.setItem(rubro, newWorkJSON);
                        document.getElementById("id_work").value = "";
                    } else {
                        workStorage.push({ "id": id, "name": nameNewWork, "unidad": uniNewWork, "dataBase": "storage", "status": 1, "valorUni": valorNewWork });
                        id++;
                        newWorkJSON = JSON.stringify(workStorage);
                        localStorage.setItem(rubro, newWorkJSON);
                        document.getElementById("id_work").value = "";
                    }
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
                UploadDataBase()
                limpiarOcultarWorks();
            } else {
                Swal.fire({
                    title: 'Atención!',
                    html: 'Debe completar todo los campos.',
                    icon: 'error',
                    showCloseButton: true,
                    showCancelButton: false,
                    showConfirmButton: false
                });
                return false;
            }
        }
    })
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
    document.getElementById("uniWork_0").value = "";
    document.getElementById("valueUni_0").value = "";
    document.getElementById("createItems").classList.add("descartar");
}

function deletePresStorage(id) {
    Presupuesto = JSON.parse(localStorage.getItem("presupuesto")) || new Array();
    Swal.fire({
        title: '¿Desea eliminar este presupuesto? </br> No se puede recuperar',
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
    cantNewWork = cantNewWork - 2;
    addNewWork();
    if (cantNewWork <= 0) {
        btnDeleteNewWork.classList.add("descartar");
    }
}

function changeWork(elem) {
    elem2 = elem.split("_")
    rubro = elem2[0]
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array()
    work_Id = elem2[1]
    Swal.fire({
        title: '¿Que desea hacer con este trabajo?',
        showDenyButton: true,
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText: 'Editar',
        denyButtonText: `Eliminar`,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            EditeWork(elem)
        } else if (result.isDenied) {
            deleteStorage(elem)
        }
    })
}

function deleteStorage(elem) {
    elem = elem.split("_")
    rubro = elem[0];
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    work_Id = elem[1];
    Swal.fire({
        title: '¿Desea eliminar/reestablecer de fabrica este trabajo? </br> No se puede recuperar',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Sí',
        denyButtonText: `No`,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            workStorage2 = workStorage.filter((item) => item.id == work_Id)
            if (workStorage2.length > 0) {
                workStorage = workStorage.filter((item) => item.id != work_Id)
                newWorkJSON = JSON.stringify(workStorage);
                localStorage.setItem(rubro, newWorkJSON);
                UploadDataBase()
                setTimeout(completarTable, 200)
            } else {
                Swal.fire({
                    title: 'Atencion!',
                    html: 'No se puede eliminar este trabajo ya que es un predefinido en la aplicación.',
                    icon: 'error',
                    showCloseButton: true,
                    showCancelButton: false,
                    showConfirmButton: false
                });
                return false;
            }

        }
    })
}

function EditeWork(elem) {
    elem = elem.split("_")
    rubro = elem[0];
    workStorage = JSON.parse(localStorage.getItem(rubro)) || new Array();
    work_Id = elem[1];
    Swal.fire({
        title: '¿Desea editar este trabajo?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Sí',
        denyButtonText: `No`,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            jobSave = workStorage.filter((item) => item.id == work_Id) || new Array();
            if (jobSave.length <= 0) {
                DataComnplete?.forEach(elRubro => {
                    nameRubro = Object.keys(elRubro)[0];
                    WorksDateBase = elRubro;
                    if (nameRubro == rubro) {
                        WorksDateBase[nameRubro].forEach(el => {
                            if (el.id == work_Id) {
                                jobSave.push(el)
                            }
                            return jobSave;
                        })
                    }

                });
            }
            mostrarView("createItems")
            document.getElementById("rubrosNewWork").value = rubro;
            document.getElementById("nameWork_0").value = jobSave[0].name
            document.getElementById("uniWork_0").value = jobSave[0].unidad
            document.getElementById("valueUni_0").value = jobSave[0].valorUni
            document.getElementById("id_work").value = jobSave[0].id
            btnCreateNewwork.classList.add("descartar")
        }
    })
}

//obtencion de datos del archivo JSON 
function UploadDataBase() {
    let WorksDateBase = new Array();
    fetch('./Data/data.json')
        .then(res => res.json())
        .then(datos => {
            DataComnplete = new Array();
            DataBase = datos.Works;
            DataBase?.forEach(elRubro => {
                nameRubro = Object.keys(elRubro)[0];
                WorksDateBase = elRubro;
                workStorage = JSON.parse(localStorage.getItem(nameRubro)) || "";
                if (workStorage != "") {
                    workStorage?.forEach(el => {
                        let paso = false;
                        WorksDateBase[nameRubro].map(function (dato) {
                            if (dato.id == parseInt(el.id)) {
                                paso = true;
                                dato.id = el.id;
                                dato.name = el.name;
                                dato.unidad = el.unidad;
                                dato.dataBase = el.dataBase;
                                dato.valorUni = el.valorUni;
                            }
                            return dato;
                        })
                        if (paso == false) {
                            WorksDateBase[nameRubro].push(el)
                        }
                    })
                }
                WorksDateBase[nameRubro] = WorksDateBase[nameRubro].filter((item) => item.status == 1)
                DataComnplete.push(WorksDateBase);
            });
        })
}
UploadDataBase();