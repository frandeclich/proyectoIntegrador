let qs = function (elemento) {
    return document.querySelector(elemento)
}

let $email = qs('#email')
    $emailError = qs('.email-error')
    $pass = qs('#pass')
    $passError = qs('.pass-error')
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,

$email.addEventListener('blur', function () {
    switch (true) {
        case !$email.value.trim():
            $email.classList.add('is-invalid')
            $emailError.innerHTML = 'El campo email es obligatorio'
            break;
        case !regExEmail.test($email.value):
            $emailError.innerHTML = 'Debe ingresar un email válido';
            $email.classList.add('is-invalid')
            break
        default:
            $email.classList.remove('is-invalid');
            $email.classList.add('is-valid');
            $emailError.innerHTML = ''
            break;
    }
})

$pass.addEventListener('blur', function () {
    switch (true) {
        case !$pass.value.trim():
            $passError.innerHTML = 'El campo de la contraseña no puede quedar vacío.'
            $pass.classList.add('is-invalid')
            break;
    
        default:
            $pass.classList.remove('is-invalid');
            $pass.classList.add('is-valid');
            $passError.innerHTML = ''
            break;
    }
})