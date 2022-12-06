function presupuesto() {
    let condicion = 1;
    let albanileria = new Array();
    let electricidad = new Array();
    let plomeria = new Array();
    let pintura = new Array();
    let servicios = new Array();
    let rubro = null;
    while (condicion == 1) {
        rubro = prompt("Escriba el numero del rubro quiere su presupuesto. \n 1- Albañileria \n 2- Electricidad \n 3- Plomeria \n 4- Pintura \n 5- Servicios Profesionales");
        while (rubro == "" && (rubro != "1" && rubro != "2" && rubro != "3" && rubro != "4" && rubro != "5")) {
            alert("Debe escribir un rubro");
            rubro = prompt("Escriba el numero del rubro quiere su presupuesto. \n 1- Albañileria \n 2- Electricidad \n 3- Plomeria \n 4- Pintura \n 5- Servicios Profesionales");
        }
        if (rubro != null) {
            let trabajo = prompt("Escriba el Trabajo a realizar");
            console.log("trabajo" + isNaN(trabajo));
            while (trabajo == null || trabajo == "" || isNaN(trabajo) == false) {
                alert("Debe escribir el nombre del trabajo a realizar");
                trabajo = prompt("Escriba el Trabajo a realizar");
            }
            let precio = prompt("Escriba el Valor por unidad del trabajo a realizar");
            while (precio == null || precio == "" || isNaN(precio) == true) {
                alert("Debe escribir el precio del trabajo a realizar");
                precio = prompt("Escriba el Valor por unidad del trabajo a realizar");
            }
            let cantidad = prompt("Escriba la cantidad del trabajo por unidad a realizar");
            while (cantidad == null || cantidad == "" || isNaN(cantidad) == true) {
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
        } else {
            condicion = 2;
        }
    }

    let texto_presupuesto = "";
    let total = 0;
    if (albanileria.length > 0) {
        texto_presupuesto = texto_presupuesto + "Rubro Albañileria \nTrabajos a realizar: \n";
        for (let i = 0; i < albanileria.length; i++) {
            texto_presupuesto = texto_presupuesto + albanileria[i].trabajo + ": ";
            texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + albanileria[i].precio;
            texto_presupuesto = texto_presupuesto + " Cant.: " + albanileria[i].cantidad;
            let valor_final = albanileria[i].precio * albanileria[i].cantidad;
            total = total + valor_final;
            texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
        }
    }
    if (electricidad.length > 0) {
        texto_presupuesto = texto_presupuesto + "Rubro Electricidad \nTrabajos a realizar: \n";
        for (let i = 0; i < electricidad.length; i++) {
            texto_presupuesto = texto_presupuesto + electricidad[i].trabajo + ": ";
            texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + electricidad[i].precio;
            texto_presupuesto = texto_presupuesto + " Cant.: " + electricidad[i].cantidad;
            let valor_final = electricidad[i].precio * electricidad[i].cantidad;
            total = total + valor_final;
            texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
        }
    }
    if (plomeria.length > 0) {
        texto_presupuesto = texto_presupuesto + "Rubro Plomeria \nTrabajos a realizar: \n";
        for (let i = 0; i < plomeria.length; i++) {
            texto_presupuesto = texto_presupuesto + plomeria[i].trabajo + ": ";
            texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + plomeria[i].precio;
            texto_presupuesto = texto_presupuesto + " Cant.: " + plomeria[i].cantidad;
            let valor_final = plomeria[i].precio * plomeria[i].cantidad;
            total = total + valor_final;
            texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
        }
    }
    if (pintura.length > 0) {
        texto_presupuesto = texto_presupuesto + "Rubro Pintura \nTrabajos a realizar: \n";
        for (let i = 0; i < pintura.length; i++) {
            texto_presupuesto = texto_presupuesto + pintura[i].trabajo + ": ";
            texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + pintura[i].precio;
            texto_presupuesto = texto_presupuesto + " Cant.: " + pintura[i].cantidad;
            let valor_final = pintura[i].precio * pintura[i].cantidad;
            total = total + valor_final;
            texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
        }
    }
    if (servicios.length > 0) {
        texto_presupuesto = texto_presupuesto + "Rubro Servicios Profesionales \nTrabajos a realizar: \n";
        for (let i = 0; i < servicios.length; i++) {
            texto_presupuesto = texto_presupuesto + servicios[i].trabajo + ": ";
            texto_presupuesto = texto_presupuesto + "Valor Unidad: $" + servicios[i].precio;
            texto_presupuesto = texto_presupuesto + " Cant.: " + servicios[i].cantidad;
            let valor_final = servicios[i].precio * servicios[i].cantidad;
            total = total + valor_final;
            texto_presupuesto = texto_presupuesto + " Total trabajo: $" + valor_final + "\n";
        }
    }

    if (texto_presupuesto != "") {
        texto_presupuesto = "PRESUPUESTO \n" + texto_presupuesto;
        texto_presupuesto = texto_presupuesto + "\nPrecio Final: $" + total;
    } else {
        texto_presupuesto = "Presupuesto No Realizado";
    }
    alert(texto_presupuesto);

    condicion = prompt("Desea Realizar otro presupuesto? \n 1- Sí \n 2- No");
    while (condicion == null || condicion == "" || (condicion != "1" && condicion != "2")) {
        alert("Debe seleccionar 1 o 2");
        condicion = prompt("Desea Realizar otro presupuesto? \n 1- Sí \n 2- No");
    }
    if (condicion == 1) {
        presupuesto();
    } else {
        alert("Gracias... \nVuelva pronto")
    }
}
presupuesto();