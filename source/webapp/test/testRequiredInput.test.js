describe("Testing required input fields", () => {
    jest.setTimeout(999999999);
    const COFFEE_NAME = "new coffee";

    beforeAll(async () => {
      // first takes the test to the home page of app
      await page.goto(
        "https://alien-traveler.github.io/cse110-fa22-group39/webapp/"
    );
      // then takes the test to the create recipes page
      await page.goto(
        "https://alien-traveler.github.io/cse110-fa22-group39/webapp/presetCustomize/presetCustomize.html"
    );
        
        await (await page.$x('/html/body/div/div[2]/div/button'))[0].click();
    });

    it('The page should remain on "Customized Recipes" if "recipe name" is not filled', async function () {
        await page.waitForXPath('//*[@id="name"]');
        await (
            await page.$x('//*[@id="customize-form"]/div/div[10]/input')
          )[0].click();
        await expect(page.title()).resolves.toMatch('Customize recipes');
     });

     it('The page should remain on "Customized Recipes" if "coffee type" is not chosen', async function () {
        await page.waitForXPath('//*[@id="name"]');
        await (await page.$x('//*[@id="name"]'))[0].type(COFFEE_NAME);
        await (
            await page.$x('//*[@id="customize-form"]/div/div[10]/input')
          )[0].click();
        await expect(page.title()).resolves.toMatch('Customize recipes');
     });

     it('The page should remain on "Customized Recipes" if "choose your drink" is not chosen', async function () {
        await page.waitForXPath('//*[@id="name"]');
        await (await page.$x('//*[@id="name"]'))[0].type(COFFEE_NAME);
        const hotBtn = await page.$x('//*[@id="hot-coffee"]');
        await hotBtn[0].click();
        await (
            await page.$x('//*[@id="customize-form"]/div/div[10]/input')
          )[0].click();
        await expect(page.title()).resolves.toMatch('Customize recipes');
     });

     it('The page should remain on "Customized Recipes" if "size" is not chosen', async function () {
        await page.waitForXPath('//*[@id="name"]');
        await (await page.$x('//*[@id="name"]'))[0].type(COFFEE_NAME);
        const hotBtn = await page.$x('//*[@id="hot-coffee"]');
        await hotBtn[0].click();
        let option = (await page.$x('//*[@id="drinks-name"]/option[text() = "Latte"]'))[0];
        let value = await (await option.getProperty("value")).jsonValue();
        await page.select("#drinks-name", value);
        await (
            await page.$x('//*[@id="customize-form"]/div/div[10]/input')
          )[0].click();
        await expect(page.title()).resolves.toMatch('Customize recipes');
     });
});
