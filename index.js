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

    experiences.forEach(e => {
        if(!e.classList.contains('hidden')){
            e.classList.add('hidden')
        }
    })


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

    // Remove experience form when clicked
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

        div.innerHTML = `
        <div class="flex justify-between items-center rounded-md border-1 p-3 mb-4">
            <span>${Worker.name}</span>
            <img src=${Worker.image} alt="image" class="w-10 h-10 rounded-full">
        </div>
        `;
        UnassignedStaffContainer.appendChild(div);
        div.addEventListener("click", () => displayWorker(Worker));
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

//validation for the date
const validateDates = (startDate, endDate) => {

    if(!startDate || !endDate){
        return "both start date and end date must be provided."
    }

    const start = new Date(startDate)
    const end = new Date(endDate)


    if(start >= end){
        return "start date must be before end date"
    }

    return null;
}

const validate = (e) => {
    e.preventDefault();
    let isValid = true; 

    // Validate name
    if (fullName.value.trim() === "") {
        showError(fullNameError, "Name can't be empty");
        isValid = false;
    } else if (fullName.value.length < 8) {
        showError(fullNameError, "Name must be at least 8 characters");
        isValid = false;
    } else {
        hideError(fullNameError);
    }

    // Validate role
    if (role.value.trim() === "") {
        showError(roleError, "The Role can't be empty");
        isValid = false;
    } else {
        hideError(roleError);
    }

    // Validate email
    if (email.value.trim() === "") {
        showError(emailError, "Email cannot be empty");
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(emailError, "Enter a valid email");
        isValid = false;
    } else {
        hideError(emailError);
    }

    // Validate phone number
    if (phone.value.trim() === "") {
        showError(phoneError, "Phone number cannot be empty");
        isValid = false;
    } else if (!/^[+]?[0-9\s-]{6,15}$/.test(phone.value)) {
        showError(phoneError, "Enter a valid number");
        isValid = false;
    } else {
        hideError(phoneError);
    }

    // Validate experiences
    for (const expDiv of experiences) {
        const startDate = expDiv.querySelector('.start-date').value;
        const endDate = expDiv.querySelector('.end-date').value;

        const dataError = validateDates(startDate, endDate);
        if (dataError) {
            alert(dataError);
            isValid = false;
            break; 
        }


        const companyName = expDiv.querySelector('.company-name').value;
        const experienceRole = expDiv.querySelector('.experience-role').value;

        if (companyName.trim() === "" || experienceRole.trim() === "") {
            alert("Company name and experience role must be filled out.");
            isValid = false;
            break;
        }
    }


    if (isValid) {
        const newWorker = {
            name: fullName.value,
            role: role.value,
            image: image.value,
            email: email.value,
            phone: phone.value,
            experiences: []
        };

        // Save experiences
        for(const expDiv of experiences){
            const startDate = expDiv.querySelector('.start-date').value;
            const endDate = expDiv.querySelector('.end-date').value;
            const companyName = expDiv.querySelector('.company-name').value;
            const experienceRole = expDiv.querySelector('.experience-role').value


            if(startDate && endDate && companyName && experienceRole){
                const expData = {startDate, endDate, companyName, experienceRole}
                newWorker.experiences.push(expData)
            }
        }


        workers.push(newWorker);
        console.log(workers);
        randerUnassignedStaff();
    }
};

//submit the form 
form.addEventListener('submit', validate);



const displayWorker = (worker) => {
    const div = document.createElement('div')
    div.innerHTML = `  
    <section class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 displayWorker" >
        <div class="w-full sm:max-w-md modal-card bg-white rounded-2xl p-6 shadow-2xl mx-4">
            <div class="flex justify-end">
                <button id="closeDisplayBtn" class="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div class="flex items-center justify-center">
                <img  
                class="w-30 h-30 rounded-full" 
                src="${worker.image}" 
                alt="${worker.name}">
            </div>
            <div class="mt-4 flex justify-between bg-neutral-100 p-2 rounded-sm">
                <span>Name</span>
                <p>${worker.name}</p>
            </div>
            <div class="mt-4 flex justify-between bg-neutral-100 p-2 rounded-sm">
                <span>Role</span>
                <p>${worker.role}</p>
            </div>
            <div class="mt-4 flex justify-between bg-neutral-100 p-2 rounded-sm">
                <span>Email</span>
                <p>${worker.email}</p>
            </div>
            <div class="mt-4 flex justify-between bg-neutral-100 p-2 rounded-sm">
                <span>Phone</span>
                <p>${worker.phone}</p>
            </div>
            <div class="mt-4 flex flex-col justify-between p-2 rounded-sm">
                <span>Experience</span>
                ${worker.experiences.map(exp =>{
                    return `
                        <div class="pl-4 mb-3 border-l-2 border-gray-300">
                        <p><strong>Start date:</strong> ${exp.startDate}</p>
                        <p><strong>End date:</strong> ${exp.endDate}</p>
                        <p><strong>Company Name:</strong> ${exp.companyName}</p>
                        <p><strong>Role:</strong> ${exp.experienceRole}</p>
                    </div>
                    `
                })}
            </div>
        </div>
    </section>
    `;
    document.body.appendChild(div);

    div.querySelector("#closeDisplayBtn").addEventListener('click', () =>{
        div.remove()
    })
};
