let taskList = [];
const entryElm = document.getElementById("entry");
const badElm = document.getElementById("bad");

const handleOnSubmit = (form) => {
    const newTask = new FormData(form);

    const obj = {
        id: randomStr(),
        task: newTask.get("task").trim(),
        hr: newTask.get("hr"),
        type: "entry"
    };

    taskList.push(obj);
    // console.log(obj);
    displayEntryTask();
    displayBadTask();
}

const displayEntryTask = () => {
    let str = ``;

    const entryListOnly = taskList.filter((item) =>   item.type === 'entry');

    entryListOnly.map((item, i) => {
        str += `<tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}hr</td>
    <td class="text-end">
        <button 
        onclick="
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
            <i class="fa-solid fa-chevron-right"></i>
        </button>    
    <button 
        
    class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
        </button>
        
    </td>
  </tr>`
    })

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

    // console.log(id, type);

}

const handleOnDelete = (id) => {
    taskList = taskList.filter((item)=> item.id !== id);
    displayEntryTask();
    displayBadTask();
}