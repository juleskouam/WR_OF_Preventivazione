({
    
	  handleClick : function(component, event, helper) {
        //update state en  PREVENTIVO DA INSERIRE
                     var reference = component.get('v.referiementos');
                     var ref=[];
                     var record = component.get('v.recordId');
                     var note=component.get('v.valuenote');
                     for (var i = 0; i < reference.length; i++){
                         if(reference[i]!=''){
                           ref.push(reference[i]);  
                         }
                     }
                     var action = component.get("c.getProductMatch_last");
                     action.setParams({"riferimentos":ref,"recordId":record,"note":note});
                     action.setCallback(this, function(response) {
                     var state = response.getState();
                     console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                     if (state === "SUCCESS") {
                         console.log("Succes");
                         //message de succes
                        // alert(response.getReturnValue());
                      } else {
                    console.log("Unknown error");
                         //alert(response.getReturnValue());
                    }
                 }
              );

              $A.enqueueAction(action);
              helper.saveAndCloseBtn();
 
	},
     precedente : function(component, event, helper) {
       
                 component.set("v.visibSpecial",'false');
                component.set("v.visibStandard",'false');
                component.set("v.visibIndex",'true');
            
       
	},
    onCheck : function(component, event, helper) {
       
        var checkCmp1 =component.find("check1").get("v.checked");
        var checkCmp2 =component.find("check2").get("v.checked");
        var checkCmp3 =component.find("check3").get("v.checked");
        var checkCmp4 =component.find("check4").get("v.checked");
       
        if(checkCmp3){
            component.set('v.note',true);
            
        }else{
            component.set('v.note',false);
        }
            
       
	},
    
    handleExit : function(component, event, helper) {
     $A.get("e.force:closeQuickAction").fire()

       },



    //____________________________________________________________________________________________________________________
    
    
    init: function (cmp, event, helper) {
        cmp.set('v.mycolumns', [
            { label: 'RIFERIMENTO', fieldName: 'ProductCode', type: 'text'},
            { label: 'DESCRIZIONE', fieldName: 'Name', type: 'text'},
            
        ]);

            cmp.set('v.mydata', [{
                    ATTIVITA: 'D&A',
                    ProductCode: 'OP.CIV.01',
                    Name: 'Opere Civili: Opere di scavo per tratte fino a 3 metri, anche non continuativi, compresi nella tratta ROE/Box di derivazione a confine Proprietà Privata.',
                    UM: 'Cad',
                    Prezzo : '230',
                    wrapText: false
                   
                },
                {
                    ATTIVITA: 'D&A',
                    ProductCode: 'OP.CIV.02',
                    Name: 'Opere Civili: Opere di scavo per tratte da 3 a 10 metri, anche non continuativi, compresi nella tratta ROE/Box di derivazione a confine Proprietà Privata.',
                    UM: 'Cad',
                    Prezzo : '360',
                    wrapText: true
                   
                },
                                 {
                    ATTIVITA: 'D&A',
                    ProductCode: 'OP.CIV.03',
                    Name: 'Opere di scavo per tratte superiori a 10 metri (anche non continuativi) e relativi ripristini.La voce si applica per i soli metri eccedenti i 10 metri.',
                    UM: 'Cad',
                    Prezzo : '27',
                    wrapText: true
                   
                },
                                 {
                    ATTIVITA: 'D&A',
                    ProductCode: 'OP.CIV.04',
                    Name: 'Fornitura e posa pozzetto 20x20 comprensivo di chiusino C250.',
                    UM: 'Cad',
                    Prezzo : '53',
                    wrapText: true
                   
                },
                                ]);
    },
    selectAllCheckbox: function(component, event, helper) {
        var selectedHeaderCheck = event.getSource().get("v.value");
        var updatedAllRecords = [];
        var mydata = component.get("v.mydata");
        // play a for loop on all records list 
        for (var i = 0; i < mydata.length; i++) {
            // check if header checkbox is 'true' then update all checkbox with true and update selected records count
            // else update all records with false and set selectedCount with 0
            var referiementos=[];  
            if (selectedHeaderCheck == true) {
                mydata[i].isChecked = true;
                component.set('v.note',true);
                referiementos.push('OP.CIV.01');
                referiementos.push('OP.CIV.02');
                referiementos.push('OP.CIV.03');
                referiementos.push('OP.CIV.04');
                component.set("v.referiementos",referiementos);
            } else {
                mydata[i].isChecked = false;
                component.set('v.note',false);
                component.set("v.referiementos",referiementos);
            }
            updatedAllRecords.push(mydata[i]);
        }
        // update the checkbox for 'PaginationList' based on header checbox 
        
        component.set("v.mydata", updatedAllRecords);
    },
    checkboxSelect: function(component, event, helper) {
        // on each checkbox selection update the selected record count 
        var selectedRec = event.getSource().get("v.value");
        var text = event.getSource().get("v.text");
        var referiementos=component.get("v.referiementos");
        //alert(text);
        var getSelectedNumber = component.get("v.selectedCount");
        if (selectedRec == true) {
            referiementos.push(text);
            if(text=='OP.CIV.03'){
                  component.set('v.note',true);
                }
            component.set("v.referiementos",referiementos);
        } else {
            delete referiementos[referiementos.indexOf(text)];
            if(text=='OP.CIV.03'){
                component.set('v.note',false);
                }
            component.set("v.referiementos",referiementos);
        }
    },
    /*getSelectedName: function (cmp, event) {
         alert('referiementos');
        var selectedRows = event.getParam('selectedRows');
        var referiementos=[];
        var select3='0';
        // Display that fieldName of the selected rows
        for (var i = 0; i < selectedRows.length; i++){
            //alert("You selected: " + selectedRows[i].opportunityName);
                referiementos.push(selectedRows[i].ProductCode);
            if(selectedRows[i].ProductCode=='OP.CIV.03'){
                 select3='1';
                }    
        }
        
            if(select3=='1'){
                 cmp.set('v.note',true);
            
                }else{
                     cmp.set('v.note',false);
                  }
        
       // console.log("You selected: " + referiementos);
        cmp.set('v.referiementos', referiementos);

    }*/
})