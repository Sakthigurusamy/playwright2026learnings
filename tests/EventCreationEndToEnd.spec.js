//Create an Event and full booking flow 

const { test ,expect} = require('@playwright/test');
const { log } = require('node:console');

//here we're using resuable helper function loginpage so that we can call whenever required in tests
//and setting BASE_URL 

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const userName = "dummytestenv@test.com";
const password = "Test@125906";
let seatsBeforeBooking;
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
    //special locators -> getByRole, getByLabel etc
    await page.getByLabel('Title').fill("Tamil DJ Music Night");
    await page.getByPlaceholder("Describe the event…").fill("Event for DJ Lovers... Come and have fun");
    await page.getByLabel('Category').selectOption('Concert');
    await page.getByLabel('City').fill("Madurai");
    await page.getByLabel('Venue').fill("Hotel Alpha 2nd Floor, Sivagangai Road, Madurai");
    await page.getByLabel('Event Date & Time').fill("2026-08-16T18:00");
    await page.getByLabel('Price').fill("50");
    await page.getByLabel('Total Seats').fill("100");
    //await page.getByLabel('Image URL (optional)').fill("https://www.google.com/search?q=dj+images&oq=dj+images+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDM2NThqMGo3qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8#sv=CAMSZxowKg5SRGg4ZGxQbFFNVXFiTTIOUkRoOGRsUGxRTVVxYk06DndRbU9LakhSelFPeThNIAQqLwobX3dmVnBhcUNJRXIyaG5lc1Bnb1RRNlFvXzUyEg5SRGg4ZGxQbFFNVXFiTRgAMAEYByCu2b3IDkoIEAEYASABKAE");
    await page.getByRole('button',{name:'+ Add Event'}).click();
    await expect(page.getByText("Event created!")).toBeVisible();
    //await page.pause();

});


test("Find the Events and book seats", async({page}) => {

    await login(page);

    await page.goto(`${BASE_URL}/events`);

    //get the number of events present in there

    const myEvent = "Tamil DJ Music Night"; //later we will modify dynamically

    await page.locator('div #event-card').first().waitFor(); //wait for pageLoad
    await expect(page.locator('div #event-card').first()).toBeVisible(); //assert the first is visible
    const Events = await page.locator('div #event-card');
    console.log("Currently there are " +await Events.count() +" events are going to happening"); //get the count

    //iterate and find our event and book for the same

    for(let i = 1 ; i < await Events.count(); i++){
        
        if(await Events.locator("h3").nth(i).textContent() === myEvent){ 
            //get the number of seats before booking
            seatsBeforeBooking = parseInt(await Events.getByText('seats').nth(i).innerText());
            console.log(`seatsBeforeBooking : ${seatsBeforeBooking}`);
            //click Book button
            await Events.locator('#book-now-btn').nth(i).click();
            break;
        }
    }

    //Book Tickets 
    




});