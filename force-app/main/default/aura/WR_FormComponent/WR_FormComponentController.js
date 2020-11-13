({
    doInit : function(component, event, helper) {

        var url = $A.get('$Resource.RollingHillsGrey1');
        component.set('v.backgroundImageURL', url);
      
    

    },
    handleExit : function(component, event, helper) {
     $A.get("e.force:closeQuickAction").fire()

       },
    
    //@@@@@@@@@@@@@@@@@@@@@@@functions for the visibility of note of chose one and two@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	onCheck : function(component, event, helper) {
        component.set('v.spinner',true);
	    var listCheck=event.getParam('checked');
        var checkCmp1 =component.find("check1").get("v.checked");
        var checkCmp2 =component.find("check2").get("v.checked");
        var checkCmp3 =component.find("check1").get("v.checked");
        var checkCmp4 =component.find("check2").get("v.checked");
        var checkCmp5 =component.find("check1").get("v.checked");
        var checkCmp6 =component.find("check2").get("v.checked");
        if(checkCmp1){
            var tmp=component.find("check2").set("v.checked", false);
            component.set('v.note1',true);component.set('v.note2',false);
            component.set('v.spinner',false);
        }else{
            component.set('v.note1',false);
            component.set('v.spinner',false);
        }
              
         component.set('v.spinner',false);
       
        },
       	onCheck2 : function(component, event, helper) {
            component.set('v.spinner',true);
	    var listCheck=event.getParam('checked');
        var checkCmp1 =component.find("check1").get("v.checked");
        var checkCmp2 =component.find("check2").get("v.checked");
        var checkCmp3 =component.find("check1").get("v.checked");
        var checkCmp4 =component.find("check2").get("v.checked");
        var checkCmp5 =component.find("check1").get("v.checked");
        var checkCmp6 =component.find("check2").get("v.checked");
       
        if(checkCmp2){
            var tmp=component.find("check1").set("v.checked", false);
            component.set('v.note1',false);component.set('v.note2',true);
            component.set('v.spinner',false);
        }else{
            component.set('v.note2',false);
            component.set('v.spinner',false);
        }
       
           component.set('v.spinner',false); 
       
        },
    
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@function of validation@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
       	handleClick : function(component, event, helper) {
          component.set('v.spinner',true);
         var listCheck=event.getParam('value');    
	    var checkCmp1 =component.find("check1").get("v.checked");
        var checkCmp2 =component.find("check2").get("v.checked");
        var checkCmp3 =component.find("check3").get("v.checked");
        var checkCmp4 =component.find("check4").get("v.checked");
        var checkCmp5 =component.find("check5").get("v.checked");
        var checkCmp6 =component.find("check6").get("v.checked");
            
            if(checkCmp4 || checkCmp4 && checkCmp3 && checkCmp5 && checkCmp6  ){
                
                if(checkCmp1||checkCmp2){
                    //message d'erreur
                    alert('backup fallito :combinazione sbagliata!');
                    helper.errorMessage();
                    component.set('v.spinner',false);
                    
                }else{
                     
                    //update state en  PREVENTIVO DA INSERIRE
                     var getId = component.get("v.recordId");
                     var action = component.get("c.updateTask");
                    action.setParams({ recordId :getId, statuts:' Preventivo da Inserire',c1:checkCmp1,c2:checkCmp2,c3:checkCmp3,c4:checkCmp4,c5:checkCmp5,c6:checkCmp6});
                    action.setCallback(this, function(response) {
                    var state = response.getState();
                     
                     if (state === "SUCCESS") {
                         //message de succes
                        component.set('v.spinner',false);
                      }
                
                     else if (state === "INCOMPLETE") {
                      //alert(response.getReturnValue());
                      component.set('v.spinner',false);
                     }
          
                     else if (state === "ERROR") {
                    var errors = response.getError();
                     if (errors) {
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
                }
                
            }else{
                if(checkCmp1||checkCmp2){
                    //update status en CHIUSO and add Note Value!
                    if(checkCmp1){
                        
                        var note=component.get("v.valuenote1");
                        component.set('v.spinner',false);
                    }else{
                         var note=component.get("v.valuenote2");
                        component.set('v.spinner',false);
                    }
                    var getId = component.get("v.recordId");
                    var action = component.get("c.updateTaskWhitNote");
                    action.setParams({ recordId :getId,statuts:'Chiuso',notec:note,c1:checkCmp1,c2:checkCmp2,c3:checkCmp3,c4:checkCmp4,c5:checkCmp5,c6:checkCmp6});
                    action.setCallback(this, function(response) {
                    var state = response.getState();
                    component.set('v.spinner',false);
                     if (state === "SUCCESS") {
                         //message de succes
                         component.set('v.spinner',false);
                      }
                
                     else if (state === "INCOMPLETE") {
                        component.set('v.spinner',false);
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
                    component.set('v.spinner',false);
                    }
                 }
              });

              $A.enqueueAction(action);
               helper.saveAndCloseBtn();
    
                }else{
                    if(checkCmp3||checkCmp5||checkCmp6 || checkCmp3&&checkCmp6&&checkCmp5){
                         //update status en CHIUSO
                    var getId = component.get("v.recordId");
                     var action = component.get("c.updateTask");
                    action.setParams({ recordId :getId,statuts:'Chiuso',c1:checkCmp1,c2:checkCmp2,c3:checkCmp3,c4:checkCmp4,c5:checkCmp5,c6:checkCmp6});
                    action.setCallback(this, function(response) {
                    var state = response.getState();
                     if (state === "SUCCESS") {
                         //message de succes
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
               helper.saveAndCloseBtn();
                component.set('v.spinner',false);
                    }else{
                    //message d'erreur
                    alert('backup fallito :combinazione sbagliata!');
                    helper.errorMessage();
                    component.set('v.spinner',false);
                     }
                }
            }
       
        }
    
});