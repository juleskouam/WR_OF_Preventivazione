trigger WR_TaskOLTrigger on Task__c (before insert) {
    WR_TaskOLTriggerHandler.createQuoteQuoteLines(trigger.newmap);
}