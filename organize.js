const fs = require('fs')
const path = require('path')
let types = {
    media: ["mp4", "mkv", "mp3", "jpg", "HEIC"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex",],
    app: ["exe", "dmg", "pkg", "deb"],
};
function organizeFn(dirPath) {
       let desPath;
    if (dirPath == undefined) {
        console.log('Please enter a valid DirPath')
        //Check whether folder path is defined or not.
        return;
    }
    else {
        let doesexist = fs.existsSync(dirPath);
        //Here we are checking either folder path exist or not.

        if (doesexist == true) {
            desPath = path.join(dirPath, "oganizedFiles");
            //So first we have to create a path for the folder
            if (fs.existsSync(desPath) == false) {
                fs.mkdirSync(desPath) // we will create a folder if it doesnot exist
            }
            else {
                console.log('Folder already exist')
            }
        }
        else {
            console.log('Please enter a valid path')
        }
    }

    organizeHelper(dirPath,desPath)
}
function organizeHelper(src, dest) {

    let childName = fs.readdirSync(src)
    for (let i = 0; i < childName.length; i++) {
        let childAddress = path.join(src, childName[i])
        let checkForFile = fs.lstatSync(childAddress).isFile() //to check whether it is a file or a folder. true for file and false for folder
        //console.log(childAddress+" "+checkForFile)

        if (checkForFile == true) {
            let fileCategory = getCategory(childName[i])
            console.log(childName[i]+" belons to "+fileCategory)
        
            sendFiles(childAddress, dest, fileCategory)
        }
              
    }
    
}
function getCategory(fileName) {
    let ext = path.extname(fileName)
    ext = ext.slice(1)
    //console.log(ext)

for (let type in types) {
    let cTypeArr = types[type]
    //console.log(cTypeArr)
    for (let i = 0; i < cTypeArr.length; i++) {
        if (ext == cTypeArr[i]) {
            return type;
        }
    }
}
return 'other';
}
function sendFiles(srcFilePath, dest, fileCategory){

let catPath = path.join(dest , fileCategory) // here we are making categoryPath ot create folder


if(fs.existsSync(catPath)==false){
    fs.mkdirSync(catPath)
}
let fileName = path.basename(srcFilePath); // we took out the name of the files
let destPath = path.join(catPath, fileName); // here we created a path for the files with theri specific Category

fs.copyFileSync(srcFilePath, destPath); // copied files from src to destn

fs.unlinkSync(srcFilePath); // deleted the files from the source

console.log(fileName + "Copied to" + fileCategory);
}
module.exports = {
    organizeFnKey : organizeFn
}
