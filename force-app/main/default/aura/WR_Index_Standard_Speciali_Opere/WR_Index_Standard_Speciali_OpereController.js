({       
    doInit : function(component, event, helper) {
      
        console.log("doInit");
        var recordId = component.get("v.recordId");
        console.log('recordId ',  recordId);
        var action = component.get("c.getTask");
        action.setParams({
            recordId : recordId
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state', state);
            if(state === "SUCCESS") {
                var task = response.getReturnValue();
                console.log("### cluster = " + task.WR_Cluster__c);
                component.set("v.cluste", task.WR_Cluster__c);
            } else if(state === "ERROR") {
                console.log('error: ' + response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    },
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