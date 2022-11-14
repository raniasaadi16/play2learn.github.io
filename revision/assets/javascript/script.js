/**Dropdown */
const dropdownBtn = document.querySelector('.dropbtn')// dropdown btn
const dropdownContent = document.querySelector('.dropdown-content')// dropdown btn

dropdownBtn.addEventListener('click', function(){
    if(dropdownContent.style.display === 'block'){
        dropdownContent.style.display='none'
    }else{
        dropdownContent.style.display='block'
    }
})

/**for make a responsive navbar */
const btn = document.querySelector('nav .btn-m')
btn.addEventListener('click', function(){
    document.querySelector('nav ul').classList.toggle('show')
})


/**for testimonials slide*/
if( document.querySelector('.reviews')){
    const reviewsSlide = document.querySelector('.reviews')
    const reviewsArray = document.querySelectorAll('.review')
    
    let counter = 0
    const size = reviewsArray[0].clientWidth
    
    function nextSlide(){
        reviewsSlide.style.transition = "transform 0.4s ease-in-out"
        counter = counter + 1
        reviewsSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'   
    }
    reviewsSlide.addEventListener('transitionend', () => {
        if(reviewsArray[counter].id === 'first'){
            reviewsSlide.style.transition = 'none'
            counter = reviewsArray.length - 1 - counter
            reviewsSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'   
    
        }
    })
    var intervalId = window.setInterval(function(){
        nextSlide()
    }, 10000);

}

/**for submit forms */
if(document.querySelector('form')){
    const forms = document.querySelectorAll('form')
    forms.forEach(form => {
        form.addEventListener('submit', function(e){
            e.preventDefault()
            alert('Form submited')
            document.querySelectorAll('form input').forEach(input => {
                input.value =''
            }) 
            if(document.querySelector('form textarea')){
                document.querySelector('form textarea').value = ''
            }
        })
    })
}

/**for switch between login and register screens */
if(document.querySelector('.login')){
    const loginScreen = document.querySelector('.login')
    const registerScreen = document.querySelector('.register')
    const switchToRegister = document.querySelector('.login a')
    const switchToLogin = document.querySelector('.register a')
    
    switchToRegister.addEventListener('click', function(){
        loginScreen.style.display = 'none'
        registerScreen.style.display = 'block'
    })
    
    switchToLogin.addEventListener('click', function(){
        loginScreen.style.display = 'block'
        registerScreen.style.display = 'none'
    })
}




