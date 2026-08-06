const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pageobjects/RegistrationPage');
const { LoginPage } = require('../pageobjects/LoginPage');

//registration details

const firstName = "testfName";
const lastName = "testlName";
const address = "testAddress1";
const city = "testCity";
const state = "testState";
const zipCode = "1234567";
const phoneNumber = "9876543210";
const ssn = "0987654321";

const userName = "testUsertrigger115";
const password = "test@123";
const confirmPassword = "test@123";

/*test('Register for opening an account', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);
    await registrationPage.goTo();
    await registrationPage.clickRegisterLink();
    await registrationPage.signUpForAccountOpening(firstName, lastName, address, city, state, zipCode, phoneNumber, ssn, userName, password, confirmPassword);
    await expect(page.getByText('Your account was created successfully. You are now logged in.')).toBeVisible();
    await registrationPage.logoutAfterCreated();

});*/

test('Login and create a new account', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginLanding();
    await loginPage.loginIntoAccount(userName, password);

});


