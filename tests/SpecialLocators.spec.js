const { test, expect } = require('@playwright/test');

//TimeOut -> global level(in config file), step level, test level (using expect.configure())

test('Special Locators with Timeouts', async ({ page }) => {

    page.setDefaultTimeout(10000); //test level action timeout
    test.setTimeout(2000); //test level test timeout

    const slowExpection = expect.configure({timeout:8000});

    //getByLabel, Role , text etc

    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    await page.getByLabel('Check me out if you Love IceCreams!').check({timeout:3000}); //step level action timeout

    await page.getByPlaceholder('Password').fill('abc@123');

    //Global Expect Timeout is 5seconds we can override only for particular step

    await expect(page.getByLabel('Check me out if you Love IceCreams!')).toBeChecked({ timeout: 12000 });

    await page.getByRole('link',{name:'Shop'}).click();

    await slowExpection(page.locator('h1.my-4')).toHaveText('Shop'); //test level expection








});