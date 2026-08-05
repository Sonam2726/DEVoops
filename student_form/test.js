const fs=reqired('fs');
let passed= true;
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

//TC-01 check script file exist
if(fs.existsSync("script.js")){
    console.log("script.js file exists");}
else{
    console.log("script.js file does not exist");
    passed=false;

}

//TC-01 check student file exist
if(fs.existsSync("student.json")){
    console.log("student.json file exists");}
else{
    console.log("student.json file does not exist");
    passed=false;

}

