({
   init: function (cmp, event, helper) {
       
       var recordId=cmp.get('v.recordId');
        var action = cmp.get('c.getProductMatchTasck_last');
        action.setParams({"recordId":recordId});
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue().length>0){
                cmp.set('v.mycolumns', [
            { label: 'CODE', fieldName: 'ProductCode', type: 'text'},
            { label: 'DESCRIPTION', fieldName: 'Name', type: 'text'},
            
            ]);
                cmp.set('v.mydata', response.getReturnValue());
                    }else{
                       cmp.set('v.error', true);
                    }
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
       
    }
})