let qs = function (elemento) {
    return document.querySelector(elemento)
}

let $email = qs('#email'),
    $emailError = qs('.emailError')
    $emailConfirm = qs('#emailconfirm')
    $emailConfirmError = qs('.email-confirm-error')
    $pass = qs('#pass')
    $passError = qs('.pass-error')
    $passConfirm = qs('#passconfirm')
    $passConfirmError = qs('.confirm-pass-error')
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,

$email.addEventListener('blur', function () {
    console.log($email.value.trim())
    switch (true) {
        case !$email.value.trim():
            $email.classList.add('is-invalid')
            $emailError.innerHTML = 'Este campo es obligatorio'
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

$emailConfirm.addEventListener('blur', function () {
    switch (true) {
        case !$emailConfirm.value.trim():
            $emailConfirmError.innerHTML = 'No podés dejar este campo vacío.'
            $emailConfirm.classList.add('is-invalid')
            break;
        case $emailConfirm.value != $email.value:
            $emailConfirmError.innerHTML = 'Las contraseñas no coinciden';
            $emailConfirm.classList.add('is-invalid')
            break;
        default:
            $emailConfirm.classList.remove('is-invalid');
            $emailConfirm.classList.add('is-valid');
            $emailConfirmError.innerHTML = ''
            break;
    }
})
$pass.addEventListener('blur',function(){
    switch (true) {
        case !$pass.value.trim():
            $passError.innerHTML = 'Este campo no puede quedar vacío.'
            $pass.classList.add('is-invalid')
            break;
        case $pass.value.length < 6 || $pass.value.length > 14 :
            $passError.innerHTML = 'La contraseña debe tener entre 6 y 14 caracteres'
            $pass.classList.add('is-invalid')
            break;
        default:
            $pass.classList.remove('is-invalid');
            $pass.classList.add('is-valid');
            $passError.innerHTML = ''
            break;
    }
})
$passConfirm.addEventListener('blur',function(){
    switch (true) {
        case !$passConfirm.value.trim():
            $passConfirmError.innerHTML = 'Este campo no puede quedar vacío'
            $passConfirm.classList.add('is-invalid')
            break;
        case $passConfirm.value != $pass.value:
            $passConfirmError.innerHTML = 'Las contraseñas no coinciden'
            $passConfirm.classList.add('is-invalid')
            break;
        default:
            $passConfirm.classList.remove('is-invalid');
            $passConfirm.classList.add('is-valid');
            $passConfirmError.innerHTML = ''
            break;
    }
})