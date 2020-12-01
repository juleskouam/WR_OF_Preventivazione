trigger WR_CaseExtensionTrigger on WR_CaseExtension__c (after insert, before insert) {
    if(trigger.isInsert && trigger.isAfter){
        WR_CaseExtensionTriggerHandler.createQuoteQuoteLines(trigger.newmap);
    } else if (trigger.isInsert && trigger.isBefore){
        WR_CaseExtensionTriggerHandler.addProductToCaseExtension(trigger.new);
    }
}