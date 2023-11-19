//Inicio de JS

document.addEventListener('DOMContentLoaded', () => {

    //Llamando elementos del DOM y creacion de arrays
    let usuario = document.getElementById('users');
    let close = document.getElementById('cierre');
    let compra = document.getElementsByClassName('compra');
    let clear = document.getElementById('clear');
    let carrito = [];


    //Llamar info de sessionstorage previamente guardada
    let persona = sessionStorage.getItem("usuarios");

    //Convirtiendo dicha informacion en un objeto
    let personaObj = JSON.parse(persona);
    let content = document.getElementById('content');


    //Destructuring de objeto
    let { name } = personaObj;

    //Agregando contenido al elemento
    usuario.textContent = `Bienvenido ${name}`;


    //Funcion para crear objetos
    let PokemonObj = function (nombre, clase, precio) {

        this.nombre = nombre;
        this.clase = clase;
        this.precio = precio;

    };

    //Llamando informacion de API pokemon 
    const PokemonApi = async () => {

        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const data = await response.json();
        

        for (let i = 0; i < data.results.length; i++) {

            let nombrePok = data.results[i].name;

            let baseURL = "https://pokeapi.co/api/v2/pokemon/";

            let UrlyNombre = baseURL + nombrePok;

            const res = await fetch(UrlyNombre);
            const datos = await res.json();

            let nombre = datos.name;
            let clase = datos.types[0].type.name;
            let precio = datos.weight;

            const PokemonObj1 = new PokemonObj(nombre, clase, precio);
        };


        //for para recorrer la lista compra
        for (let u = 0; u < compra.length; u++) {


            //Evento para la lista compra
            compra[u].addEventListener('click', () => {

                //Declarando la variable contendora del carrito
                let contenidoCarrito = '';

                //Agregar el objeto al array
                carrito.push(PokemonObj1);

                //Recorriendo los items del carrito
                carrito.forEach(item => {

                    //Agregando contenido a la variable
                    contenidoCarrito += `
                <tr class="elemento">
                    <td>El Pokemon es: ${item.nombre}</td>
                    <td>La clase del Pokemon es: ${item.clase}</td>
                    <td>El precio es: ${item.precio}</td>   
                </tr>
                `
                });

                //Agregando el contenido al elemento del DOM
                content.innerHTML = contenidoCarrito;

                //Vaciar carrito 
                clear.addEventListener('click', () => {
                    carrito = [];
                    content.innerHTML = ``;
                });
            });
        };

    };

    PokemonApi();

    //Volver al incio de sesion
    close.addEventListener('click', () => {

        window.location = "index.html";
    });
});