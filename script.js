let taskList = [];
const entryElm = document.getElementById("entry");
const badElm = document.getElementById("bad");
const badHrElm = document.getElementById("badHr")
const totalHrElm = document.getElementById("totalHr");
const ttlHrPerWeek = 24 * 7;

const handleOnSubmit = (form) => {
    const newTask = new FormData(form);
    
    const obj = {
        id: randomStr(),
        task: newTask.get("task").trim(),
        hr: +newTask.get("hr"),
        type: "entry"
    };

    const ttlHrs = total();

    if (ttlHrs + obj.hr > ttlHrPerWeek) {
        return alert ("Sorry not enough time let to fit this task from week")
    }
    console.log(ttlHrs);
    console.log(ttlHrPerWeek);

    taskList.push(obj);
    // console.log(obj);
    displayEntryTask();
    displayBadTask();
}

const displayEntryTask = () => {
    let str = ``;

    const entryListOnly = taskList.filter((item) => item.type === 'entry');

    entryListOnly.map((item, i) => {
        str += `<tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}hr</td>
    <td class="text-end">
        <button 
        onclick="handleOnDelete('${item.id}')" 
        class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
        </button>
        <button 
        onclick="switchTask('${item.id}', 'bad')"
        class="btn btn-success">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    </td>
  </tr>`
    })

    entryElm.innerHTML = str;
    total();
}

const displayBadTask = () => {
    let str = ``;

    const badListOnly = taskList.filter((item) => item.type === "bad");

    badListOnly.map((item, i) => {
        str += `<tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}hr</td>
    <td class="text-end">
    <button 
        onclick="switchTask('${item.id}', 'entry')"
        class="btn btn-warning">
            <i class="fa-solid fa-chevron-left"></i>
        </button>    
    <button 
    onclick="handleOnDelete('${item.id}')"    
    class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
        </button>
        
    </td>
  </tr>`
    })

    const badTtl = badListOnly.reduce((acc, item) => acc + item.hr, 0);
    badHrElm.innerHTML = badTtl;
    
    badElm.innerHTML = str;
    
}

const randomStr = () => {
    const charLenth = 6
    const str = "qwertyuiopasdfghjklzxvbnmQWERTYUIOPASDFGHJKLZXCVBNM"

    let id = ""

    for (let i = 0; i < charLenth; i++) {
        const randNum = Math.round(Math.random() * (str.length - 1));
        id += str[randNum];
    }
    return id;

}

const switchTask = (id, type) => {
    taskList = taskList.map(item => {
        if (item.id === id) {
            return {
                ...item,
                type,
            }
        }
        return item;
    });

    displayEntryTask();
    displayBadTask();
    total();
    

    // console.log(id, type);

}

const handleOnDelete = (id) => {
    if (window.confirm("are you sure you want to delete?")) {
        taskList = taskList.filter((item) => item.id !== id);
        displayEntryTask();
        displayBadTask();
    }

};

const total = () => {
    const ttl = taskList.reduce((acc, item) => acc + item.hr, 0);

    totalHrElm.innerHTML = ttl;
    return ttl;
}
