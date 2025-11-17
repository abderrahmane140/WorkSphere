const openBtn = document.querySelector('#opneBtn')
const closeBtn = document.querySelector('#closeBtn')
const model = document.querySelector('#modal')
const form = document.querySelector('#form')

const worker = []

//form data
const fullName = document.getElementById('name')
const role = document.querySelector('#role')
const image = document.querySelector('#img')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')

const startDate = document.querySelector('#start-date')
const endDate = document.querySelector('#end-date')
const compnayName = document.querySelector('#compnay-name')
const expRole = document.querySelector('#experience-role')


 


    

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



const imgInput = document.getElementById('img');
const profileImg = document.getElementById('profile');

document.querySelector('#img').addEventListener('input', () => {
    profileImg.src = image.value;
});

//submit the form 
form.addEventListener('submit' , (e) =>{
    e.preventDefault()

    worker.push(
        {
            name: fullName.value,
            role: role.value,
            image : image.value,
            email: email.value,
            phone: phone.value,
            startDate: startDate.value,
            endDate: endDate.value,
            compnayName: compnayName.value,
            experienceRole: expRole.value
        }
    )

    console.log(worker);
    randerUnassignedStaff()
    
})




const randerUnassignedStaff = () => {
    if(worker.length > 0){
        
        worker.forEach(e => {
            const div = document.createElement('div')
            div.classList = 'flex justify-between items-center rounded-md border-1 p-3 mb-4'
            div.innerHTML =`
                <span>${e.name}</span>
                <img src=${e.image} alt ="image" class="w-10 h-10 rounded-full">
            `
            document.getElementById('UnassignedStaff').appendChild(div)
        })
    }
}