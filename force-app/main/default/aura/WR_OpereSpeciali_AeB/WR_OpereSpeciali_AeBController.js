({
    handleNext : function(component, event, helper) {
        
        var isCheckedNew = component.find("checkNew").get("v.checked");
        var isCheckedOld = component.find("checkOld").get("v.checked");
        var isCheckedProd = component.find("checkPro").get("v.checked");
        
        console.log('isCheckedNew ', isCheckedNew);
        console.log('isCheckedOld ', isCheckedOld);
        
        if(!isCheckedNew && !isCheckedOld && !isCheckedProd )
        {
            alert('Effettuare almeno una scelta');
        }
        else
        {if(isCheckedProd){
                
                component.set("v.visibStandard",'false');
                component.set("v.visibIndex",'false');
                component.set("v.visibSpeAeB",'false');
                component.set("v.visibSpecial",'true');
                component.set("v.spiner", true);
        }else{
            if(isCheckedNew) component.set("v.tipoContratto",'NEW');
            if(isCheckedOld) component.set("v.tipoContratto",'OLD');
            component.set("v.preCheck", 'false');
        	component.set("v.uploadCheck", 'true');
        }
            
        }

    },
    
	handleExit : function(component, event, helper) {
     $A.get("e.force:closeQuickAction").fire()

    },
    
    onTableImport: function (component, event, helper) {
        helper.disableExcelInput(component);
        helper.importTableAndThrowEvent(component, event, helper);
        var fileName = 'No File Selected...';
        if (event.getSource().get("v.files").length > 0) {
            console.log('inside if');
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        component.set("v.fileName", fileName);
        
    },
    precedente : function(component, event, helper) {
                 component.set("v.visibSpeAeB",'false');
                 component.set("v.visibSpecial",'false');
                component.set("v.visibStandard",'false');
                component.set("v.visibIndex",'true');
               component.set("v.spiner", true);
            
       
	}
})