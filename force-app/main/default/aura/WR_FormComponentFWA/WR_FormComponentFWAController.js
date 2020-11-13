({
    //__________________Function for visibility fiels 2 and 4_____________________________________________
    
	doSomething : function(component, event, helper) {
       var chose=component.find("select1").get("v.value");
      
        if(chose=='SI'){
            component.set("v.visib0",'true');
           
        }else{
            if(chose=='NO'){
                
                component.set("v.visib0",'false');
            }else{
              component.set("v.visib0",'false');
            }
        }
		
	},
    doSomething1 : function(component, event, helper) {
       var chose=component.find("select2").get("v.value");
      
        if(chose=='SI'){
            component.set("v.visib",'true');
        }else{
            
                component.set("v.visib",'false');
            
        }
		
	},
    
    
    handleClick : function(component, event, helper) {
        var champ1=component.find("select1").get("v.value");
        var champ2=component.get("v.valuechamp2");
        var champ3=component.find("select2").get("v.value");
        var champ4=component.get("v.valuechamp4");
        var champ5=component.get("v.valuechamp5");
        
        //_______________________Function_for_Update_____________________________________________________
                     var getId = component.get("v.recordId");
                     var action = component.get("c.updateTaskWhitFWA");
                     action.setParams({ recordId :getId, statuts:' Preventivo da Inserire',elementoFWA1:champ1,elementoFWA2:champ2,elementoFWA3:champ3,elementoFWA4:champ4,elementoFWA5:champ5});
                     action.setCallback(this, function(response) {
                     var state = response.getState();
                     
                     if (state === "SUCCESS") {
                         //message de succes
                         alert(response.getReturnValue());
                        component.set('v.spinner',false);
                      }
                
                     else if (state === "INCOMPLETE") {
                      //alert(response.getReturnValue());
                      alert('@@@@@@@@@@@incomplète'+response.getReturnValue());
                      component.set('v.spinner',false);
                     }
          
                     else if (state === "ERROR") {
                         alert('@@@@@@@@@@@incomplète'+response.getReturnValue());
                    var errors = response.getError();
                     if (errors) {
                         alert('@@@@@@@@@@@error'+response.getReturnValue());
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                        component.set('v.spinner',false);
                    }
                    } else {
                    console.log("Unknown error");
                    component.set('v.spinner',false);
                    }
                 }
              });

              $A.enqueueAction(action);
              helper.saveAndCloseBtn();
		
	},
    handleExit : function(component, event, helper) {
     $A.get("e.force:closeQuickAction").fire()

       }
    
})