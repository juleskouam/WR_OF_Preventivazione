public class WR_indexControllerApexNew {
    
    @AuraEnabled
public static Task__c getTask(Id recordId) {
    System.debug('WR_indexControllerApexNew.getTask.recordId: ' + recordId);
  return[SELECT Id, WR_Tipologia_Richiesta__c, WR_Cluster__c FROM Task__c WHERE Id=:recordId];
  
    }
    
@AuraEnabled
public static String updateTask(Id recordId,String statuts,boolean c1,boolean c2,boolean c3,boolean c4,boolean c5,boolean c6) {
  Task__c task=[SELECT WR_Tipologia_Richiesta__c,Status__c,WR_Nessuna_attivit_OL_espletabile__c,WR_Nessuna_attivit_OL_non_espletabile__c,WR_Tratta_soggetta_ad_IRUdaPTA_PTE_ROE_a__c,WR_Opere_civili_da_PTA_PTE_ROE_a_UI__c,WR_IRU_tra_POP_PTA_PTE_ROE__c,WR_Opere_Civili_tra_POP_PTA_PTE_ROE__c FROM Task__c WHERE Id=:recordId];
  task.Status__c=statuts;
  task.WR_Nessuna_attivit_OL_espletabile__c=c1;
  task.WR_Nessuna_attivit_OL_non_espletabile__c=c2;
  task.WR_Tratta_soggetta_ad_IRUdaPTA_PTE_ROE_a__c=c3;
  task.WR_Opere_civili_da_PTA_PTE_ROE_a_UI__c=c4;
  task.WR_IRU_tra_POP_PTA_PTE_ROE__c=c5;
  task.WR_Opere_Civili_tra_POP_PTA_PTE_ROE__c=c6;
  update task;
   return 'SUCCES';
    }
    @AuraEnabled
public static String updateTaskWhitNote(Id recordId,String statuts,String notec,boolean c1,boolean c2,boolean c3,boolean c4,boolean c5,boolean c6) {
  Task__c task=[SELECT WR_Tipologia_Richiesta__c,Status__c,WR_Note__c,WR_Nessuna_attivit_OL_espletabile__c,WR_Nessuna_attivit_OL_non_espletabile__c,WR_Tratta_soggetta_ad_IRUdaPTA_PTE_ROE_a__c,WR_Opere_civili_da_PTA_PTE_ROE_a_UI__c,WR_IRU_tra_POP_PTA_PTE_ROE__c,WR_Opere_Civili_tra_POP_PTA_PTE_ROE__c FROM Task__c WHERE Id=:recordId];
  task.Status__c=statuts;
  task.WR_Note__c=notec;
  task.WR_Nessuna_attivit_OL_espletabile__c=c1;
  task.WR_Nessuna_attivit_OL_non_espletabile__c=c2;
  task.WR_Tratta_soggetta_ad_IRUdaPTA_PTE_ROE_a__c=c3;
  task.WR_Opere_civili_da_PTA_PTE_ROE_a_UI__c=c4;
  task.WR_IRU_tra_POP_PTA_PTE_ROE__c=c5;
  task.WR_Opere_Civili_tra_POP_PTA_PTE_ROE__c=c6;
  update task;
   return 'SUCCES';
    }
    
 @AuraEnabled
public static String updateTaskWhitFWA(Id recordId,String statuts,String elementoFWA1,String elementoFWA2,String elementoFWA3,String elementoFWA4,String elementoFWA5) {
  Task__c task=[SELECT WR_Tipologia_Richiesta__c,Status__c,WR_Installazione_Palo_fino_a_3_m__c,WR_Lunghezza_Palo__c,WR_Installazione_Palo_telescopico_oltre__c,WR_Lunghezza_Palo_Telescopico__c,WR_Installazione_Piattaforma_Aerea__c FROM Task__c WHERE Id=:recordId];
  task.Status__c=statuts;
  task.WR_Installazione_Palo_fino_a_3_m__c=elementoFWA1;
  task.WR_Lunghezza_Palo__c=elementoFWA2;
  task.WR_Installazione_Palo_telescopico_oltre__c=elementoFWA3;
  task.WR_Lunghezza_Palo_Telescopico__c=elementoFWA4;
  task.WR_Installazione_Piattaforma_Aerea__c=elementoFWA5;
  update task;
   return statuts;
    }
    
//new version----------------------------------------------------------------------------------
 @AuraEnabled
public static Void getProductMatch(Id recordId, List<String> riferimentos) {
 System.debug('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'+riferimentos + 'recordId' +recordId);
    List<Product2> produits=[SELECT id FROM Product2 WHERE ProductCode IN :riferimentos];
    Task task=[SELECT Id,WhatId FROM Task WHERE ID=:recordId];
    Id idListaProducto=(Id)task.WhatId;
    List<Product2> listp=new List<Product2>();
    List<Product2> produitsdelete=[SELECT id,listaProdotto__c FROM Product2 WHERE listaProdotto__c=:idListaProducto];
    System.debug(produitsdelete);
    for(Product2 p:produitsdelete){
        Product2 pr2=new Product2(id=p.id,listaProdotto__c=null);
        listp.add(pr2);
    }
    update listp;
    List<Product2> listp1=new List<Product2>();
    for(Product2 p:produits){
        Product2 pr2=new Product2(id=p.id,listaProdotto__c=idListaProducto);
        listp1.add(pr2);
    }
    update listp1;
    }
    
     @AuraEnabled
public static List<Product2> getProductMatchTasck(Id recordId) {
   Task task=[SELECT Id,WhatId FROM Task WHERE ID=:recordId];
    Id idListaProducto=(Id)task.WhatId;
    List<Product2> products=[SELECT id,ProductCode,Name,listaProdotto__c FROM Product2 WHERE listaProdotto__c=:idListaProducto];
    return products;
    
    }
//last version---------------------------------------------------------------------------------    
    @AuraEnabled
public static Void getProductMatch_last(Id recordId, List<String> riferimentos, String note) {
 System.debug('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'+riferimentos + 'recordId' +recordId);
    List<Product2> produits=[SELECT id,ProductCode,Name FROM Product2 WHERE ProductCode IN :riferimentos];
    Task__c task=[SELECT id,WR_Note__c FROM Task__c WHERE id=:recordId];
    task.WR_Note__c=note;
    //String idtask=(String)recordId;
    //List<Task> tasks=[SELECT Id FROM Task WHERE ID=:recordId];
    List<ProducTask__c> productasks=[SELECT id,Product__c,idTask__c FROM ProducTask__c WHERE task__c=:recordId];
    if(!productasks.isEmpty()){
    DELETE productasks;
    }
    
    List<ProducTask__c> productasksave=new List<ProducTask__c>();
    for(Product2 p:produits){
        ProducTask__c pt=new ProducTask__c();
        pt.Name=p.ProductCode;
        pt.WR_Nome__c=p.Name;
        pt.task__c=recordId;
        pt.Product__c=p.id;
        productasksave.add(pt);
        
    }
    System.debug('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ avant' +productasksave);
    update task;
    insert productasksave;
    System.debug('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ recordId' +productasksave);
    System.debug(produits);
    }

    
     @AuraEnabled
public static List<Product2> getProductMatchTasck_last(Id recordId) {
    List<ProducTask__c> producTasks=[SELECT id,Product__c FROM ProducTask__c WHERE Task__c=:recordId];
    System.debug('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ recordId' +producTasks);
    List<ID> idProductselect=new List<ID>();
    for(ProducTask__c pt:producTasks){
        idProductselect.add(pt.Product__c);
    }
    List<Product2> products=[SELECT ProductCode,Name,Description FROM Product2 WHERE ID IN :idProductselect];
    System.debug('productasksave'+producTasks);
    return products;
    
    }
    
  //controlleur pour chargement des produit de spécialité@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  
 @AuraEnabled     
 public static List<Product2> getProduct2() {
    List<PricebookEntry> products=[select id, Name, Product2.name,Product2.ProductCode ,Pricebook2.Name  from PricebookEntry where Pricebook2.Name  = 'Opere Speciali Extra CD'];
    List<Product2> produits=new List<Product2>();
     for(PricebookEntry pbk:products){
         Product2 p=new Product2();
         p.Name=pbk.Product2.name;
         p.ProductCode=pbk.Product2.ProductCode;
         produits.add(p);
     }
    System.debug(products);
    return produits;
    }
 
}