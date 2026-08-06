const{test,expect} = require('@playwright/test');


test('Screenshots and Visual Testing', async({page}) =>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    //page level screenshot
    await page.screenshot({path:'WholepageScreenshot.png'});
    //locator level
    await page.getByPlaceholder('Enter Name').screenshot({path:'locatorScreenshot.png'});

});

test('Visual Testing', async({page})=>{

    await page.goto('https://www.google.com');
    await expect(page).toHaveScreenshot('landingPage.png'); //first run will fail because there is no screenshot
}); 
