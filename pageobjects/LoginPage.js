class LoginPage{

    constructor(page){
        this.page = page;
        this.userNameInput = page.locator("input[name = 'username']");
        this.passwordInput = page.locator("input[name = 'password']");
        this.loginButton = page.locator("input[value= 'Log In']");
    }

    async loginLanding(page){
        await this.page.goto("https://parabank.parasoft.com/parabank/register.htm");
        await this.page.waitForLoadState("networkidle");
    }

    async loginIntoAccount(userName,password){
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = {LoginPage};