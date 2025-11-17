const openBtn = document.querySelector('#opneBtn')
const closeBtn = document.querySelector('#closeBtn')
const model = document.querySelector('#modal')
const form = document.querySelector('#form')

const worker = []

//form data
const fullName = document.getElementById('fullName')
const role = document.querySelector('#role')
const image = document.querySelector('#img')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')

const startDate = document.querySelector('#start-date')
const endDate = document.querySelector('#end-date')
const compnayName = document.querySelector('#compnay-name')
const expRole = document.querySelector('#experience-role')


//errors

const fullNameError = document.getElementById('fullNameError')
const roleError = document.getElementById('roleError')
const emailError = document.getElementById('emailError')
const phoneError = document.getElementById('phoneError')


//exp 

const expBtn = document.getElementById('addExp')

    
//opne the model
const openModel = () => {
    model.classList.remove('hidden')
    model.classList.add('flex')
}

//close model
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


//form validation 

function showError(element, message){
    element.textContent = message;
    element.style.display = 'block'
}

function hideError(element){
    element.textContent = "";
    element.style.display = 'none'
}

function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validate = (e) => {
    e.preventDefault()
    let isValide = true;

    //name
    if(fullName.value.trim() == "") {
        showError(fullNameError, "Name can't be empty")
        isValide = false;
    }else if (fullName.value.length < 8){
        showError(fullNameError, "name must be at least 8 character")
        isValide = false
    }else{
        hideError(fullNameError)
    }

    //role
    if(role.value.trim() == "") {
        showError(roleError, "the Role can't be empty")
        isValide = false;
    }else{
        hideError(role)
    }

    //email
    if(email.value.trim() == ""){
        showError(emailError, "Email cannot be empth")
        isValide = false
    }else if(!validateEmail(email.value)){
        showError(emailError, "Enter a valide email")
    }else{
        hideError(emailError)
    }

    //phone
    if(phone.value.trim() == ""){
        showError(phoneError, "Phone number cannot be empty.")
        isValide = false
    }else if(!/^[+]?[0-9\s-]{6,15}$/.test(phone.value)){
        showError(phoneError, "Enter a valide number")
        isValide = false
    }else{
        hideError(phoneError)
    }

    if(isValide){
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

        randerUnassignedStaff()
    }
}


//submit the form 
form.addEventListener('submit', validate);
