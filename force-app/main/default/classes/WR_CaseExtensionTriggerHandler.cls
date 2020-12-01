public class WR_CaseExtensionTriggerHandler {
    // 1-06-2020 - Nuovo Modello di controllo - J.F. - Start
    public static void createQuoteQuoteLines(map<id,WR_CaseExtension__c> caseExtensionsMap){
       system.debug('WR_CaseExtensionTriggerHandler.createQuoteQuoteLines caseExtensionsMap'+caseExtensionsMap);
        list<WR_Field_Mapping__mdt> metadataQuoteLines =[SELECT 
                                                       WR_Source_Field__c, 
                                                       WR_Source_Object__c,
                                                       WR_Value__c                                                   
														FROM WR_Field_Mapping__mdt 
                                                        where WR_Category__c ='CaseExtensionTrigger_QuoteLineCreation' and
                                                        WR_Source_Object__c='WR_CaseExtension__c' and 
                                                         WR_Source_Field__c!=null];
        system.debug('WR_CaseExtensionTriggerHandler.createQuoteQuoteLines metadataQuoteLines'+metadataQuoteLines);

        map<String, id> productMap=new  map<String, id>();
		id pricebookId= valorizzaMappa(metadataQuoteLines, productMap);
        System.debug('productMap: ' + productMap);
        
        list<WRP001_QuoteWrapper> quoteWrapperList=new  list<WRP001_QuoteWrapper>();
        list<SBQQ__Quote__c> quotes=new list<SBQQ__Quote__c>();
        list<SBQQ__QuoteLine__c> quoteLineList=new  list<SBQQ__QuoteLine__c>();
        map<id, WR_Attivita__c> activitymap=new   map<id,WR_Attivita__c> ();//JF02/07/2020
        // add Something
        for(WR_CaseExtension__c ce: caseExtensionsMap.values()){
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
    
    public static id valorizzaMappa(list<WR_Field_Mapping__mdt> metadataQuoteLine, map<String, id> productMap){
        //ritorna una mappa codice prodotto, id prodotto
        list<String> productCodes=new list<String>();
        for(WR_Field_Mapping__mdt metadata: metadataQuoteLine){
            productCodes.add(metadata.WR_Value__c);
        }
        map<id, Product2> products=new  map<id, Product2>( [select id, ProductCode from Product2 where ProductCode in:productCodes]);
        system.debug('WR_CaseExtensionTriggerHandler.valorizzaMappa: products'+ products);
		
        for(Product2 prod: products.values()){
            productMap.put(prod.ProductCode, prod.id);
        }
        system.debug('WR_CaseExtensionTriggerHandler.valorizzaMappa: productMap'+ productMap);
        if(!products.isempty()){
            return getPriceBookId(products);
           
        }
        return null;
    } 
    public static String getPriceBookId(map<id, Product2>products){
        list<Nuovo_Modello_Controllo__mdt> nmc=[select id, WR_Value__c from Nuovo_Modello_Controllo__mdt where WR_Category__c='Pricebook' limit 1];
       	if(nmc.isempty())
        	return null;
        list<Pricebook2> pricebookList= [select id from pricebook2 where IsActive=true and name=: nmc[0].WR_Value__c order by createddate desc limit 1];
        if(!pricebookList.isempty())
        return pricebookList[0].id;
        return null;
    }
    // 20-10-2020 - NMC - Regole Bretelle - G.G. - START
    public static void addProductToCaseExtension (List<WR_CaseExtension__c> caseExtensionList){
        Map<String, Schema.RecordTypeInfo> rtMap = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName();
        List<WR_ComuniBretelle__mdt> comuniBretelleList = [SELECT MasterLabel FROM WR_ComuniBretelle__mdt];
        List<String> comuniList = new List<String>();
        for(WR_ComuniBretelle__mdt comune:comuniBretelleList){
            comuniList.add(comune.MasterLabel);
        }
        for(WR_CaseExtension__c caseExtens:caseExtensionList){
            if(caseExtens.WR_OFBretellaOttica__c == 'Y'){
                if(((caseExtens.WR_RecordType__c == rtMap.get('OF_DIA_Attivazione').getRecordTypeId() ||
                     caseExtens.WR_RecordType__c == rtMap.get('OF_SA_Attivazione').getRecordTypeId()) &&
                     !String.isBlank(caseExtens.WR_NomeServizioAggiuntivo__c) &&
                     caseExtens.WR_NomeServizioAggiuntivo__c.containsIgnoreCase('Residential gateway')) || 
                     caseExtens.EOF_Codice_Operatore_WS__c == 'WN'){ //Service Wind or open internet with res gateway
                       caseExtens.WR_ATT07__c = false;
                } 
                else if(((caseExtens.EOF_Codice_Operatore_WS__c == 'TIS' ||  //Service TIS, FW, GOI, SKY
                          caseExtens.EOF_Codice_Operatore_WS__c == 'FW' ||
                          caseExtens.EOF_Codice_Operatore_WS__c == 'GOI' ||
                          caseExtens.EOF_Codice_Operatore_WS__c == 'SKY') &&
                          !String.isBlank(caseExtens.OF_Servizio__c) &&
                          caseExtens.OF_Servizio__c != 'GPON Passiva CD' &&
                          caseExtens.OF_Servizio__c != 'GPON Passiva') ||
                         (caseExtens.EOF_Codice_Operatore_WS__c == 'VF' && // VF  with no comune listed or VF with comune listed or apparato = '6ONT' or 'ONT Ent' 
                          comuniList.contains(caseExtens.WR_EOFComuneWS__c)) || 
                          (caseExtens.EOF_Codice_Operatore_WS__c == 'VF' &&
                          !comuniList.contains(caseExtens.WR_EOFComuneWS__c) &&
                           (caseExtens.WR_EOFTipologiaApparato__c.containsIgnoreCase('6ONT') ||
                            caseExtens.WR_EOFTipologiaApparato__c.containsIgnoreCase('ONT Enterprise')))
                       ){ 
                           caseExtens.WR_ATT07__c = true;
                       }
                else if (caseExtens.EOF_Codice_Operatore_WS__c != 'TIS' && 
                         caseExtens.EOF_Codice_Operatore_WS__c != 'FW' && 
                         caseExtens.EOF_Codice_Operatore_WS__c != 'GOI' && 
                         caseExtens.EOF_Codice_Operatore_WS__c != 'SKY' && 
                         caseExtens.EOF_Codice_Operatore_WS__c != 'VF' && 
                         caseExtens.EOF_Codice_Operatore_WS__c != 'WN' &&
                         caseExtens.OF_Servizio__c != 'GPON Passiva' && 
                         caseExtens.OF_Servizio__c != 'GPON Passiva CD')// other services != Gpon Passiva, Service TIS, FW, GOI, SKY with servoce != GPON
                {									
                    caseExtens.WR_ATT07__c = true;
                }
            }
            
        }
    }
    // 20-10-2020 - NMC - Regole Bretelle - G.G. - END
    public class WRP001_QuoteWrapper{
        SBQQ__Quote__c quote{set;get;}
        list<SBQQ__QuoteLine__c> quoteLineList{set;get;}
        
        WRP001_QuoteWrapper(){
            quoteLineList=new list<SBQQ__QuoteLine__c>();
        }
    }
    // 1-06-2020 - Nuovo Modello di controllo - J.F. - end
}