const addpatientbtn = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById("btnSearch");

const patients = [];

function addPatient() {
    const name = document.getElementById("name");
    const age = document.getElementById("Age");
    const gender = document.querySelector('input[name="gender"]:checked');
    console.log(gender);
    const condition = document.getElementById("condition");

    if(name && age && gender && condition) {
        patients.push({name,age,gender: gender.value,condition});
        resetForm();
        generateReport();
    }
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById('input[name="gender"]:checked').value = false;
    document.getElementById("condition").value = "";
}

function generateReport() {
    const numPatients = patients.length;
    const conditionsCount = {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
    };
    const genderConditionsCount = {
        Male: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
        Female: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
    };

    for(const patient of patients) {
        conditionsCount[patient.condition]++;
        genderConditionsCount[patient.gender][patient.condition]++;
    }

    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Condition Breakdown:<br>`;
    for(const condition in conditionsCount) {
        report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    report.innerHTML += `Gender Based Conditions`;
    for(const gender in genderConditionsCount) {
        report.innerHTML += `${gender}`;
        for(const condition in genderConditionsCount) {
            report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[condition]}<br>`;
        }
    }
}

addpatientbtn.addEventListener("click",addPatient);