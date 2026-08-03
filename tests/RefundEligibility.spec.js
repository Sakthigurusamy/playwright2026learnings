const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const userName = "dummytestenv@test.com";
const password = "Test@125906";


async function login(page) {

    await page.goto(`${BASE_URL}/login`);

    await page.locator('input#email').fill(userName);
    await page.locator('input#password').fill(password);
    await page.locator('button#login-btn').click();

    await expect(page.locator("//span[text() = 'Browse Events →']")).toBeVisible();

}

test('Eligible for Refund', async ({ page }) => {

    await login(page);

    //navigate to events and book single ticket

    await page.goto(`${BASE_URL}/events`);

    // const Events = await page.locator('div #event-card');
    //await page.locator('#event-card').first().waitFor();
    //Book first event

    await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();

    await page.getByLabel('Full Name').fill("Sakthi");
    await page.getByLabel('Email').fill("xyz@test.com");
    await page.getByLabel('Phone Number').fill("9876543210");
    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    await page.getByTestId('nav-bookings').click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.locator('#booking-card').first().waitFor();

    await page.locator('#booking-card').first().getByRole('button', { name: 'View Details' }).click();

    await expect(page.getByText('Booking Information')).toBeVisible();

    const bookingRef = await page.locator('span.rounded-lg').innerText();
    console.log(bookingRef);

    const eventTitle = await page.locator('h1').innerText();
    console.log(eventTitle);

    //bookingRef firstletter and event firstLetter should be match

    await expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

    //check Refund eligibility
    await page.getByRole('button', { name: "Check eligibility for refund?" }).click();

    await expect(page.locator('#refund-spinner')).toBeVisible();

    //nolonger spinner is visible after 6seconds
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

    //validate the refund eligibility
    await expect(page.getByTestId('refund-result')).toBeVisible();

    await expect(page.locator('#refund-result span strong ')).toContainText('Eligible for refund.');
    await expect(page.locator('#refund-result span')).toContainText(' Single-ticket bookings qualify for a full refund.');


});

//Test-2 Refund not eligible

test('Not eligible for refund', async ({ page }) => {

    await login(page);

    //navigate to events and book single ticket

    await page.goto(`${BASE_URL}/events`);

    await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();

    //book 3 tickets
    await page.getByRole('button', { name: '+' }).click(); //2
    await page.getByRole('button', { name: '+' }).click(); //3 tickets


    await page.getByLabel('Full Name').fill("Sakthi");
    await page.getByLabel('Email').fill("xyz@test.com");
    await page.getByLabel('Phone Number').fill("9876543210");
    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    await page.getByTestId('nav-bookings').click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.locator('#booking-card').first().waitFor();

    await page.locator('#booking-card').first().getByRole('button', { name: 'View Details' }).click();

    await expect(page.getByText('Booking Information')).toBeVisible();

    const bookingRef = await page.locator('span.rounded-lg').innerText();
    console.log(bookingRef);

    const eventTitle = await page.locator('h1').innerText();
    console.log(eventTitle);

    //bookingRef firstletter and event firstLetter should be match

    await expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

    //check Refund eligibility
    await page.getByRole('button', { name: "Check eligibility for refund?" }).click();

    await expect(page.locator('#refund-spinner')).toBeVisible();

    //nolonger spinner is visible after 6seconds
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

    //validate the refund eligibility

    const bulkRefund = await page.getByTestId('refund-result');
    await expect(bulkRefund).toBeVisible();
    await expect(bulkRefund).toContainText('Not eligible for refund.');
    await expect(bulkRefund).toContainText('Group bookings (3 tickets) are non-refundable.');

});