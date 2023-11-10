document.addEventListener('DOMContentLoaded', () => {

    let usuario = document.getElementById('users');
    let close = document.getElementById('cierre');
    let compra = document.getElementsByClassName('compra');
    let pokemon = document.getElementByClassName('.card');
    let carrito = [];

    let persona = sessionStorage.getItem("usuarios");
    let personaObj = JSON.parse(persona);

    let {name} = personaObj;
        
    usuario.textContent =  `Bienvenido ${name}`;

    for (let i = 0; i < compra.length; i++){

        compra[i].addEventListener('click', () => {
            
            console.log('Compraste');

        });
    };

    close.addEventListener('click', () => {

        window.location = "index.html";
    }); 
});