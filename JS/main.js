//Inicio de JS
document.addEventListener('DOMContentLoaded', () => {

    //Extraer elementos del DOM
    let form = document.getElementById('form');
    let content = document.getElementById('sesion');
    let formName = document.getElementById('name');
    let formPass = document.getElementById('password');
    let alerta = document.createElement('DIV');
    let lista = document.getElementById('ul_list');
    let btn = document.getElementById('btn');
    let Token = document.createElement('li');

    //Agregando contenido a la alerta
    alerta.innerHTML = `<p>
                            Complete los campos correspondientes
                        </P>`;


    //Creancion de funcion para numero aleatorio para Token

    function Aleatorio(min, max) {

        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    let random = Aleatorio(1, 100);

    //Agregando evento y preveniento que inicie antes de terminar el codigo
    form.addEventListener('submit', event => {
        event.preventDefault();

        //Extraer el valor de los elementos
        let name = formName.value;
        let password = formPass.value;

        //Funcion para crear un creador de objetos
        function DatosUsuario(name, password) {

            this.name = name;
            this.password = password;

        };

        //Instanciando un objeto
        const DatosUsuario1 = new DatosUsuario(name, password);

        //Guardando el objeto en un sessionstorage
        sessionStorage.setItem("usuarios", JSON.stringify(DatosUsuario1));

        //Validando inicio de sesion
        if (DatosUsuario1.name === '' && DatosUsuario1.password === '') {

            form.appendChild(alerta);

            setTimeout(() => {
                alerta.remove()
            }, 3000);


        } else if (DatosUsuario1.name === '' || DatosUsuario1.password === '') {

            form.appendChild(alerta);

            setTimeout(() => {
                alerta.remove()
            }, 3000);

        } else {

            //Corroborar que ya no exista un elemento "Token" para crear uno
            if (!lista.contains(Token)) {

                Token.innerHTML = `<input type="text" id="token" />`
                lista.insertBefore(Token, btn);

                let AlertaToken = document.createElement('span');
                AlertaToken.textContent = `TUTOKENUSU${random}`;

                content.insertBefore(AlertaToken, form);

                let inp = document.getElementById('token');

                //Validar si el token ingresado es igual al generado
                inp.addEventListener('keydown', () => {

                    let valorToken = inp.value;
                    let errorToken = document.createElement('li');
                    errorToken.innerHTML = `<span>ERROR EN TOKEN</span>`; 

                    valorToken === AlertaToken.textContent ? 
                    
                    window.location = 'tienda.html' 
                    
                    : 
                    
                    (() => {

                        if (form.contains(errorToken)) {

                            errorToken.remove()
                        
                        } else {

                            form.appendChild(errorToken);

                            setTimeout(() => {
                                errorToken.remove();
                            }, 2000);
                        }
                    }) (); 
                });
            };
        };
    });
});