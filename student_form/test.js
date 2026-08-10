const fs=require('fs');
let passed= true;
const data = JSON.parse(fs.readFileSync("student.json", "utf8"));
console.log("Registration testing");
//TC-01 check html file exist
if(fs.existsSync("index.html")){
    console.log("index.html file exists");}
else{
    console.log("index.html file does not exist");
    passed=false;

}
//TC-02 check style file exist
if(fs.existsSync("style.css")){
    console.log("style.css file exists");}
else{
    console.log("style.css file does not exist");
    passed=false;

}

//TC-03 check script file exist
if(fs.existsSync("script.js")){
    console.log("script.js file exists");}
else{
    console.log("script.js file does not exist");
    passed=false;

}

//TC-04 check student file exist
if(fs.existsSync("student.json")){
    console.log("student.json file exists");}
else{
    console.log("student.json file does not exist");
    passed=false;

}
data.students.forEach((student) => {
//TC_05 name validation
if(student.name.trim()!== "" ){
    console.log(" Name Validation pass");
}
else{
    console.log("Name Validation fail");
    passed=false;
}

//TC-06Email validation 
if(student.email.includes("@") ){
    console.log(" Email Validation pass");
}
else{
    console.log("Email Validation fail");
    passed=false;
}

//TC=07 mobile validation
if(student.mobile.length=== 10 ){
    console.log(" Mobile Validation pass");
}
else{
    console.log("Mobile Validation fail");
    passed=false;
}

// TC-Branch validation
if(student.branch.trim()!== "" ){
    console.log(" Branch Validation pass");
}
else{
    console.log("Branch Validation fail");
    passed=false;
}


//TC=09 Password validation 
if(student.password.length>=6 ){
    console.log(" Password Validation pass");
}
else{
    console.log("Password Validation fail");
    passed=false;
}})

//Tc=10 Registration success
if (passed) {
    console.log("Registration success");
    process.exit(0);
} else {
    console.log("Registration failed");
    process.exit(1);
}



