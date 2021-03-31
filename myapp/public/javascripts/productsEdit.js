let qs = function (elemento) {
    return document.querySelector(elemento)
}

let $title = qs('#title')
    $titleError = qs('.title-error')
    $description = qs('#description')
    $descriptionError = qs('.description-error')
    $price = qs('#price')
    $priceError = qs('.price-error')


$title.addEventListener('blur', function () {
    switch (true) {
        case !$title.value.trim():
            $title.classList.add('is-invalid')
            $titleError.innerHTML = 'Este campo es obligatorio'
            break;
    
        default:
            $title.classList.remove('is-invalid')
            $title.classList.add('is-valid')
            $titleError.innerHTML = ''
            break;
    }
})
$description.addEventListener('blur', function () {
    switch (true) {
        case !$description.value.trim():
            $description.classList.add('is-invalid')
            $descriptionError.innerHTML = 'Este campo es obligatorio'
            break;
    
        default:
            $description.classList.remove('is-invalid')
            $description.classList.add('is-valid')
            $descriptionError.innerHTML = ''
            break;
    }
})
$price.addEventListener('blur', function () {
    switch (true) {
        case !$price.value.trim():
            $price.classList.add('is-invalid')
            $priceError.innerHTML = 'Este campo es obligatorio'
            break;
    
        default:
            $price.classList.remove('is-invalid')
            $price.classList.add('is-valid')
            $priceError.innerHTML = ''
            break;
    }
})