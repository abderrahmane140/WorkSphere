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


//rooms
const rooms = [
    {id:'conference',name:'Conference Room',capacity:4,allowedRoles:['Manager','Cleaning']},
    {id:'reception',name:'Reception',capacity:2,allowedRoles:['Receptionist','Manager','Cleaning']},
    {id:'server',name:'Server Room',capacity:2,allowedRoles:['IT Technician','Manager','Cleaning']},
    {id:'security',name:'Security Room',capacity:2,allowedRoles:['Security Agent','Manager','Cleaning']},
    {id:'staff',name:'Staff Room',capacity:6,allowedRoles:['Receptionist','IT Technician','Security Agent','Manager','Cleaning']},
    {id:'archives',name:'Archives Room',capacity:2,allowedRoles:['Manager'] }
];

const saveToLocalStorage = () => {
    localStorage.setItem('workers', JSON.stringify(workers));
};

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


    unsignedworkerOnly.forEach(Worker => {
        const div = document.createElement('div');

        div.innerHTML = `
                <div class="flex justify-between items-center rounded-xl p-3 mb-4 bg-white shadow-sm hover:shadow-md transition cursor-pointer">
                    <span class="flex-1 font-medium text-gray-700 truncate">${Worker.name}</span>

                    <img src="${Worker.image}" 
                        alt="image" 
                        class="w-11 h-11 rounded-full  object-cover shadow-sm mx-3">

                    <i id="removeUnsingbtn" 
                    class="fa-solid fa-xmark text-gray-500 hover:text-red-500 text-lg transition cursor-pointer"></i>
                </div>
        `;
        UnassignedStaffContainer.appendChild(div);
        div.addEventListener("click", () => displayWorker(Worker));
        div.querySelector('#removeUnsingbtn').addEventListener('click',(e)=>{
            e.stopPropagation()
            div.remove()
            removeWorkerhandler(Worker.id)  
            console.log(workers)
        })
    });
};


const removeWorkerhandler = (id) => {
    workerId = Number(id)
    const index = workers.findIndex(e => e.id == workerId)

    workers.splice(index, 1)
    saveToLocalStorage()

}

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
            id: Date.now(),
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
        saveToLocalStorage()
        closeModel()
    }
};

//submit the form 
form.addEventListener('submit', validate);



const displayWorker = (worker) => {
    const div = document.createElement('div')
    div.innerHTML = `  
    <section
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 displayWorker"
        role="dialog"
        aria-modal="true"
        aria-labelledby="worker-name"
    >
        <div
            class="w-full  max-w-lg mx-4 rounded-2xl bg-white overflow-hidden shadow-2xl transform transition-all scale-100"
            role="document"
        >
        
        <div class="relative h-36 sm:h-44 bg-gradient-to-r from-sky-500 to-indigo-600">

        <button
            id="closeDisplayBtn"
            class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-slate-700 cursor-pointer shadow-sm transition"
            aria-label="Close profile"
        >
            &times;
        </button>

        <!-- Profile avatar -->
        <div class="absolute left-1/2 transform -translate-x-1/2 bottom-[-44px]">
            <img
            src="${worker.image}"
            alt="${worker.name}"
            class="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
        </div>
        </div>

            <!-- Content -->
            <div class="pt-14 pb-6 px-6 sm:px-8">
            <!-- Name + role -->
            <div class="text-center">
                <h2 id="worker-name" class="text-lg sm:text-xl font-semibold text-gray-800">
                ${worker.name}
                </h2>
                <p class="mt-1 text-sm text-gray-500">${worker.role || '—'}</p>
            </div>

            <!-- Contact -->
            <div class="mt-4 grid grid-cols-2 gap-3">
                <div class="bg-neutral-100 p-3 rounded-lg">
                    <p class="text-xs text-gray-500">Email</p>
                    <p class="text-sm text-gray-700 truncate">${worker.email || '—'}</p>
                </div>
                <div class="bg-neutral-100 p-3 rounded-lg">
                    <p class="text-xs text-gray-500">Phone</p>
                    <p class="text-sm text-gray-700">${worker.phone || '—'}</p>
                </div>
            </div>

            <!-- Experience Section -->
            <div class="mt-6 border-t pt-4">
                <h3 class="text-sm font-medium text-gray-700 mb-3">Experience</h3>

                <div class="space-y-3">
                ${
                    worker.experiences && worker.experiences.length
                    ? worker.experiences.map(exp => `
                        <div class="bg-white p-3 rounded-lg shadow-sm border">
                        <div class="flex justify-between items-start">
                            <div>
                            <p class="text-sm font-semibold text-gray-800">${exp.experienceRole || 'Role'}</p>
                            <p class="text-xs text-gray-500">${exp.companyName || 'Company'}</p>
                            </div>
                            <div class="text-right text-xs text-gray-500">
                            <p>${exp.startDate || '—'}</p>
                            <p>${exp.endDate || 'Present'}</p>
                            </div>
                        </div>
                        </div>
                    `).join('')
                    : `<p class="text-sm text-gray-500">No experience listed.</p>`
                }
                </div>
            </div>
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
        <section class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 displayWorker">
        <div class="w-full sm:max-w-md mx-4 rounded-2xl bg-white shadow-2xl overflow-hidden">
            
            <div class="flex justify-end p-4 border-b">
            <button id="closeunsingBtn" 
                    class="text-slate-400 hover:text-slate-600 text-2xl transition"
                    aria-label="Close unassigned workers">
                &times;
            </button>
            </div>

            <div class="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
            ${unsignWor && unsignWor.length ?
                unsignWor.map(e => `
                <div onclick="addWorkerToRoom('${e.id}', '${zoon}')"
                    class="flex justify-between items-center rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition cursor-pointer bg-white">
                    
                <div class="flex flex-col">
                    <span class="font-medium text-gray-800">${e.name}</span>
                    <span class="mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-md bg-green-500 text-white">
                    ${e.role}
                    </span>
                </div>

                <img src="${e.image}" alt="${e.name}" class="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm">
                </div>
            `).join('')
            : `<p>no worker to sing </p>`}
            </div>

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

const addWorkerToRoom =  (id, zoon) => {
    const workedId = Number(id);
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
    saveToLocalStorage()

}

const renderWorkersInRooms = () =>{
    rooms.forEach(room => {

        const container = document.querySelector(`.zone[data-zone="${room.id}"] .occupants`)
        if (!container) return;


        container.innerHTML = '';


        const assignedWorkers= workers.filter(w => w.assignedZone === room.id)
        
        assignedWorkers.forEach(worker =>{
            const div = document.createElement('div')
            div.className = 'worker-card flex items-center gap-2 p-1 mb-1 bg-white text-sm text-black rounded-full cursor-pointer'
            div.innerHTML = `
                <div class="relative inline-block m-1">

                <img src="${worker.image}" 
                    alt="${worker.name}" 
                    class="w-10 h-10 rounded-full object-cover border-2 border-gray-200 shadow-sm">


                <button onclick="removeWorkerFrZoon('${worker.id}')"
                        class="absolute -top-2 -right-2 w-6 h-6 flex items-center cursor-pointer justify-center bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
                        aria-label="Remove worker">
                    <i class="fa-solid fa-xmark text-xs"></i>
                </button>
                </div>
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
    saveToLocalStorage()
}


// Load workers from localStorage when page loads
const loadFromLocalStorage = () => {
    const storedWorkers = localStorage.getItem('workers');
    if (storedWorkers) {
        const parsedWorkers = JSON.parse(storedWorkers);
        workers.push(...parsedWorkers); 
    }
    randerUnassignedStaff();
    renderWorkersInRooms();
};


loadFromLocalStorage();

