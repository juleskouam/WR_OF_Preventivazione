public class WR_TaskOLTriggerHandler {

     // 19-16-2020 - Nick&Jules- - Start
     public static void createQuoteQuoteLines(map<id,Task__c> listMapTaskOL){
        list<String> listOLO=new List<String>();
        for(Task__c t: listMapTaskOL.values()){
            listOLO.add(t.WR_Codice_Ordine_OLO__c);
          }
        List<WR_Attivita__c> listAct=[SELECT id FROM WR_Attivita__c WHERE ];
        list<SBQQ__QuoteLine__c> quoteLineList=new  list<SBQQ__QuoteLine__c>();
        map<id, WR_Attivita__c> activitymap=new   map<id,WR_Attivita__c> ();
        
        for(Task__c t: listMapTaskOL.values()){
          if(t.Status__c=='preventivi approvato'){

          }

        }


        for(Task__c t: listMapTaskOL.values()){
            WRP001_QuoteWrapper qw = new WRP001_QuoteWrapper(); 
            SBQQ__Quote__c qt=new SBQQ__Quote__c();	
            qw.quote=qt;
            qt.SBQQ__PricebookId__c=pricebookId;
            qt.SBQQ__PriceBook__c=pricebookId;
            quotes.add(qt);
            qt.WR_Attivita__c=ce.WR_Attivita__c;
            
            for(WR_Field_Mapping__mdt metadataQuoteLine:metadataQuoteLines){
                
                if(ce.get(metadataQuoteLine.WR_Source_Field__c) ==true){
                    SBQQ__QuoteLine__c ql= new SBQQ__QuoteLine__c();
                    ql.WR_Attivita__c=ce.WR_Attivita__c;
                    ql.SBQQ__Product__c= productMap.get(metadataQuoteLine.WR_value__c);
                    
                    if(metadataQuoteLine.WR_value__c == 'GPON.04.ES.02') {
                        ql.SBQQ__Quantity__c = ce.GPON04ES02Quantity__c;
                    } else if(metadataQuoteLine.WR_value__c == 'GPON.06.MLT.03') {
                        ql.SBQQ__Quantity__c = ce.GPON06MLT03Quantity__c;
                    } else if(metadataQuoteLine.WR_value__c == 'OP.CIV.03') {
                        ql.SBQQ__Quantity__c = ce.OPCIV03Quantity__c;
                    }
                    
                    qw.quoteLineList.add(ql);
                    quoteLineList.add(ql);
                }
            }
            
            if(! qw.quoteLineList.isempty()){
            	quoteWrapperList.add(qw);
            }
        }
        insert quotes;
        
        for(SBQQ__Quote__c quote: quotes){
            WR_Attivita__c att=new WR_Attivita__c(id= quote.WR_Attivita__c, WR_quote__c= quote.Id);
            activitymap.put(att.id, att);
        }
        update activitymap.values();//JF02/07/2020
        system.debug('WR_CaseExtensionTriggerHandler.createQuoteQuoteLines quotes'+quotes);
        for(WRP001_QuoteWrapper qtw: quoteWrapperList){
            for(SBQQ__QuoteLine__c ql: qtw.quoteLineList){
                ql.SBQQ__Quote__c= qtw.quote.id;
            }
        }
        try{
        insert quoteLineList;
        }catch(Exception e){
            system.debug('Exception e'+e);
        }
        system.debug('WR_CaseExtensionTriggerHandler.createQuoteQuoteLines quoteLineList'+quoteLineList);
        //delete caseExtensionsMap;
    }
        
     }
}