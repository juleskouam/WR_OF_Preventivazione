({
	disableExcelInput: function(cmp) {
 		cmp.set("v.disabled", true);
	},
    
    enableExcelInput: function(cmp) {
 		cmp.set("v.disabled", false);
	},
    
    importTableAndThrowEvent: function(cmp, evt, helper) {
 		evt.stopPropagation();
 		evt.preventDefault();
 		try {
     		console.log("importTableAndThrowEvent");
  			const file = helper.validateFile(cmp, evt);
  			cmp.set("v.file",file);
  			helper.readExcelFile(cmp, file, helper)
  			.then($A.getCallback(excelFile => {
   				//helper.throwSuccessEvent(cmp, excelFile);
 	 	}))
   		.catch($A.getCallback(exceptionMessage => {
      		console.log("exception: "+ exceptionMessage);
   			//helper.throwExceptionEvent(cmp, exceptionMessage);
  		}))
   		.finally($A.getCallback(() => {
   			helper.enableExcelInput(cmp);
  		}))
  	}catch(exceptionMessage) {
   		//helper.throwExceptionEvent(cmp, exceptionMessage);
   		helper.enableExcelInput(cmp);
  	}
  },
                
  validateFile: function(cmp, evt) {
  	const files = evt.getSource().get("v.files");
    if (!files || files.length === 0 || $A.util.isUndefinedOrNull(files[0])) {
     alert('nessun file specificato');
    }
    const file = files[0];
    
    return file;
  },
                
  readExcelFile: function(cmp, file, helper) {
    return new Promise(function (resolve, reject) {
        const fileReader = new FileReader();
        fileReader.onload = event => {
        let filename = file.name;
        let binary = "";
             
        var data = new Uint8Array(event.target.result);    
            
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        binary = arr.join("");
        console.log("binary"+binary);
        try { 
              resolve({
               "fileName": filename,
               "xlsx": XLSX.read(binary, {type: 'binary', header: 9})
              });
              
              var workbook = XLSX.read(binary, { type: 'binary' }); 
               
              var sheet_name_list = workbook.SheetNames;
              var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
              console.log('XL_row_object::'+XL_row_object); 
              var json_object = JSON.stringify(XL_row_object);
              cmp.set("v.content", json_object);
              helper.validateFileSrv(cmp, filename);  
 
       	}
        catch (content) {
              console.log("readExcelFile error "+content)
              reject(error);
        	}
    	};
        console.log('After content set::2222'+cmp.get("v.content"));
        fileReader.readAsArrayBuffer(file);
   	});
  },
    
  validateFileSrv: function(cmp,filename){
      var tipoContratto = cmp.get("v.tipoContratto");
      var fileContent = cmp.get("v.content");
      
      var action = cmp.get("c.validateFile"); 
      
      action.setParams({
     	data: fileContent,
        tipoContratto: tipoContratto,
     	fileName: filename
      });
      
      action.setCallback(this, function (response){
          var result=response.getReturnValue();  
          if (response.getState() == "SUCCESS") { 
            console.log(result.errorMessage);
          	console.log('errorCode ' , result.errorCode);
            if(result.errorCode == 0){
              	alert('File Validato con successo'); 
                cmp.set("v.isLoadInactive", false);
            }
            else{
                alert(result.errorMessage); 
                cmp.set("v.content",'');
                helper.enableExcelInput(cmp);
            }
         }
          
      });
      $A.enqueueAction(action);
  }
})