const {test,expect} = require('@playwright/test');

//play around with locators and assertions

test('Locators Practice', async({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://testautomationpractice.blogspot.com/');

    //Textbox -> fill
    await page.locator("#name").fill("sakthi");
    //Checkboxes and verify the selection different ways
    
    await page.locator("input[type = 'checkbox'][value = 'monday']").check();

    expect(await page.locator("input[type = 'checkbox'][value = 'monday']")).toBeChecked();

    //dropdown
    await page.locator("#country").selectOption("India");

    //window handling and alerts 
    //listen for new page before triggering any action

    const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        page.getByRole('link',{name:'Apple'}).click(),

    ]);

    //interacting with new Page loaded
    await newPage.waitForLoadState();
    await expect(newPage).toHaveTitle('Apple'); 
  

});