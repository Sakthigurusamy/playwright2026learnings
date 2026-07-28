//Create an Event and full booking flow 

const { test ,expect} = require('@playwright/test');

//here we're using resuable helper function loginpage so that we can call whenever required in tests
//and setting BASE_URL 

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const userName = "dummytestenv@test.com";
const password = "Test@125906";

//helper function

async function login(page) {
    await page.goto(`${BASE_URL}/login`);

    await page.locator('input#email').fill(userName);
    await page.locator('input#password').fill(password);
    await page.locator('button#login-btn').click();
    
    await expect(page.locator("//span[text() = 'Browse Events →']")).toBeVisible();

    //expect(await page.locator("//span[text() = 'Browse Events →']")).toBeVisible();

}

test('Create Event' , async({page}) =>{

    await login(page);
    await page.goto(`${BASE_URL}/admin/events`);
});