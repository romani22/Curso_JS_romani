let presupuestos = new Array();
presupuesto();
function presupuesto() {
    let condicion = 1;
    let albanileria = new Array();
    let electricidad = new Array();
    let plomeria = new Array();
    let pintura = new Array();
    let servicios = new Array();
    let rubro = null;
    let NombreCliente = prompt("Escriba el nombre del cliente");
    while (NombreCliente == "" || NombreCliente == null) {
        if (NombreCliente == null) {
            salir = exitPresupuesto();
            if (salir == false) {
                return false;
            }
        }
        alert("Debe escribir el nombre del cliente para su presupuesto");
        NombreCliente = prompt("Escriba el nombre del cliente");
    }
    while (condicion == 1) {

        rubro = prompt("Escriba el numero del rubro quiere su presupuesto. \n 1- Albañileria \n 2- Electricidad \n 3- Plomeria \n 4- Pintura \n 5- Servicios Profesionales");
        while (rubro == null || rubro == "" || (rubro != "1" && rubro != "2" && rubro != "3" && rubro != "4" && rubro != "5")) {
            if (rubro == null) {
                salir = exitPresupuesto();
                if (salir == false) {
                    return false;
                } 1
            }
            alert("Debe escribir un rubro");
            rubro = prompt("Escriba el numero del rubro quiere su presupuesto. \n 1- Albañileria \n 2- Electricidad \n 3- Plomeria \n 4- Pintura \n 5- Servicios Profesionales");
        }
        if (rubro != null) {
            let trabajo = prompt("Escriba el Trabajo a realizar");
            while (trabajo == null || trabajo == "") {
                if (trabajo == null) {
                    salir = exitPresupuesto();
                    if (salir == false) {
                        return false;
                    }
                }
                alert("Debe escribir el nombre del trabajo a realizar");
                trabajo = prompt("Escriba el Trabajo a realizar");
            }
            let precio = prompt("Escriba el Valor por unidad del trabajo a realizar");
            while (precio == null || precio == "" || isNaN(precio) == true) {
                if (precio == null) {
                    salir = exitPresupuesto();
                    if (salir == false) {
                        return false;
                    }
                }
                alert("Debe escribir el precio del trabajo a realizar");
                precio = prompt("Escriba el Valor por unidad del trabajo a realizar");
            }
            let cantidad = prompt("Escriba la cantidad del trabajo por unidad a realizar");
            while (cantidad == null || cantidad == "" || isNaN(cantidad) == true) {
                if (cantidad == null) {
                    salir = exitPresupuesto();
                    if (salir == false) {
                        return false;
                    }
                }
                alert("Debe escribir la cantidad de trabajo a realizar");
                cantidad = prompt("Escriba la cantidad del trabajo por unidad a realizar");
            }
            switch (rubro) {
                case "1":
                    albanileria.push({ "trabajo": trabajo, "precio": precio, "cantidad": cantidad });
                    break;
                case "2":
                    electricidad.push({ "trabajo": trabajo, "precio": precio, "cantidad": cantidad });
                    break;
                case "3":
                    plomeria.push({ "trabajo": trabajo, "precio": precio, "cantidad": cantidad });
                    break;
                case "4":
                    pintura.push({ "trabajo": trabajo, "precio": precio, "cantidad": cantidad });
                    break;
                case "5":
                    servicios.push({ "trabajo": trabajo, "precio": precio, "cantidad": cantidad });
                    break;
            }

            condicion = prompt("Desea agregar otro trabajo mas al presupuesto? \n 1- Sí \n 2- No");
            while (condicion == null || condicion == "" || (condicion != "1" && condicion != "2")) {
                alert("Debe seleccionar 1 o 2");
                condicion = prompt("Desea agregar otro trabajo mas al presupuesto? \n 1- Sí \n 2- No");
            }
            if (condicion == "2") {
                presupuestos.push({ NombreCliente, albanileria, electricidad, plomeria, pintura, servicios, rubro });
                let ubicacion = presupuestos.length - 1;
                mostrarPresupuesto(NombreCliente, ubicacion);

                let final = prompt("Desea Realizar otro presupuesto? \n 1- Sí \n 2- No");
                while (final == null || final == "" || (final != "1" && final != "2")) {
                    alert("Debe seleccionar 1 o 2");
                    final = prompt("Desea Realizar otro presupuesto? \n 1- Sí \n 2- No");
                }
                if (final == "1") {
                    presupuesto();
                } else {
                    alert("Gracias... \nVuelva pronto")
                    condicion = 2;
                }
            }
        }
    }
}
function mostrarPresupuesto(nombre, ubicacion) {
    if (ubicacion != null) {
        let texto_presupuesto = "";
        let total = 0;
        if (presupuestos[ubicacion].NombreCliente == nombre) {
            if (presupuestos[ubicacion].albanileria.length > 0) {
                texto_presupuesto = texto_presupuesto + "Rubro Albañileria \nTrabajos a realizar: \n";
                for (let i = 0; i < presupuestos[ubicacion].albanileria.length; i++) {
                    texto_presupuesto = texto_presupuesto + presupuestos[ubicacion].albanileria[i].trabajo + ": ";
                    texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + presupuestos[ubicacion].albanileria[i].precio;
                    texto_presupuesto = texto_presupuesto + " Cant.: " + presupuestos[ubicacion].albanileria[i].cantidad;
                    let valor_final = presupuestos[ubicacion].albanileria[i].precio * presupuestos[ubicacion].albanileria[i].cantidad;
                    total = total + valor_final;
                    texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
                }
            }
            if (presupuestos[ubicacion].electricidad.length > 0) {
                texto_presupuesto = texto_presupuesto + "Rubro Electricidad \nTrabajos a realizar: \n";
                for (let i = 0; i < presupuestos[ubicacion].electricidad.length; i++) {
                    texto_presupuesto = texto_presupuesto + presupuestos[ubicacion].electricidad[i].trabajo + ": ";
                    texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + presupuestos[ubicacion].electricidad[i].precio;
                    texto_presupuesto = texto_presupuesto + " Cant.: " + presupuestos[ubicacion].electricidad[i].cantidad;
                    let valor_final = presupuestos[ubicacion].electricidad[i].precio * presupuestos[ubicacion].electricidad[i].cantidad;
                    total = total + valor_final;
                    texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
                }
            }
            if (presupuestos[ubicacion].plomeria.length > 0) {
                texto_presupuesto = texto_presupuesto + "Rubro Plomeria \nTrabajos a realizar: \n";
                for (let i = 0; i < presupuestos[ubicacion].plomeria.length; i++) {
                    texto_presupuesto = texto_presupuesto + presupuestos[ubicacion].plomeria[i].trabajo + ": ";
                    texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + presupuestos[ubicacion].plomeria[i].precio;
                    texto_presupuesto = texto_presupuesto + " Cant.: " + presupuestos[ubicacion].plomeria[i].cantidad;
                    let valor_final = presupuestos[ubicacion].plomeria[i].precio * presupuestos[ubicacion].plomeria[i].cantidad;
                    total = total + valor_final;
                    texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
                }
            }
            if (presupuestos[ubicacion].pintura.length > 0) {
                texto_presupuesto = texto_presupuesto + "Rubro Pintura \nTrabajos a realizar: \n";
                for (let i = 0; i < presupuestos[ubicacion].pintura.length; i++) {
                    texto_presupuesto = texto_presupuesto + presupuestos[ubicacion].pintura[i].trabajo + ": ";
                    texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + presupuestos[ubicacion].pintura[i].precio;
                    texto_presupuesto = texto_presupuesto + " Cant.: " + presupuestos[ubicacion].pintura[i].cantidad;
                    let valor_final = presupuestos[ubicacion].pintura[i].precio * presupuestos[ubicacion].pintura[i].cantidad;
                    total = total + valor_final;
                    texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
                }
            }
            if (presupuestos[ubicacion].servicios.length > 0) {
                texto_presupuesto = texto_presupuesto + "Rubro Servicios Profesionales \nTrabajos a realizar: \n";
                for (let i = 0; i < presupuestos[ubicacion].servicios.length; i++) {
                    texto_presupuesto = texto_presupuesto + presupuestos[ubicacion].servicios[i].trabajo + ": ";
                    texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + presupuestos[ubicacion].servicios[i].precio;
                    texto_presupuesto = texto_presupuesto + " Cant.: " + presupuestos[ubicacion].servicios[i].cantidad;
                    let valor_final = presupuestos[ubicacion].servicios[i].precio * presupuestos[ubicacion].servicios[i].cantidad;
                    total = total + valor_final;
                    texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
                }
            }
            if (presupuestos[ubicacion].NombreCliente) {
                texto_NombreCliente = presupuestos[ubicacion].NombreCliente;
            }


            if (texto_presupuesto != "") {
                texto_presupuesto = "PRESUPUESTO  de: " + texto_NombreCliente + "\n" + texto_presupuesto;
                texto_presupuesto = texto_presupuesto + "\nPrecio Final: $" + total;
            } else {
                texto_presupuesto = "Presupuesto No Realizado";
            }
            alert(texto_presupuesto);
        }
    } else {
        presupuestos.find(function (element) {
            let texto_presupuesto = "";
            let total = 0;
            if (element.NombreCliente == nombre) {
                if (element.albanileria.length > 0) {
                    texto_presupuesto = texto_presupuesto + "Rubro Albañileria \nTrabajos a realizar: \n";
                    for (let i = 0; i < element.albanileria.length; i++) {
                        texto_presupuesto = texto_presupuesto + element.albanileria[i].trabajo + ": ";
                        texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + element.albanileria[i].precio;
                        texto_presupuesto = texto_presupuesto + " Cant.: " + element.albanileria[i].cantidad;
                        let valor_final = element.albanileria[i].precio * element.albanileria[i].cantidad;
                        total = total + valor_final;
                        texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
                    }
                }
                if (element.electricidad.length > 0) {
                    texto_presupuesto = texto_presupuesto + "Rubro Electricidad \nTrabajos a realizar: \n";
                    for (let i = 0; i < element.electricidad.length; i++) {
                        texto_presupuesto = texto_presupuesto + element.electricidad[i].trabajo + ": ";
                        texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + element.electricidad[i].precio;
                        texto_presupuesto = texto_presupuesto + " Cant.: " + element.electricidad[i].cantidad;
                        let valor_final = element.electricidad[i].precio * element.electricidad[i].cantidad;
                        total = total + valor_final;
                        texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
                    }
                }
                if (element.plomeria.length > 0) {
                    texto_presupuesto = texto_presupuesto + "Rubro Plomeria \nTrabajos a realizar: \n";
                    for (let i = 0; i < element.plomeria.length; i++) {
                        texto_presupuesto = texto_presupuesto + element.plomeria[i].trabajo + ": ";
                        texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + element.plomeria[i].precio;
                        texto_presupuesto = texto_presupuesto + " Cant.: " + element.plomeria[i].cantidad;
                        let valor_final = element.plomeria[i].precio * element.plomeria[i].cantidad;
                        total = total + valor_final;
                        texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
                    }
                }
                if (element.pintura.length > 0) {
                    texto_presupuesto = texto_presupuesto + "Rubro Pintura \nTrabajos a realizar: \n";
                    for (let i = 0; i < element.pintura.length; i++) {
                        texto_presupuesto = texto_presupuesto + element.pintura[i].trabajo + ": ";
                        texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + element.pintura[i].precio;
                        texto_presupuesto = texto_presupuesto + " Cant.: " + element.pintura[i].cantidad;
                        let valor_final = element.pintura[i].precio * element.pintura[i].cantidad;
                        total = total + valor_final;
                        texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
                    }
                }
                if (element.servicios.length > 0) {
                    texto_presupuesto = texto_presupuesto + "Rubro Servicios Profesionales \nTrabajos a realizar: \n";
                    for (let i = 0; i < element.servicios.length; i++) {
                        texto_presupuesto = texto_presupuesto + element.servicios[i].trabajo + ": ";
                        texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + element.servicios[i].precio;
                        texto_presupuesto = texto_presupuesto + " Cant.: " + element.servicios[i].cantidad;
                        let valor_final = element.servicios[i].precio * element.servicios[i].cantidad;
                        total = total + valor_final;
                        texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
                    }
                }
                if (element.NombreCliente) {
                    texto_NombreCliente = element.NombreCliente;
                }


                if (texto_presupuesto != "") {
                    texto_presupuesto = "PRESUPUESTO  de: " + texto_NombreCliente + "\n" + texto_presupuesto;
                    texto_presupuesto = texto_presupuesto + "\nPrecio Final: $" + total;
                } else {
                    texto_presupuesto = "Presupuesto No Realizado";
                }
                alert(texto_presupuesto);
            }
        });
    }
}
function exitPresupuesto() {
    exit = prompt("Desea salir del presupueto? \n 1- Sí \n 2- No");
    while (exit == null || exit == "" || (exit != "1" && exit != "2")) {
        alert("Debe seleccionar 1 o 2");
        exit = prompt("Desea salir del presupueto? \n 1- Sí \n 2- No");
    }
    if (exit == 1) {
        return false;
    }
    if (exit == 2) {
        return true;
    }
}
function buscar_presupuesto() {
    let busqueda = prompt("¿Por cual parametro desea realizar la busqueda? \n 1- Nombre del cliente \n 2- Nombre de trabajo realizado");
    while (busqueda == null || busqueda == "" || isNaN(busqueda) == true) {
        exit = prompt("Desea salir de la busqueda? \n 1- Sí \n 2- No");
        while (exit == null || exit == "" || (exit != "1" && exit != "2")) {
            alert("Debe seleccionar 1 o 2");
            exit = prompt("Desea salir de la busqueda? \n 1- Sí \n 2- No");
        }
        if (exit == "1") {
            return false;
        }
        alert("Debe escribir el parametro de busqueda");
        busqueda = prompt("¿Por cual parametro desea realizar la busqueda? \n 1- Nombre del cliente \n 2- Nombre de trabajo realizado");
    }
    if (busqueda == "1") {
        let name = prompt("¿El presupuesto de quien deseas buscar?");
        while (name == null || name == "") {
            alert("Debe escribir el nombre del cliente");
            name = prompt("¿El presupuesto de quien deseas buscar?");
        }
        busqueda_x_cliente(name);
    }
    if (busqueda == "2") {
        let name = prompt("¿Que trabajo deseas buscar?");
        while (name == null || name == "") {
            alert("Debe escribir el nombre del trabajo");
            name = prompt("¿Que trabajo deseas buscar?");
        }
        busqueda_x_trabajo(name);
    }
}

function busqueda_x_cliente(name) {
    let resultado = presupuestos.find(elem => elem.NombreCliente == name);
    if (resultado) {
        mostrarPresupuesto(name)
    } else {
        alert("no se encontro");
    }
}
function busqueda_x_trabajo(name) {
    let resultado = "";
    presupuestos.forEach(element => {
        element.albanileria.forEach(el => {
            if (el["trabajo"] == name) {
                resultado = element.NombreCliente;
                return;
            }
        });
        element.electricidad.forEach(el => {
            if (el["trabajo"] == name) {
                resultado = element.NombreCliente;
                return;
            }
        });
        element.pintura.forEach(el => {
            if (el["trabajo"] == name) {
                resultado = element.NombreCliente;
                return;
            }
        });
        element.plomeria.forEach(el => {
            if (el["trabajo"] == name) {
                resultado = element.NombreCliente;
                return;
            }
        });
        element.servicios.forEach(el => {
            if (el["trabajo"] == name) {
                resultado = element.NombreCliente;
                return;
            }
        });
        if (resultado != "") {
            mostrarPresupuesto(resultado)
        }
    });
    if (resultado == "") {
        alert("no se encontro");
    }


}