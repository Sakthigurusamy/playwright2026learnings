const{test,expect} = require('@playwright/test');

test('Alert Handling', async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    //Simple Alert

    page.on('dialog', async dialog => {

        console.log(dialog.type()); //alert
        console.log(dialog.message());
        await dialog.accept();

    });

    await page.getByRole('button',{name:"Simple Alert"}).click();

    //Confirmation Alert

    page.on('dialog', async dialog =>{
        console.log(dialog.type()); //confirm
        console.log(dialog.message());
        await dialog.accept();
    });
     await page.getByRole('button',{name:"Confirmation Alert"}).click();
     await expect(page.getByText('You pressed OK!')).toBeVisible();

    //Prompt Alert
    page.on('dialog', async dialog =>{
        console.log(dialog.type()); //prompt
        console.log(dialog.defaultValue()); //prefilled value
        await dialog.accept('Sakthi'); // it will type Sakthi there and click Ok
    });
    await page.getByRole('button',{name:"Prompt Alert"}).click();
    await expect(page.getByText('Hello Sakthi! How are you today?')).toBeVisible({timeout:70000});

    //frames
   // const framePage = page.frameLocator();
   // framePage.locator();

   //hover
   await page.getByRole('button',{name:"Point Me"}).hover();


});