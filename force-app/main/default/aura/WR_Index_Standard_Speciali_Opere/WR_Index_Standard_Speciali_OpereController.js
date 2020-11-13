({       
	    handleClick : function(component, event, helper) {
        var isChecked = component.find("checkSpecial").get("v.checked");
        var isChecked1 = component.find("checkStandard").get("v.checked");
         //alert(' '+isChecked+' '+isChecked1);
            if(isChecked){
                 component.set("v.visibSpecial",'true');
                component.set("v.visibStandard",'false');
                component.set("v.visibIndex",'false');
                
            }else{
                if(isChecked1){
               component.set("v.visibStandard",'true');
                component.set("v.visibSpecial",'false');
                component.set("v.visibIndex",'false');
                    
                }else{
                    alert('per favore, fai una scelta');
                }
            }
       
	},
    
    handleExit : function(component, event, helper) {
     $A.get("e.force:closeQuickAction").fire()

       }})