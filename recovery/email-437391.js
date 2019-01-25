const shell = require('node-powershell');
const async = require('async');
var fs = require('fs');
var os = require('os');
var colors = require('colors');
var jFile = `C:/Users/${os.userInfo().username}/Intouch/intouch-tools/main-Functions/recent-jobs/jobs.json`;
// const { spawn } = require('child_process');
// var exec = require('child_process').exec;
// var spawn = require("child_process").spawn, child;
// var child = spawn("powershell.exe",
//                   [`"C:\\Users\\${os.userInfo().username}\\Documents\\WindowsPowerShell\\Microsoft.PowerShell_profile.ps1 -jobId"` + ]);
var searchQ = process.argv[2];
var fileContents;
var matches = [];
var parsed;
var data;
// let ps = new PowerShell(`C:\\Users\\lovep\\Documents\\WindowsPowerShell\\Scripts\\New-Email.ps1 -jobId ${searchQ}`, {debug: true}, function(){
  // this.features.PowerShell.proc;
  // 'releaseWebpage'
//   return searchQ
//   console.log('inside callback', )
// });
let ps = new shell({
  executionPolicy: 'Bypass',
  noProfile: true
});
async function searchJFile() {
  fileContents = fs.readFileSync(jFile, {encoding: 'utf8'});
  fileContents = JSON.parse(fileContents);
  fileContents = fileContents["recentDir"]
  parsed = Number.parseInt(searchQ);
// (async () => {


    if(Number.isNaN(parsed)) {
      await searchId();
    //take the return value of searchs and use that when calling the function that calls either releasemail or release web
      await emailRouter();
    } else if(!Number.isNaN(parsed)) {
      await searchName();
      await emailRouter();
    }
  // })()
}
//if matches arraylength is equal to one then then run function to run powershell script to open draft of email

function searchId(){
  fileContents.forEach((data,i) => {
    let dName = data.name;
    if(dName.match(searchQ)) {
      matches.push(data)
      console.log(`recent directory searchid ${searchQ}`)
      console.log(colors.green(`heres the path if search matches the name ${data.path}`))
      console.log(`here's an array of the matches ${matches.length}`)
      // return data;
    }
  })
}

function searchName() {
  fileContents.forEach((data, i) => {
    let dId = data.id;
    if(dId.match(searchQ)) {
      matches.push(data)
      console.log(`looks it matches maybe we should break out and do switch statement ${searchQ} `)
      console.log(colors.green(`here's the path that we shuould get al files out of ${data.path}`))
      console.log(`here's an array of the matches ${matches.length}`)
      console.log('matches', matches)
      // return data;
    }
    // console.log(`recent directory searchname ${JSON.stringify(data)}`)

  })

}

function releaseCards(jobId){
  // exec("echo 'hello there'" )
  if(jobId){
    console.log('data obj', jobId)
    console.log('RELEASE THE ECARD EMAIL')
    ps.addCommand('C:\\Users\\lovep\\Documents\\WindowsPowerShell\\Scripts\\New-Email-Test.ps1', [
      {jobid: jobId}
    ])
    ps.invoke().then(output => {}).catch(err => {});
    ps.dispose().then(jobID => {}).catch(err => {});
  }
  //thisfunction should start a new pshell session and take the path of the returned object and move through the folder to get nescassary files for releasing
}
//take the recent-jobs json Object
function releaseWebPage() {
  console.log('RELEASE THE WEBPAGE EMAIL')

  //thisfunction should start a new pshell session and take the path of the returned object and move through the folder to get nescassary files for releasing
}
function emailRouter() {
  let type = matches["0"].jobType;
  let jobId = matches["0"].id;
  if(matches.length === 1 ){
      switch (type) {
        case 'ecard':
          releaseCards(jobId);
          break;
        case 'webpage':
          releaseWebPage();
          break;
        default:
      }
    }
  //check jobType of returned object from the searches in searchJFile()
  //call the either email or webpage inside this function
}
releaseCards();
searchJFile();
//run script that search by id -check if args is integer

//if not integer then check by name

//function for ecard
//start new powershell session and run the email script from newemail.ps1
//path to release folders
//zipped folder of all files in release should be attached

//function for WebPage
//start new poweshell session and run the email script from newEmal.ps1
//params for this script will be the following:
//path to release folder
//missinglinks - attached
//path to most recent english copy Documentation
//path to most recent spanish Documentation







//--------------Email--------------
// releaseCards(jobId) functionName
// take arg and search json Object
//Loop through file obj[index].jobId and if equal to arg then take path Obj[index].jobId
//Use that path to
// --------------ecard email--------------
// path to release folders
// zipped folder files in release should be attached

// --------------WebPage email--------------
// path to release folder
// missing links listed
// path to copy english doc - get by most recent date and CONTAINS check of langType
// path to copy spanish doc = get by most recent date and CONTAINS check of langType
