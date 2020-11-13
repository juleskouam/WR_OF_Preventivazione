({
    /* doInitHelper funcation to fetch all records, and set attributes value on component load */
    doInitHelper : function(component,event){ 
        var action = component.get("c.getProduct2");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var oRes = response.getReturnValue();
                if(oRes.length > 0){
                    component.set('v.mydata', oRes);
                    var pageSize = component.get("v.pageSize");
                    var totalRecordsList = oRes;
                    var totalLength = totalRecordsList.length ;
                    component.set("v.totalRecordsCount", totalLength);
                    component.set("v.startPage",0);
                    component.set("v.endPage",pageSize-1);
                    
                    var PaginationLst = [];
                    for(var i=0; i < pageSize; i++){
                        if(component.get("v.mydata").length > i){
                            PaginationLst.push(oRes[i]);    
                        } 
                    }
                    component.set('v.PaginationList', PaginationLst);
                    component.set("v.selectedCount" , 0);
                    //use Math.ceil() to Round a number upward to its nearest integer
                    component.set("v.totalPagesCount", Math.ceil(totalLength / pageSize));
                    component.set("v.spiner", false);
                    
                    /*component.set('v.mycolumns', [
                    { label: 'RIFERIMENTO', fieldName: 'ProductCode', type: 'text'},
                    { label: 'DESCRIZIONE', fieldName: 'Name', type: 'text'}]);
                    component.set('v.mydata', oRes);*/

                }else{
                    // if there is no records then display message
                    component.set("v.bNoRecordsFound" , true);
                } 
            }
            else{
                alert('Error...');
            }
        });
        $A.enqueueAction(action);  
    },
    // navigate to next pagination record set   
    next : function(component,event,sObjectList,end,start,pageSize){
        /*var mapPageList=component.get('v.mapPageList');
            var index=component.get('v.currentPage');
            component.set('v.selectedRows', mapPageList[index]);*/
        
        var Paginationlist = [];
        var counter = 0;
       for(var i = end + 1; i < end + pageSize + 1; i++){
           if(sObjectList.length > i){
            if(component.find("selectAllId").get("v.value")){
            Paginationlist.push(sObjectList[i]);
            }else{
               Paginationlist.push(sObjectList[i]);
                }
                   }
                   counter ++ ;
             }
        start = start + counter;
        end = end + counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
   // navigate to previous pagination record set   
    previous : function(component,event,sObjectList,end,start,pageSize){
        var Paginationlist = [];
        var counter = 0;
       for(var i= start-pageSize; i < start ; i++){
       if(i > -1){
             if(component.find("selectAllId").get("v.value")){
              Paginationlist.push(sObjectList[i]);
              }else{
              Paginationlist.push(sObjectList[i]);
                }
               counter ++;
                   }else{
                       start++;
                   }
                 }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
  
    
    initializePagination: function(component, event, recs) 
  {
      
        var pageSize = component.get("v.pageSize");
        component.set("v.start", 0);
        component.set("v.end", pageSize - 1);
        var totalPage = Math.ceil(recs.length / pageSize);
        console.log("totalPage=" + totalPage);
        component.set("v.totalPage", totalPage);
        
        var pages = [];
        for( var i = 1; i <= totalPage; i++ )
        {
             pages.push(i);
        }
        component.set("v.pages", pages);
    
        var paginationList = [];
        for( var i = 0; i < pageSize; i++ )
        {
             if( recs.length > i )paginationList.push(recs[i]);
        }
    
        component.set("v.totalRecord", recs.length);
        component.set("v.objectList", recs);
        component.set("v.PaginationList", paginationList);
        component.set("v.currentPage", 1);
       // this.PageDetails(component, paginationList);
  },
     saveAndCloseBtn : function() {
        // Display the total in a "toast" status message
        var resultsToast = $A.get("e.force:showToast");
        resultsToast.setParams({
            "title": "Salvato con successo !",
            "message": "Congratulazioni!",
             duration:' 5000',
             key: 'info_alt',
             type: 'success',
             mode: 'pester'
        });
        resultsToast.fire();
        // Close the action panel
        var dismissActionPanel = $A.get("e.force:closeQuickAction");
         $A.get('e.force:refreshView').fire();
        dismissActionPanel.fire();
    }
})