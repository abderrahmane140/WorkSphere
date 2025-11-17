const openBtn = document.querySelector('#opneBtn')
const closeBtn = document.querySelector('#closeBtn')
const model = document.querySelector('#modal')

const openModel = () => {
    model.classList.remove('hidden')
    model.classList.add('flex')
}

const closeModel = () => {
    model.classList.remove('flex')
    model.classList.add('hidden')
}


openBtn.addEventListener('click' , openModel)
closeBtn.addEventListener('click' , closeModel)
