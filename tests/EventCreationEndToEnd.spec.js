//Create an Event and full booking flow 

const { test ,expect} = require('@playwright/test');

//here we're using resuable helper function loginpage so that we can call whenever required in tests
//and setting BASE_URL 

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const userName = "dummytestenv@test.com";
const password = "Test@125906";
let seatsBeforeBooking;
let seatsAfterBooking;
const Event = "Tamil DJ Musical Night";
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
    await page.getByLabel('Title').fill(Event);
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
    console.log(`Event Created Successfully: ${Event}`);
    //await page.pause();

});


test("Find the Events and book seats", async({page}) => {

    await login(page);

    await page.goto(`${BASE_URL}/events`);

    //get the number of events present in there
    await page.locator('div #event-card').first().waitFor(); //wait for pageLoad
    await expect(page.locator('div #event-card').first()).toBeVisible(); //assert the first is visible
    const Events = await page.locator('div #event-card');
    console.log("Currently there are " +await Events.count() +" events are going to happening"); //get the count

    //iterate and find our event and book for the same

    for(let i = 1 ; i < await Events.count(); i++){
        
        if(await Events.locator("h3").nth(i).textContent() === Event){ 
            //get the number of seats before booking
            seatsBeforeBooking = parseInt(await Events.getByText('seats').nth(i).innerText());
            console.log(`seatsBeforeBooking : ${seatsBeforeBooking}`);
            //click Book button
            await Events.locator('#book-now-btn').nth(i).click();
            break;
        }
    }

    //Book Tickets 
    const ticketCount= await page.locator("span[class *= 'ticket-count']");
    await expect(ticketCount).toHaveText('1');
    await page.getByLabel('Full Name').fill("Sakthi");
    await page.getByLabel('Email').fill("xyz@test.com");
    await page.getByLabel('Phone Number').fill("9876543210");
    await page.getByRole('button',{name:'Confirm Booking'}).click();

    //Take the booking reference number and store it

    const bookingRef = await page.locator("span[class *= 'booking-ref']").first();
    await expect(bookingRef).toBeVisible();
    //console.log(`Booking Reference: ${await bookingRef.textContent()}`);

    const bookingDetailsRef = (await page.locator("span[class *= 'booking-ref']").innerText()).trim();
    console.log(`Booking Reference Details: ${bookingDetailsRef}`);

    //Verify the bookings
    await page.getByRole('link',{name:'View My Bookings'}).click();

    //Assert the URL
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

    await page.locator('#booking-card').first().waitFor();
    await expect(page.locator('#booking-card').first()).toBeVisible();

    const bookingDetails = await page.locator('#booking-card');

    //Instead of for loop, using filter

    const matchedBookingDetails = bookingDetails.filter({has:page.locator(".booking-ref"),hasText:bookingDetailsRef});
    await expect(matchedBookingDetails).toBeVisible();
    await expect(matchedBookingDetails).toContainText(Event);

    //verify the seat is reduced after booking

    await page.goto(`${BASE_URL}/events`);

    await page.locator('div #event-card').first().waitFor(); //wait for pageLoad
    await expect(page.locator('div #event-card').first()).toBeVisible();
    //Filter the event
    const bookedEvent = Events.filter({hasText:Event}).first();
    await expect(bookedEvent).toBeVisible();

    //seat reduction
    seatsAfterBooking = parseInt(await bookedEvent.getByText('seat').first().innerText());
    console.log(`Seats After Booking : ${seatsAfterBooking}`);

    await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);



    
    




    
    
    




});