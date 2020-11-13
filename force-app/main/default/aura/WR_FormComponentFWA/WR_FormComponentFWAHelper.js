({
	
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
    },
    errorMessage : function() {
        // Display the total in a "toast" status message
        var resultsToast = $A.get("e.force:showToast");
        resultsToast.setParams({
            "title": "backup fallito",
            "message": "combinazione sbagliata!"
        });
    }
    
})