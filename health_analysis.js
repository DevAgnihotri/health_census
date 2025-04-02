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