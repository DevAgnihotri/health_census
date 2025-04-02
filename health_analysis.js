const addpatientbtn = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById("btnSearch");

const patients = [];

function addPatient() {
    const name = document.getElementById("name");
    const age = document.getElementById("Age");
    const gender = document.querySelector('input[name="gender"]:checked');
    console.log(gender); // for debugging
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

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv = '';

    fetch('health_analysis.JSON')
        .then(response => response.JSON)
        .then(data => {
            const condition = data.conditions.find(item => item.name.toLowerCase === input);

            if(condition)
            {
                const symptoms = condition.symtoms.join(', ');
                const prevention = condition.prevention.join(', ');
                const treatment = condition.treatment;

                resultDiv.innerHTML += `<h2>${condition}</h2>`;
                resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="condimg">`

                resultDiv.innerHTML += `<p><strong>Symptoms:</strong>${symptoms}</p>`
                resultDiv.innerHTML += `<p><strong>Prevention:</strong>${prevention}</p>`
                resultDiv.innerHTML += `<p><strong>Treatment:</strong>${treatment}</p>`
            }
            else {
                resultDiv.innerText = "Conditon Not Found.";
            }
        })
        .catch(error => {
            console.error("Error:",error);
            resultDiv.innerText = "An error occured in fetching data.";
        });
}

btnSearch.addEventListener('click',searchCondition);


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