class AccountOpeningPage{

    constructor(page){
        this.page = page;
        //type of account (Savings/Checking)
        this.accountType = page.locator("select#type");
        //minimum $100 must be deposited,through existing account

    }
}