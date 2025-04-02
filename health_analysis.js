const addpatientbtn = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById("btnSearch");

const patients = [];

function addPatient() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    //console.log(gender); // for debugging
    const condition = document.getElementById("condition").value;

    if(name && age && gender && condition) {
        patients.push({name,age,gender: gender.value,condition});
        resetForm();
        generateReport();
        //console.log("Value of Name:",document.getElementById("name").value);
    }
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("condition").value = "";
}

function searchCondition() {
    const input = document.getElementById('conditionInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('health_analysis.JSON')
        .then(response => response.json())
        .then(data => {
            const condition = data.conditions.find(item => item.name === input);

            if(condition)
            {
                const symptoms = condition.symptoms.join(', ');
                const prevention = condition.prevention.join(', ');
                const treatment = condition.treatment;

                resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
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

    for (const patient of patients) {
        if (conditionsCount[patient.condition] !== undefined) {
            conditionsCount[patient.condition]++;
        } else {
            console.warn(`Unexpected condition: ${patient.condition}`);
        }

        if (
            genderConditionsCount[patient.gender] &&
            genderConditionsCount[patient.gender][patient.condition] !== undefined
        ) {
            genderConditionsCount[patient.gender][patient.condition]++;
        } else {
            console.warn(
                `Unexpected condition or gender: ${patient.condition}, ${patient.gender}`
            );
        }
    }

    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Condition Breakdown:<br>`;
    for (const condition in conditionsCount) {
        report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    report.innerHTML += `Gender Based Conditions<br>`;
    for (const gender in genderConditionsCount) {
        report.innerHTML += `<br><br>${gender}<br><br>`;
        for (const condition in genderConditionsCount[gender]) {
            report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
        }
    }
}

addpatientbtn.addEventListener("click",addPatient);