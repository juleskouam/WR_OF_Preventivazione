({
	doInit: function(component,event,helper) {
        var getId = component.get("v.recordId");
        var action = component.get("c.getTask");
        action.setParams({ recordId :getId });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
           
            if (state === "SUCCESS") {
                component.set("v.visibftth",'true');
                var resultTipologia=response.getReturnValue().WR_Tipologia_Richiesta__c;
                
                if(resultTipologia=='1'){
                    component.set("v.visibfwa",'true');
                    component.set("v.visibftth",'false');
                    component.set("v.error",'false');
                }else{
                    if (resultTipologia=='0'){
                    component.set("v.visibftth",'true');
                    component.set("v.visibfwa",'false');
                    component.set("v.error",'false');
                }else{
                    component.set("v.visibftth",'false');
                    component.set("v.visibfwa",'false');
                    component.set("v.error",'true');
                  
                }
                } 

            }
        
            else if (state === "INCOMPLETE") {
               
            }
          
            else if (state === "ERROR") {
                var errors = response.getError();
                
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        $A.enqueueAction(action);
        component.set('v.spinner',false);
    }
    
})