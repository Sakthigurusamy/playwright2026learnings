//import test and expect (for assertions)

const{test} = require('@playwright/test');

//test-> two arguments -testName and function whenever if your function is async await must be there

//with browserContext
/*test('Login Method', async({browser}) => {

    //BrowserContext
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://eventhub.rahulshettyacademy.com/login');

});*/

//without browserContext

test("Login Method ", async({browser,page}) =>{

  const userName = "dummytestenv@test.com";
  const password = "Test@125906";

  await page.goto('https://eventhub.rahulshettyacademy.com/login');

  //Login - playwright supports both xpath and css selectors, but recommended to use cssSelectors
  // syntax -> id - tagname#id or #id partial -> suppose [style *= 'none']
  //class -> tagname.className or .className 
  //attributes -> [attribute = 'value']
  //traversing from parent to child parent>>child
  // Immediate sibling >



  await page.locator('input#email').fill(userName);
  await page.locator('input#password').fill(password);
  await page.locator('button#login-btn').click();
  

  //Assertions, handling other UI components like Dropdown, radio btns etc
  










  await page.pause();



});