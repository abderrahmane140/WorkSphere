const openBtn = document.querySelector('#opneBtn');
const closeBtn = document.querySelector('#closeBtn');
const model = document.querySelector('#modal');
const form = document.querySelector('#form');

const workers = [];


let id = 0


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


//rooms
const rooms = [
{id:'conference',name:'Conference Room',capacity:4,allowedRoles:null},
{id:'reception',name:'Reception',capacity:2,allowedRoles:['Receptionist']},
{id:'server',name:'Server Room',capacity:2,allowedRoles:['IT Technician']},
{id:'security',name:'Security Room',capacity:2,allowedRoles:['Security Agent']},
{id:'staff',name:'Staff Room',capacity:6,allowedRoles:null},
{id:'archives',name:'Archives Room',capacity:2,allowedRoles:[] }
];

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
    const unsignedworkerOnly = workers.filter(worker => worker.assignedZone == null)
    // if(unsignedWorkerModel > 0){
    //     document.querySelector('.title-UnassignedStaff').textContent = 'Unassigned Staff'
    // }
    unsignedworkerOnly.forEach(Worker => {
        const div = document.createElement('div');

        div.innerHTML = `
        <div class="flex justify-between items-center rounded-md border-1 p-3 mb-4">
            <span>${Worker.name}</span>
            <img src=${Worker.image} alt="image" class="w-10 h-10 rounded-full">
            <i id="removeUnsingbtn" class="fa-solid fa-xmark cursor-pointer"></i>
        </div>
        `;
        UnassignedStaffContainer.appendChild(div);
        div.addEventListener("click", () => displayWorker(Worker));
        div.querySelector('#removeUnsingbtn').addEventListener('click',(e)=>{
            e.stopPropagation()
            div.remove()
        })
        workers.filter(e => e.id != Worker.id)
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
        id += 1;
        const newWorker = {
            id:id,
            name: fullName.value,
            role: role.value,
            image: image.value,
            email: email.value,
            phone: phone.value,
            assignedZone:null,
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



//display the unsignedWorker


const unsignedWorkerModel = (zoon) => {
    const div = document.createElement('div')
    const unsignWor = workers.filter(worker => worker.assignedZone == null)
    div.innerHTML = `
    <section class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 displayWorker" >
        <div class="w-full sm:max-w-md modal-card bg-white rounded-2xl p-6 shadow-2xl mx-4">
        <div class="flex justify-end">
        <button id="closeunsingBtn" class="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
        </div>
        ${unsignWor.map(e => {
            return `
            <div onclick="addWorkerToRoom('${e.id}', '${zoon}')"  class="flex justify-between items-center rounded-md border-1 p-3 mb-4">
                <div>
                    <span>${e.name}</span>
                    <span class="p-1 rounded-md bg-green-500 text-white">${e.role}</span>
                </div>

                <img src=${e.image} alt="image" class="w-10 h-10 rounded-full">
            </div>
            `
        })}
        </div>
    </section>
    
    `
    
    document.body.appendChild(div)
    div.querySelector("#closeunsingBtn").addEventListener('click', () =>{
        div.remove()
    })
}



const roomBtns = document.querySelectorAll('.roomBtn')
roomBtns.forEach(roomBtn =>{
    roomBtn.addEventListener('click', (e)=> {
        const zoon = e.currentTarget.dataset.zone
        unsignedWorkerModel(zoon)
    })
})

const isRoolAllowed = (role, room) =>{
    if(role  == 'Manager') return true;
    if(role == 'Cleaning') return room.id != 'archives'
    if(Array.isArray(room.allowedRoles)){
        return room.allowedRoles.length > 0 && room.allowedRoles.includes(role)
    }

    return true
}

const addWorkerToRoom =  (id, zoon) =>{
    const workedId = Number(id)
    const worker= workers.find(e => e.id == workedId)
    const room = rooms.find(e => e.id == zoon)


    if(!worker || !room) return console.warn('worker or room not found')
       
        
    //check the capacity
    const occupants =  workers.filter(w => w.assignedZone ==  room.id ).length
    if(room.capacity <= occupants){
        alert(`the ${room.name} is Full`)
        console.log('true')
        return
    }

    if(!isRoolAllowed(worker.role, room)){
        alert(`${worker.role} is not allowed in ${room.name}.`);
        return
    }

    worker.assignedZone = zoon

    randerUnassignedStaff()

    const model = document.querySelector('.displayWorker')
    if(model) model.remove()


    renderWorkersInRooms()

}

const renderWorkersInRooms = () =>{
    rooms.forEach(room => {

        const container = document.querySelector(`.zone[data-zone="${room.id}"] .occupants`)
        if (!container) return;


        container.innerHTML = '';


        const assignedWorkers= workers.filter(w => w.assignedZone === room.id)
        
        assignedWorkers.forEach(worker =>{
            const div = document.createElement('div')
            div.className = 'worker-card flex items-center gap-2 p-1 mb-1 border rounded cursor-pointer'
            div.innerHTML = `
             <img src="${worker.image}" alt="${worker.name}" class="w-8 h-8 rounded-full">
                <span>${worker.name}</span>
                <i onclick="removeWorkerFrZoon('${worker.id}')" class="fa-solid fa-xmark"></i>
            `

            //div.addEventListener('click' , () => displayWorker(worker))
            container.appendChild(div)
        })
    })

}


//remove the worker from the room
const removeWorkerFrZoon = (id) => {
    const workerId = Number(id)
    const worker = workers.find(e => e.id == workerId)
    worker.assignedZone = null
    randerUnassignedStaff()
    renderWorkersInRooms()
}
