document.addEventListener('DOMContentLoaded', () => {
    
    let form = document.getElementById('form');
    let formName = document.getElementById('name');
    let formPass = document.getElementById('password');
    let alerta = document.createElement('DIV');

    alerta.innerHTML = `<p>
                            Complete los campos correspondientes
                        </P>`

    form.addEventListener('submit', event => {
        event.preventDefault();

        let name = formName.value;
        let password = formPass.value;

        function DatosUsuario(name, password){

            this.name = name;
            this.password = password;
    
        };
    
        const DatosUsuario1 = new DatosUsuario(name, password);
        
        sessionStorage.setItem("usuarios", JSON.stringify(DatosUsuario1));

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
            
            return window.location = "tienda.html";
        };

    });

});