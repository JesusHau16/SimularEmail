// Variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');

// EventListeners
eventListeners ();

function eventListeners () {
    // Inicio de la aplicacion y deshabilitar submit
    document.addEventListener('DOMContentLoaded', inicioApp);

    // campos del formulario
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);
    // Al precionar el boton enviar
    formularioEnviar.addEventListener('submit', enviarEmail);

    // Resetea el formulario
    resetBtn.addEventListener('click', resetearFormulario);
}

// Funciones

function inicioApp(){
    // Desahabilitar el envio
    btnEnviar.disabled = true;
}

// Valida que el campo tenga algo escrito
function validarCampo(){
    
    // Se valida la longitud del texto y que no este vacio
    validarLongitud(this);

    // Validar unicamente el email
    if(this.type === 'email'){
        validarEmail(this);
    }
    // Fin validar email

    let errores = document.querySelectorAll('.error');

    if(email.value !== '' && asunto.value !== '' && mensaje.value !== ''){
        if(errores.length === 0){
            btnEnviar.disabled = false;
        }
    }
}

// Enviar email
function enviarEmail(e){
    e.preventDefault();
    
    // spiner al precionar enviar
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';

    // gif que envia el email
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display ='block';

    // ocultar spinner y mostrar gif de enviado
    setTimeout(function(){
        spinnerGif.style.display = 'none';
        // agregamos el gif enviado al div loaders
        document.querySelector('#loaders').appendChild(enviado);

        setTimeout(function(){
            enviado.remove();
            enviado.style.display = 'none';
            const emailEnviado = document.createElement('h2');
            emailEnviado.innerText='Correo enviado Exitosamente';
            document.querySelector('#loaders').appendChild(emailEnviado);
            setTimeout(function(){
                formularioEnviar.reset();
                emailEnviado.remove();

            },1500);
        },3500);
    }, 3000);
}

// Verifica la longitud de los textos en los campos
function validarLongitud(campo){

    if(campo.value.length > 0){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

// Validar email
function validarEmail(campo){
    const mensaje = campo.value;
    if(mensaje.indexOf('@') !== -1){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

// Resetear formulario
function resetearFormulario(e){
    e.preventDefault();
    formularioEnviar.reset();
    btnEnviar.disabled=true;
}
