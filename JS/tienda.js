document.addEventListener('DOMContentLoaded', () => {

    let usuario = document.getElementById('users');
    let close = document.getElementById('cierre');
    let compra = document.getElementsByClassName('compra');
    let pokemon = document.getElementsByClassName('card');
    let carrito = [];

    let persona = sessionStorage.getItem("usuarios");
    let personaObj = JSON.parse(persona);

    let { name } = personaObj;

    usuario.textContent = `Bienvenido ${name}`;

    let pokemonObj = function (nombre, clase, precio) {

        this.nombre = nombre;
        this.clase = clase;
        this.precio = precio;

    }

    for (let u = 0; u < compra.length; u++) {

        compra[u].addEventListener('click', () => {

            let nombre = pokemon[u].getElementsByClassName('nombre')[0].textContent;
            let clase = pokemon[u].getElementsByClassName('clase')[0].textContent;
            let precio = pokemon[u].getElementsByClassName('precio')[0].textContent;

            const pokemonObj1 = new pokemonObj(nombre, clase, precio);
            carrito.push(pokemonObj1);
            console.log(carrito);
        });
    };

    close.addEventListener('click', () => {

        window.location = "index.html";
    });
});