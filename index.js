//given table of objects
let users = [{
        id: 1,
        name: 'Kevin',
        surname: 'Durant',
        age: 30,
        retired: false,
        // city: "Poznań",  //to test
        // man: false
    },
    {
        id: 2,
        name: 'Chris',
        surname: 'Poul',
        age: 34,
        retired: false,
        // city: "Poznań",
        // man: false
    },
    {
        id: 3,
        name: 'Tracy',
        surname: 'McGrady',
        age: 40,
        retired: true,
        // city: "Poznań",
        // man: true
    },
    {
        id: 4,
        name: 'Allen',
        surname: 'Tverson',
        age: 44,
        retired: true,
        // city: "Poznań",
        // man: true
    }
]

//generate form
let objToForm = users[0];

function generateForm(objToForm) {
    for (let key in objToForm) {
        if (key != "id") {
            createForm(objToForm[key], key);
        }
    }
    var button = document.createElement("span");
    button.innerHTML = `<button type="submit" class="btn btn-outline-dark" id="MyButton2">Save changes</button>`;
    document.getElementById("MyForm").appendChild(button);
}
generateForm(objToForm);


//generate table Head
function generateTableHead(table, users) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of users) {
        let th = document.createElement("th"); //create empty th-s
        let text = document.createTextNode(key); // giving strings to th-s
        th.appendChild(text); //puting text to td-s
        row.appendChild(th); //we put th-s to row
    }
}

//generate Table
function generateTable(table, data) {
    for (let element of data) { //for every object
        let row = table.insertRow(); //we create row
        for (key in element) { //for every element in every object
            let cell = row.insertCell(); //we create cells
            if (element[key] === true) {
                element[key] = "yes";
            } else if (element[key] === false) {
                element[key] = "no";
            }
            let text = document.createTextNode(element[key]); //we create text 
            cell.appendChild(text); // put text to cells
        }
    }
}

let table = document.querySelector("table");
let data = Object.keys(users[0]); //this we putting in loop to th-s ["id", "name", "surname", "age", "retired"]
generateTable(table, users);
generateTableHead(table, data);



//editing row
//taking data to form
let rIndex;
for (let i = 1; i < table.rows.length; i++) {
    table.rows[i].addEventListener("click", function () {
        rIndex = this.rowIndex; //worth to remember:)
        console.log(rIndex);
        for (let i = 1; i < data.length; i++) {
            let dataValues = document.getElementById(data[i]);
            if (this.cells[i].innerHTML === "yes") {
                dataValues.checked = true;
                dataValues.value = "yes";
            } else if (this.cells[i].innerHTML === "no") {
                dataValues.checked = false;
                dataValues.value = "no";
            } else {
                dataValues.value = this.cells[i].innerHTML;
            }
        }
    });
}
//function returnig value from checkboxex
function checkes(ch) {
    if (ch.checked === true) {
        ch.value = "yes";
    } else if (ch.checked === false) {
        ch.value = "no";
    }
}

//returning editioned data to table
document.getElementById("MyButton2").addEventListener("click", editRow);

function editRow() {
    for (let i = 1; i < data.length; i++) {
        let dataI = document.getElementById(data[i]);
        if (dataI.value === "yes" || dataI.value === "no") {
            checkes(dataI);
            table.rows[rIndex].cells[i].innerHTML = dataI.value;
        } else {
            table.rows[rIndex].cells[i].innerHTML = dataI.value;
        }
    }
}



//function to create form
function createForm(key, keyName) {
    if ((typeof (key) === 'string')) {
        var textType = document.createElement("div");
        textType.className = "form-group";
        textType.innerHTML = ` <label for="exampleInputEmail1">${keyName}</label>
        <input type="text" class="form-control" id="${keyName}" placeholder="Enter ${keyName}">`;
        document.getElementById("MyForm").appendChild(textType);
    } else if (typeof (key) === "boolean") {
        var textType = document.createElement("div");
        textType.className = "form-group";
        textType.innerHTML = ` <input type="checkbox" class="form-check-input checkboxes" id="${keyName}"><label class="form-check-label" for="check" >${keyName}</label>`;
        document.getElementById("MyForm").appendChild(textType);
    } else if (typeof (key) === 'number') {
        var textType = document.createElement("div");
        textType.className = "form-group";
        textType.innerHTML = ` <label for="exampleInputPassword1">${keyName}</label>
        <input type="number" class="form-control" id="${keyName}" placeholder="${keyName}">`;
        document.getElementById("MyForm").appendChild(textType);
    }
}


document.getElementById("MyButton2").addEventListener("click", function (e) {
    e.preventDefault();
});