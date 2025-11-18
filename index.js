const openBtn = document.querySelector('#opneBtn');
const closeBtn = document.querySelector('#closeBtn');
const model = document.querySelector('#modal');
const form = document.querySelector('#form');

const workers = [];

//form data
const fullName = document.getElementById('fullName');
const role = document.querySelector('#role');
const image = document.querySelector('#img');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');

//errors
const fullNameError = document.getElementById('fullNameError');
const roleError = document.getElementById('roleError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');

//exp 
const expBtn = document.getElementById('addExp');
const experienceContainer = document.getElementById('experience');

let experiences = [];

//open the modal
const openModel = () => {
    model.classList.remove('hidden');
    model.classList.add('flex');
};

//close the modal
const closeModel = () => {
    model.classList.remove('flex');
    model.classList.add('hidden');
};

openBtn.addEventListener('click', openModel);
closeBtn.addEventListener('click', closeModel);

//display the image 
const imgInput = document.getElementById('img');
const profileImg = document.getElementById('profile');

document.querySelector('#img').addEventListener('input', () => {
    profileImg.src = image.value;
});

//render the experience
expBtn.addEventListener('click', () => {

    experiences.forEach(expDiv => {
        if (!expDiv.classList.contains('collapsed')) {
            const companyName = expDiv.querySelector('.company-name').value || "No Company Name";

            // Save the data on the div before collapsing
            const expData = {
                startDate: expDiv.querySelector('.start-date').value,
                endDate: expDiv.querySelector('.end-date').value,
                companyName,
                experienceRole: expDiv.querySelector('.experience-role').value,
            };

            // Replace inner HTML with collapsed ticket view
            expDiv.innerHTML = `
                <span>${companyName}</span>
                <button type="button" class="removeExpBtn">X</button>
            `;
            expDiv.classList.add('collapsed');

            // Save the experience data in the div itself
            expDiv.dataset.experience = JSON.stringify(expData);

            // Add remove functionality for collapsed ticket
            expDiv.querySelector('.removeExpBtn').addEventListener('click', (e) => {
                e.stopPropagation();
                expDiv.remove();
                experiences = experiences.filter(exp => exp !== expDiv);
            });
        }
    });

    // Create new experience form
    const experienceDiv = document.createElement('div');
    experienceDiv.classList.add('experience-item');
    experienceDiv.innerHTML = `
        <label>Start date</label>
        <input class="w-full rounded border border-slate-100 px-3 py-2 mb-2 start-date" type="date">
        <label>End date</label>
        <input class="w-full rounded border border-slate-100 px-3 py-2 mb-2 end-date" type="date">
        <div class="flex gap-2">
            <input class="w-full rounded border border-slate-100 px-3 py-2 mb-2 company-name" type="text" placeholder="Company name">
            <input class="w-full rounded border border-slate-100 px-3 py-2 mb-2 experience-role" type="text" placeholder="Role">
        </div>
        <button type="button" class="removeExpBtn p-2 bg-red-500 w-full rounded-md text-white font-bold">Remove</button>
    `;

    // Remove experience form
    experienceDiv.querySelector('.removeExpBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        experienceDiv.remove();
        experiences = experiences.filter(exp => exp !== experienceDiv);
    });

    experienceContainer.appendChild(experienceDiv);
    experiences.push(experienceDiv);
});

//render the card of the worker top of the button 
const randerUnassignedStaff = () => {
    const UnassignedStaffContainer = document.getElementById('UnassignedStaff');
    UnassignedStaffContainer.innerHTML = '';
    workers.forEach(Worker => {
        const div = document.createElement('div');
        div.classList = 'flex justify-between items-center rounded-md border-1 p-3 mb-4';
        div.innerHTML = `
            <span>${Worker.name}</span>
            <img src=${Worker.image} alt ="image" class="w-10 h-10 rounded-full">
        `;
        UnassignedStaffContainer.appendChild(div);
    });
};

//form validation 
function showError(element, message){
    element.textContent = message;
    element.style.display = 'block';
}

function hideError(element){
    element.textContent = "";
    element.style.display = 'none';
}

function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const validate = (e) => {
    e.preventDefault();
    let isValide = true;

    //name validation
    if(fullName.value.trim() == "") {
        showError(fullNameError, "Name can't be empty");
        isValide = false;
    }else if (fullName.value.length < 8){
        showError(fullNameError, "Name must be at least 8 characters");
        isValide = false;
    }else{
        hideError(fullNameError);
    }

    //role validation
    if(role.value.trim() == "") {
        showError(roleError, "The Role can't be empty");
        isValide = false;
    }else{
        hideError(role);
    }

    //email validation
    if(email.value.trim() == ""){
        showError(emailError, "Email cannot be empty");
        isValide = false;
    }else if(!validateEmail(email.value)){
        showError(emailError, "Enter a valid email");
    }else{
        hideError(emailError);
    }

    //phone validation
    if(phone.value.trim() == ""){
        showError(phoneError, "Phone number cannot be empty");
        isValide = false;
    }else if(!/^[+]?[0-9\s-]{6,15}$/.test(phone.value)){
        showError(phoneError, "Enter a valid number");
        isValide = false;
    }else{
        hideError(phoneError);
    }

    if(isValide){

        const newWorker = {
            name: fullName.value,
            role: role.value,
            image : image.value,
            email: email.value,
            phone: phone.value,
            experiences: []
        };

        experiences.forEach(expDiv => {

            if (expDiv.classList.contains('collapsed')) {
                const expData = JSON.parse(expDiv.dataset.experience); 
                newWorker.experiences.push(expData);
            } else {
                const startDate = expDiv.querySelector('.start-date').value;
                const endDate = expDiv.querySelector('.end-date').value;
                const companyName = expDiv.querySelector('.company-name').value;
                const experienceRole = expDiv.querySelector('.experience-role').value;

                if(startDate && endDate && companyName && experienceRole){
                    const expData = { startDate, endDate, companyName, experienceRole };
                    newWorker.experiences.push(expData);
                    expDiv.dataset.experience = JSON.stringify(expData); 
                }
            }
        });

        workers.push(newWorker);

        console.log(workers);
        
        randerUnassignedStaff();
    }
};

//submit the form 
form.addEventListener('submit', validate);
