import puppeteer from 'puppeteer';

describe('show or hide an event details', () => {
    let browser;
    let page;
    jest.setTimeout(40000)
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false, //turns off headless which test only in the terminal allowing for the test to take place in the real browser
            slowMo: 250, //Slow down the speed to 250ms so i can better monitor
            ignoreDefaultArgs: ['--disable-extensions'],//ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to its details', async () => {
        await page.click('.event .details-button');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event and hide its details', async () => {
        await page.click('.event .details-button');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();//Null makes the event details no longer exist
    });
});