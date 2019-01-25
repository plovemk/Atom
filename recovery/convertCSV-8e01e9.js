
const excelToJson = require('convert-excel-to-json');
const async = require('async');
var csvjson = require('csvjson');
var iconv = require('iconv-lite');
const utf8 = require('utf8');
var _ = require('lodash');
var path = require('path')
var os = require('os');
var pathCSV = `C:\\Users\\${os.userInfo().username}\\Downloads`
var fs = require('fs');


var fileArr = [];
var csvArr = [];
var today = new Date();
    today = today.toISOString();
    today = Date.parse(today);

var file = excelToJson({
  sourceFile: "C:\\Users\\lovep\\Downloads\\48103.xlsx",
  header:{
        rows: 1
    },
  columnToKey: {
    A: "Assignee",
    B: "JobId",
    C: "JobTitle",
    D: "LaunchDate",
    E: "TaskEndDate"


  }
});
var age;
var xcel;
var stats;
var fileStats = {};
var xp;
// var fileName
let dates;
var findExt;
var sorted;
var dataCsv;
file = JSON.stringify(file)

fs.writeFile("main-Functions\\work-flow\\jobs.json", file, (err) => {
  if (err) throw err;
  getDaysLeft();
});

function getDaysLeft() {
  file = JSON.parse(file)
  let temp = JSON.stringify(file["48103"][1].TaskEndDate);
  temp = JSON.parse(temp);
  temp = Date.parse(temp);
  let d = Math.abs(temp - today)/1000;
  let diff= Math.floor(d/86400)
  console.log(`the date function should read the file object arrayand there are ${diff} days left. ${file["48103"].length} is how many jos you have left`)
}


// scanDownloads();

// https://www.taniarascia.com/promise-all-with-async-await/
//async function decleraction wrapper

///scan dir function that is synchronous readdirSync
const getFiles = () => {
   fs.readdirSync(pathCSV).forEach((d) => {
    fileArr.push(d)
  });
  return fileArr
}


//anotherfunction that is asynchronous and gives the stats of the files in that directory.
const getStats = () => {
     fileArr.map((download) => {
        stats = fs.statSync(pathCSV + '\\' + download);
        age = stats.birthtime;
        xcel = download.includes('xlsx');
        findExt = path.extname(download).includes('.csv');

          if(findExt){
            fileStats = {
              age: age,
              name: download
            }
            csvArr.push(fileStats);
          }
    })
    // console.log('stats', csvArr)
}
//sort the files
const sortByDate = () => {
   sorted = _.sortBy(csvArr, ['age'])
      sorted = _.last(sorted)
  return sorted
}

//change the file ext
const changeExt = () => {
  // var newName = sorted.name.replace('.csv', '.xlsx')
  let source = path.join(pathCSV, sorted.name)
  // let source = path.join(pathCSV, "48103.csv")
  // let destination = path.join(pathCSV, newName)

  // var datas = fs.readFileSync("C:\\Users\\lovep\\Downloads\\48103.csv", {encoding: 'utf8'});
  dataCsv = fs.readFile(source,(err, data) => {
    if(err) throw err;
    // console.log('data here', data)
    convert(data)
  });
  var options = {
    // headers: "Assignee,JobID, JobTitle, LaunchDate, TSADate,	FirstName,	LastName,	Role",
  };
  // data = utf8.encode(data);
  // dataCsv = data.trim()
  // console.log(dataCsv)
  // return dataCsv
// console.log(fail)
  // fs.rename(pathCSV + '\\' + sorted.name, pathCSV + '\\' + newName, (err) => {
  //   if (err) throw err;
  //   console.log('rename complete')
  //   console.log("this is what is returned from mystats ", newName)
  // })
}

const convert = async (data) => {
  var str = iconv.decode(Buffer.from(data), 'win1251')
  var buff = iconv.encode(str, 'win1251')
  console.log('dadfad',buf)
}
const runAsyncFunc = async () => {

  const fileName = await getFiles();
                  await getStats();
                  await sortByDate();
                  await changeExt();
                  // await convert();
  // console.log(`filename from getfiles ${myStats}`);
}
runAsyncFunc();
//then another function that will take filter for the csv files in the direcotry
//map the name and birthtime of these files to objects and push to array

//use promis all to run all of these functions
//files.map(async file => {})
//await call stats functions
//await call filter function that maps
