/**
 * Handler for TTM_StatusHandler 
 * @author Hermann
 * @version 1.0
 * @description Handler Class  for mapping status TTM_Diagnosi and TTM_Ticket
 * @history
 * 2020-12-01 : Hermann – Original
 */ 
public with sharing class TTM_StatusHandler {
    
    static final String TTM_STATO_DIAGNOSI_PESI = 'TTM Stato Diagnosi Pesi';
    static final String STATO_DA_DISPACCIARE = 'Da Dispacciare';
    static final String STATO_IN_APPUNTAMENTO = 'In Appuntamento';
    static final String STATO_ON_FIELD = 'On Field';
    static final String STATO_SOSPESO = 'Sospeso';
    static final String STATO_COLLAUDO_TEC = 'Collaudo Tecnico';
    static final String STATO_IN_CARICO = 'In carico';
    @InvocableMethod
    public static void changeStatus(List<id> recordID){
        List<TTM_Diagnosi__c> listDia=[select id,TTM_Stato__c from TTM_Diagnosi__c where TTM_TroubleTicket__c=:recordID];
        String statu='';
        TTM_Stato_Diagnosi__c cs=TTM_Stato_Diagnosi__c.getValues(TTM_STATO_DIAGNOSI_PESI);
        integer pesi=integer.valueOf(cs.Max__c);
        for(TTM_Diagnosi__c d:listDia){
            if(d.TTM_Stato__c==STATO_DA_DISPACCIARE){
                integer dadispacciare=integer.valueOf(cs.DA_DISPACCIARE__c);
                if(dadispacciare<=pesi){
                    pesi=dadispacciare;
                    statu=d.TTM_Stato__c;
                }
            }else{   if(d.TTM_Stato__c==STATO_IN_APPUNTAMENTO){
                integer inapp=integer.valueOf(cs.IN_APPUNTAMENTO__c);
                if(inapp<=pesi){
                    pesi=inapp;
                    statu=d.TTM_Stato__c;
                }
            }else{
                if(d.TTM_Stato__c==STATO_ON_FIELD){
                integer onfield=integer.valueOf(cs.ON_FIELD__c);
                if(onfield<=pesi){
                    pesi=onfield;
                    statu=d.TTM_Stato__c;
                }else{
                    if(d.TTM_Stato__c==STATO_SOSPESO){
                integer sospeso =integer.valueOf(cs.SOSPESO__c);
                if(sospeso<=pesi){
                    pesi=sospeso;
                    statu=d.TTM_Stato__c;
                }else{
                    if(d.TTM_Stato__c==STATO_COLLAUDO_TEC){
                integer collaudo =integer.valueOf(cs.COLLAUDO_TECNICO__c);
                if(collaudo<=pesi){
                    pesi=collaudo;
                    statu=d.TTM_Stato__c;
                }else{
                    if(d.TTM_Stato__c==STATO_IN_CARICO){
                integer incarico =integer.valueOf(cs.IN_CARICO__c);
                if(incarico<=pesi){
                    pesi=incarico;
                    statu=d.TTM_Stato__c;
               }
              }
             }
            }
          }
        } 
      }
    }
  }
 }
}
  TTM_TroubleTicket__c tt=new TTM_TroubleTicket__c(id=recordID[0],TTM_Stato__c=statu);
  update tt;
    }

}