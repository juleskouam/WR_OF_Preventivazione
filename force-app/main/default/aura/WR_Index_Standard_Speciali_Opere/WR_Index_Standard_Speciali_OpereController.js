({       
    
    doInit : function(component, event, helper) {
        
        var recordId = component.get("v.recordId");
        var action = component.get("c.getTask");
        console.log('recordId ', recordId);
        action.setParams({
            recordId : recordId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state ', state);
            if(state === "SUCCESS") {
                var task = response.getReturnValue();
                var tr=task.WR_Tipologia_Richiesta__c;
                if(tr=='1'){
                    
                	component.set("v.error",'true');
                    component.set("v.visibIndex",'false');
                }else{
                component.set("v.visibIndex",'true');
                console.log('cluster ', task.WR_Cluster__c);
                component.set("v.cluster", task.WR_Cluster__c);
                    }
            } else {
                console.log('ERROR: ', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
	    handleClick : function(component, event, helper) {
        var isChecked = component.find("checkSpecial").get("v.checked");
        var isChecked1 = component.find("checkStandard").get("v.checked");
         //alert(' '+isChecked+' '+isChecked1);
            if(isChecked){
                if(component.get("v.cluster") == 'A&B') {
                    component.set("v.visibSpecial",'false');
                	component.set("v.visibStandard",'false');
                	component.set("v.visibIndex",'false');
                	component.set("v.visibSpeAeB",'true');
                } else {
                    
                   component.set("v.visibSpecial",'true');
                	component.set("v.visibStandard",'false');
                	component.set("v.visibIndex",'false');
                	component.set("v.visibSpeAeB",'false');
                }
                 
            }else{
                if(isChecked1){
               component.set("v.visibStandard",'true');
                component.set("v.visibSpecial",'false');
                component.set("v.visibIndex",'false');
                component.set("v.visibSpeAeB",'false');
                    
                }else{
                    alert('per favore, fai una scelta');
                }
            }
       
	},
    
    handleExit : function(component, event, helper) {
     $A.get("e.force:closeQuickAction").fire()

       }})