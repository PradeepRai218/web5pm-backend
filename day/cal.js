
let dbName="WsCubeTech"
let addData=(num1,num2)=>{
    return num1+num2
}

let minData=(num1,num2)=>{
    return num1-num2
}

let mulData=(num1,num2)=>{
    return num1*num2
}


// "type": "commonjs"
// module.exports= addData //Default

//Named Export
 module.exports= {addData,minData,mulData,dbName}