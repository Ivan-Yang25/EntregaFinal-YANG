document.addEventListener('DOMContentLoaded', () => {
    
    let form = document.getElementById('form');
    let formName = document.getElementById('name');
    let formPass = document.getElementById('password');
    let alerta = document.createElement('DIV');

    form.appendChild(alerta);
    

    form.addEventListener('submit', event => {
        event.preventDefault();

        let name = formName.value;
        let password = formPass.value;

        console.log(password);

        function DatosUsuario(name, password){

            this.name = name;
            this.password = password;
    
        };
    
        const DatosUsuario1 = new DatosUsuario(name, password);

        if(DatosUsuario1.name === '' && DatosUsuario1.password === '') {

            alert('Complete el formulario');

        } else if( DatosUsuario1.name === '' || DatosUsuario1.password === ''){

            alert('Complete el formulario')
        } else {

            alerta.innerHTML = `<span>Formulario completado</span>`
        };
        
    });

    

    

    

})