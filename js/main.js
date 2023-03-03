const jsonSource = {
    "model":{
       "@context":"https://r-cdbapp02.abus.de/api/v1/context/model",
       "@id":"https://r-cdbapp02.abus.de/api/v1/collection/document/00000831_002@02",
       "abus_arbeitstitel":"ZYL_05_01",
       "abus_artikelkategorie":"Entwicklung",
       "abus_bez_werkst":"CuZn37/F55",
       "abus_empb":1,
       "abus_urheber":"2062",
       "abus_urheberdatum":"2006-03-21T00:00:00",
       "system:rules":"https://r-cdbapp02.abus.de/api/v1/collection/document/00000831_002@02/rules",
       "relship:files":{
          "@id":"https://r-cdb.abus.de/api-test",
          "targets":[
             {
                "@id":"https://r-cdbapp00.abus.de/api-test/[0]",
                "cdb_cdate":"2020-01-01T15:52:23",
                "cdbf_fsize":108165,
                "cdbf_name":"00000831_002.drw",
                "cdbf_object_id":"1aa5398f-7c36-11e2-a97c-00505681164f",
                "system:classname":"cdb_file",
                "system:content_type":"application/octet-stream"
             },
             {
                "@id":"https://r-cdbapp01.abus.de/api-test/[1]",
                "cdb_cdate":"2021-02-02T15:52:23",
                "cdbf_fsize":108165,
                "cdbf_name":"00000831_002.drw",
                "cdbf_object_id":"1aa5398f-7c36-11e2-a97c-00505681164f",
                "system:classname":"cdb_file",
                "system:content_type":"application/octet-stream"
             }
          ]
       }
    },
    "relship":{
       "LastChange":{
          "abus_ae_kat":"Modifikation"
       },
       "example":true
    }
 }
 
 
 let result ={
    "results":[]
    
}

let testoutput=[]

/**********************Erster Versuch ************************************/

// let output=[]
//  let obj = Object.keys(jsonSource.model).forEach(
//     element=>{
//         let name=element
//         let value=jsonSource.model[element]

//         if(typeof value!=='object'&&value!== null){
//         output.push(['"name": '+ name,'"value": '+value])
     
//     }
//         else(output.push(['"name": '+ name,'"value": '+value]))
//     }
//     )

let obj=jsonSource
let nestedResult={
   "results":[]
}


for (const[key,value] of Object.entries(obj)){
   if (typeof value==='object' && value!== null){
      let path=key
      for(const[key,value] of Object.entries(obj[path])){
      if(typeof value!=='object' && value!==null){
      let newObject={"name":path+"."+key, "value":value}
      nestedResult.results.push(newObject)}


      // else{
      //    path=path+`[${key}]`
      //    console.log(path)
      //    for(const[key,value] of Object.entries(obj[path])){
      //       if(typeof value!=='object' && value!==null){
      //       let newObject={"name":path+"."+key, "value":value}
      //       nestedResult.results.push(newObject)}

      //       }
      // }

      else{nestedResult.results.push("Hier ist typeof vlaue==='object'")}
   }
}  
}

console.log(JSON.stringify(nestedResult, null, 4))