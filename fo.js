// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extensions
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders
// let firstNo = process.argv[2]
// let secondNo = process.argv[3]
// console.log(Number(firstNo)+Number(secondNo))

const fs = require("fs");
const path = require('path')
const organize = require('./Command/organize')
const helpModule = require('./Command/help')
const treeModule = require('./Command/tree')
let inputArr = process.argv.slice(2)
//console.log(inputArr)


let command = inputArr[0]
switch (command) {
    case "organize":
        organize.organizeFnKey(inputArr[1])
        break;

    case "help":
    helpModule.helpFnKey()
        break;

    case "tree":
        treeModule.treeFnKey(inputArr[1])
        break;
    default:
        console.log('Enter a valid command')
}


