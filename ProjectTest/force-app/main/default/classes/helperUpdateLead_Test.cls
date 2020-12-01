@isTest
public class helperUpdateLead_Test {
@testSetup static void setup() {
        Account acct = new Account(Name='SFDC Account');
        insert acct;
        Contact con = new Contact(
        FirstName='Joe',
        LastName='Smith',
        Phone='415.555.1212',
        AccountId=acct.id,
        Department='programeur',
        Standard_Qualification__c='0.NC - Non qualificato',
        Email='julioskouamour@gmail.com');
    insert con;
    
    CampaignMember cm=new CampaignMember();
    
    insert cm;
       /* Lead myLead = new Lead(
        LastName = 'Fry',
        FirstName='Julio',
        Company='Fry And Sons',
        Email='julioskouamour@gmail.com',
        Standard_Department__c='Acquisti',
        Standard_Qualification__c='0.NC - Non qualificato',
        Partner__c=con.id,
        Company_Group_lkup__c=acct.id,
        isWebToLead__c=true);
    insert myLead;*/
        
    }
@isTest
    static void createLeadTest(){
        Account acc=[Select id from Account Limit 1];
        CampaignMember cm=[select id from CampaignMember limit 1];
        String s=String.valueOf(cm.id);
        Lead myLead = new Lead(
        LastName = 'Fry',
        FirstName='Julio',
        Company='Fry And Sons',
        Email='julioskouamour@gmail.com',
        isWebToLead__c=true,
        CampaignId__c=s);

        insert myLead; 
    }
}