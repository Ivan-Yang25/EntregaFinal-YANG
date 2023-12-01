//Inicio de JS

document.addEventListener('DOMContentLoaded', () => {

    //Llamando elementos del DOM y creacion de arrays
    let usuario = document.getElementById('users');
    let close = document.getElementById('cierre');
    let compra = document.getElementsByClassName('compra');
    let clear = document.getElementById('clear');
    let card = document.getElementsByClassName('card');
    let NombrePok = document.getElementsByClassName('nombre');
    let TipoPok = document.getElementsByClassName('clase');
    let PrecioPok = document.getElementsByClassName('precio');

    //Variables de carrito
    let carro = [];
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
    let PokemonObj = function (nombre, clase, precio, id) {

        this.nombre = nombre;
        this.clase = clase;
        this.precio = precio;
        this.id = id;

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
            carro.push(PokemonObj1)

            //Variable tipo var para ignorar el scope
            var carroPokemon = carro
        };

        for (const cardElement of card) {

            //Obtener el índice actual
            const x = Array.from(card).indexOf(cardElement);

            //Asignar valores a elementos específicos dentro de las colecciones
            NombrePok[x].textContent = carroPokemon[x].nombre;
            TipoPok[x].textContent = carroPokemon[x].clase;
            PrecioPok[x].textContent = `$${carroPokemon[x].precio}`;
        };


        //for para recorrer la lista compra
        for (let u = 0; u < compra.length; u++) {

            //Evento para la lista compra
            compra[u].addEventListener('click', () => {

                //Declarando la variable contendora del carrito
                let contenidoCarrito = '';

                //Extraer informacion del HTML

                let nombre = card[u].getElementsByClassName('nombre')[0].textContent;
                let clase = card[u].getElementsByClassName('clase')[0].textContent;
                let precio = card[u].getElementsByClassName('precio')[0].textContent;

                //Instanciar OBJ

                const itemCarrito = new PokemonObj(nombre, clase, precio, u);

                //Alerta consultado si deseas comprar
                Swal.fire({
                    title: `¿Estas seguro de comprar a ${nombre}?`,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si! Lo quiero!"
                }).then((result) => {

                    //Condicional que dependiendo de lo que aceptes realiza la compra o no 
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "¡Guardado!",
                            text: "Tu pokemón fue guardado en el carrito",
                            icon: "success"
                        });

                        carrito.push(itemCarrito);
                        console.log(itemCarrito.id);

                        //Recorriendo los items del carrito
                        carrito.forEach(item => {

                            //Agregando contenido a la variable
                            contenidoCarrito += `
                                <tr class="elemento">
                                    <td>${item.nombre}</td>
                                    <td>${item.clase}</td>
                                    <td>$${item.precio}</td>   
                                </tr>
                                <span class="idItem"></span>
                                <button class="borrar">X</button>
                            `
                        });

                        //Agregando el contenido al elemento del DOM
                        content.innerHTML = contenidoCarrito;

                        //Vaciar carrito 
                        clear.addEventListener('click', () => {
                            carrito = [];
                            content.innerHTML = ``;
                        });

                    } else {
                        itemCarrito = '';
                        carrito.push(itemCarrito);
                    };
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