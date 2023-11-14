//Inicio de JS

document.addEventListener('DOMContentLoaded', () => {

    //Llamando elementos del DOM y creacion de arrays
    let usuario = document.getElementById('users');
    let nav = document.getElementById('nav');
    let close = document.getElementById('cierre');
    let compra = document.getElementsByClassName('compra');
    let pokemon = document.getElementsByClassName('card');
    let items = document.getElementById('compras');
    let carrito = [];

    //Llamar info de sessionstorage previamente guardada
    let persona = sessionStorage.getItem("usuarios");

    //Convirtiendo dicha informacion en un objeto
    let personaObj = JSON.parse(persona);
    let content = document.createElement('DIV');

    //Anidando elementos
    nav.appendChild(content);

    //Validacion de clase con operador ternario
    items.addEventListener('click', () => {
        content.classList.contains('visual') ? content.classList.remove('visual') : content.classList.add('visual');
    });

    //Destructuring de objeto
    let { name } = personaObj;

    //Agregando contenido al elemento
    usuario.textContent = `Bienvenido ${name}`;

    //Funcion para crear objetos
    let pokemonObj = function (nombre, clase, precio) {

        this.nombre = nombre;
        this.clase = clase;
        this.precio = precio;

    }

    //for para recorrer la lista compra
    for (let u = 0; u < compra.length; u++) {


        //Evento para la lista compra
        compra[u].addEventListener('click', () => {

            //Extraer informacion de los elementos en HTML
            let nombre = pokemon[u].getElementsByClassName('nombre')[0].textContent;
            let clase = pokemon[u].getElementsByClassName('clase')[0].textContent;
            let precio = pokemon[u].getElementsByClassName('precio')[0].textContent;

            //Instanciando un nuevo objeto
            const itemCarrito = new pokemonObj(nombre, clase, precio);
            carrito.push(itemCarrito);

            //Declarando la variable contendora del carrito
            let contenidoCarrito ='';
            
            //Recorriendo los items del carrito
            carrito.forEach(item => {

                //Agregando contenido a la variable
                contenidoCarrito += `
                    <h5>El Pokemon es: ${item.nombre}</h5></br>
                    <p>
                        La clase de Pokemon es: ${item.clase}</br>
                        El precio es: ${item.precio}
                    </p>
                `
            });
            
            //Agregando el contenido al elemento del DOM
            content.innerHTML = contenidoCarrito;
        });
    };

    //Volver al incio de sesion
    close.addEventListener('click', () => {

        window.location = "index.html";
    });
});