class RegistrationPage{

    constructor(page){
        this.page = page;
        //locators live here 
        this.registerLink = page.locator("a:has-text('Register')");
        this.firstNameInput = page.locator("input[id = 'customer.firstName']");
        this.lastNameInput = page.locator("input[id = 'customer.lastName']");
        this.addressInput = page.locator("input[id = 'customer.address.street']");
        this.cityInput = page.locator("input[id = 'customer.address.city']");
        this.stateInput = page.locator("input[id = 'customer.address.state']");
        this.zipcodeInput = page.locator("input[id = 'customer.address.zipCode']");
        this.phonenumberInput = page.locator("input[id = 'customer.phoneNumber']");
        this.ssnInput = page.locator("input[id = 'customer.ssn']");
        this.usernameInput = page.locator("input[id = 'customer.username']");
        this.passwordInput = page.locator("input[id = 'customer.password']");
        this.confirmpasswordInput = page.locator('input#repeatedPassword');
        this.registerButton = page.locator("input[value='Register']");
        this.logoutButton = page.getByRole('link', { name: 'Log Out' });

    }

    async goTo(page){
        await this.page.goto("https://parabank.parasoft.com/parabank/index.htm");
        await this.page.waitForLoadState("networkidle");
    }

    async clickRegisterLink(page){
        await this.registerLink.click();
    }

    async signUpForAccountOpening(firstName,lastName,address,city,state,zipCode,phoneNumber,ssn,userName,password,confirmPassword){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.addressInput.fill(address);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.zipcodeInput.fill(zipCode);
        await this.phonenumberInput.fill(phoneNumber);
        await this.ssnInput.fill(ssn);
        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.confirmpasswordInput.fill(confirmPassword);
        await this.registerButton.click();

    }

    async logoutAfterCreated(){
        await this.logoutButton.click();
    }
}

module.exports = {RegistrationPage};