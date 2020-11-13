({
    doInit: function(component, event, helper) {
        /*component.set('v.mycolumns', [
            { label: 'RIFERIMENTO', fieldName: 'ProductCode', type: 'text'},
            { label: 'DESCRIZIONE', fieldName: 'Name', type: 'text'},
            
        ]);*/
        helper.doInitHelper(component, event);
    },
 
    /* javaScript function for pagination */
    navigation: function(component, event, helper) {
        var sObjectList = component.get("v.mydata");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var whichBtn = event.getSource().get("v.name");
        // check if whichBtn value is 'next' then call 'next' helper method
        if (whichBtn == 'next') {
            component.set("v.currentPage", component.get("v.currentPage") + 1);
            helper.next(component, event, sObjectList, end, start, pageSize);
        }
        // check if whichBtn value is 'previous' then call 'previous' helper method
        else if (whichBtn == 'previous') {
            component.set("v.currentPage", component.get("v.currentPage") - 1);
            helper.previous(component, event, sObjectList, end, start, pageSize);
        }
    },
 
    selectAllCheckbox: function(component, event, helper) {
        var selectedHeaderCheck = event.getSource().get("v.value");
        var updatedAllRecords = [];
        var updatedPaginationList = [];
        var mydata = component.get("v.mydata");
        var PaginationList = component.get("v.PaginationList");
        var listselect=[];
        // play a for loop on all records list 
        for (var i = 0; i < mydata.length; i++) {
            // check if header checkbox is 'true' then update all checkbox with true and update selected records count
            // else update all records with false and set selectedCount with 0  
            if (selectedHeaderCheck == true) {
                mydata[i].isChecked = true;
                listselect.push(mydata[i].ProductCode);
                component.set("v.selectedCount", mydata.length);
            } else {
                mydata[i].isChecked = false;
                component.set("v.selectedCount", 0);
            }
            
            
            updatedAllRecords.push(mydata[i]);
        }
        component.set("v.Listeselect",listselect);
        // update the checkbox for 'PaginationList' based on header checbox 
        for (var i = 0; i < PaginationList.length; i++) {
            if (selectedHeaderCheck == true) {
                PaginationList[i].isChecked = true;
            } else {
                PaginationList[i].isChecked = false;
            }
            updatedPaginationList.push(PaginationList[i]);
        }
        component.set("v.mydata", updatedAllRecords);
        component.set("v.PaginationList", updatedPaginationList);
    },
 
     checkboxSelect: function(component, event, helper) {
        // on each checkbox selection update the selected record count 
        var selectedRec = event.getSource().get("v.value");
        var text = event.getSource().get("v.text");
        var listselect=component.get("v.Listeselect");
        //alert(text);
        var getSelectedNumber = component.get("v.selectedCount");
        if (selectedRec == true) {
            getSelectedNumber++;
            listselect.push(text);
            component.set("v.Listeselect",listselect);
            //alert(listselect);
        } else {
            getSelectedNumber--;
            delete listselect[listselect.indexOf(text)];
            component.set("v.Listeselect",listselect);
            //alert(listselect);
            component.find("selectAllId").set("v.value", false);
        }
        component.set("v.selectedCount", getSelectedNumber);
        // if all checkboxes are checked then set header checkbox with true   
        if (getSelectedNumber == component.get("v.totalRecordsCount")) {
            component.find("selectAllId").set("v.value", true);
        }
    },
    
 
    getSelectedRecords: function(component, event, helper) {
        var allRecords = component.get("v.mydata");
        var selectedRecords = [];
        for (var i = 0; i < allRecords.length; i++) {
            if (allRecords[i].isChecked) {
                selectedRecords.push(allRecords[i].objAccount);
            }
        }
        alert(JSON.stringify(selectedRecords));
    },
    
    
    setValueFilterCode: function(component, event, helper) {
        var code= component.find("idcode").get("v.value");
         var data= component.get("v.mydata");

            data = data.filter( row =>row.ProductCode.toLowerCase().includes(code.toLowerCase()) );
            helper.initializePagination(component,null,data);     
    },
    setValueFilterName: function(component, event, helper) {
        var name= component.find("idname").get("v.value");
         var data= component.get("v.mydata");
        
            data = data.filter( row =>row.Name.toLowerCase().includes(name.toLowerCase()) );
            helper.initializePagination(component,null,data);        
    },
                    
   //old code@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                 
	   handleClick : function(component, event, helper) {
        //update state en  PREVENTIVO DA INSERIRE
                     var reference = component.get('v.Listeselect');
                     var ref=[];
                     var record = component.get('v.recordId');
                     for (var i = 0; i < reference.length; i++){
                         if(reference[i]!=''){
                           ref.push(reference[i]);  
                         }
                     }
                     var action = component.get("c.getProductMatch_last");
                     action.setParams({"riferimentos":ref,"recordId":record});
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
               component.set("v.spiner", true);
            
       
	},
    
    handleExit : function(component, event, helper) {
     $A.get("e.force:closeQuickAction").fire()

       },
    getSelectedName: function (cmp, event) {
        var selectedRows = event.getParam('selectedRows');
      

    },
     /*getSelectedName: function (cmp, event) {
        var selectedRows = event.getParam('selectedRows');
        var referiementos=cmp.get('v.referiementos');
        var totalList=cmp.get('v.PaginationList');
        var listNonSelect=[];
        for(var i=0;i<totalList.length;i++){
             var sel='0';
             for(j=0;j<selectedRows.length;j++){
                 if(selectedRows[j].ProductCode==totalList[i].ProductCode){
                     sel='1'; j=selectedRows.length;
                 }
             }
             if(sel=='0'){
                   listNonSelect.push(totalList[i].ProductCode);  
                 }
         }
         for(var i=0;i<selectedRows.length;i++){
             var sel='0';
             for(var j=0;j<referiementos.length;j++){
               if(selectedRows[i].ProductCode==referiementos[j]){
                     sel='1'; j=referiementos.length;
                 }
             }
             if(sel=='0'){
                   referiementos.push(selectedRows[i].ProductCode);  
                 }
         }
         
          for(var i=0;i<listNonSelect.length;i++){
             var sel='0';
             for(var j=0;j<referiementos.length;j++){
               if(listNonSelect[i]==referiementos[j]){
                     sel='1'; j=referiementos.length;
                 }
             }
             if(sel=='1'){
                  delete referiementos[referiementos.indexOf(listNonSelect[i])];  
                 }
         }
         var mapPageList=cmp.get('v.mapPageList');
         var index=cmp.get('v.currentPage');
         mapPageList[index]=selectedRows;
         cmp.set('v.mapPageList', mapPageList);
         alert(JSON.parse(mapPageList[1]));
         
       // console.log("You selected: " + referiementos);
        cmp.set('v.referiementos', referiementos);

    }*/
                
    
})