//Inicio de JS

document.addEventListener('DOMContentLoaded', () => {
    
    //Extraer elementos del DOM
    let form = document.getElementById('form');
    let formName = document.getElementById('name');
    let formPass = document.getElementById('password');
    let alerta = document.createElement('DIV');

    //Agregando contenido a la alerta
    alerta.innerHTML = `<p>
                            Complete los campos correspondientes
                        </P>`

    
    //Agregando evento y preveniento que inicie antes de terminar el codigo
    form.addEventListener('submit', event => {
        event.preventDefault();

        //Extraer el valor de los elementos
        let name = formName.value;
        let password = formPass.value;

        //Funcion para crear un creador de objetos
        function DatosUsuario(name, password){

            this.name = name;
            this.password = password;
    
        };
        
        //Instanciando un objeto
        const DatosUsuario1 = new DatosUsuario(name, password);
        
        //Guardando el objeto en un sessionstorage
        sessionStorage.setItem("usuarios", JSON.stringify(DatosUsuario1));

        //Validando inicio de sesion
        if(DatosUsuario1.name === '' && DatosUsuario1.password === '') {

            form.appendChild(alerta);

            setTimeout(() => {
                alerta.remove()
            }, 3000);
            

        } else if( DatosUsuario1.name === '' || DatosUsuario1.password === ''){

            form.appendChild(alerta);

            setTimeout(() => {
                alerta.remove()
            }, 3000);

        } else {
            
            //Envio hacia la otra pagina
            return window.location = "tienda.html";
        };

    });

});