describe("Testing for repeated recipe names", () => {
  jest.setTimeout(999999999);
  const COFFEE_NAME = "my coffee";
  const COFFEE_NAME2 = "fav coffee";
  const ERROR_MSG = "The recipe name already exists. Please rename your recipe."

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
      // coffee name: my coffee
      await page.waitForXPath('//*[@id="name"]');
      await (await page.$x('//*[@id="name"]'))[0].type(COFFEE_NAME);
      // type: hot
      const hotBtn = await page.$x('//*[@id="hot-coffee"]');
      await hotBtn[0].click();
      // drink: Latte
      let option = (
        await page.$x('//*[@id="drinks-name"]/option[text() = "Latte"]')
      )[0];
      let value = await (await option.getProperty("value")).jsonValue();
      await page.select("#drinks-name", value);
      // size: L
      option = (await page.$x('//*[@id="size-name"]/option[text() = "L"]'))[0];
      value = await (await option.getProperty("value")).jsonValue();
      await page.select("#size-name", value);
      // addOn: milk + cream
      await (await page.$x('//*[@id="milk"]'))[0].click();
      await (await page.$x('//*[@id="cream"]'))[0].click();
  
      // go to review page
      await (
        await page.$x('//*[@id="customize-form"]/div/div[10]/input')
      )[0].click();

      await page.waitForXPath('//*[@id="coffee-name"]');
      await (
          await page.$x('//*[@id="content"]/button')
        )[0].click();

      await page.waitForXPath('//*[@id="home"]/button');
      await (
          await page.$x('//*[@id="home"]/button')
        )[0].click();
      
      await page.waitForXPath('//*[@id="content"]/button[1]');
      await (
          await page.$x('//*[@id="content"]/button[1]')
        )[0].click();

      await page.waitForXPath('/html/body/div/div[2]/div/h2');
      await (
          await page.$x('/html/body/div/div[2]/div/button')
        )[0].click();

      
      await page.waitForXPath('//*[@id="name"]');
      await (await page.$x('//*[@id="name"]'))[0].type(COFFEE_NAME2);
      // type: hot
      const hotBtn2 = await page.$x('//*[@id="hot-coffee"]');
      await hotBtn2[0].click();
      // drink: Latte
      let option2 = (
      await page.$x('//*[@id="drinks-name"]/option[text() = "Latte"]')
      )[0];
      let value2 = await (await option2.getProperty("value")).jsonValue();
      await page.select("#drinks-name", value2);
      // size: L
      option2 = (await page.$x('//*[@id="size-name"]/option[text() = "L"]'))[0];
      value2 = await (await option2.getProperty("value")).jsonValue();
      await page.select("#size-name", value2);
      // addOn: milk + cream
      await (await page.$x('//*[@id="milk"]'))[0].click();
      await (await page.$x('//*[@id="cream"]'))[0].click();

      await (
          await page.$x('//*[@id="customize-form"]/div/div[10]/input') 
        )[0].click();

      await page.waitForXPath('//*[@id="coffee-name"]');
      await (await page.$x('//*[@id="content"]/button'))[0].click(); 

      await page.waitForXPath('//*[@id="page-title"]');
      await (await page.$x('//*[@id="recipe0"]'))[0].click();
  }); 

  it('The page should display an alert for using an existing recipe name when editing a recipe', async function () {
      const inputXPathName = '//*[@id="name"]';
      await page.waitForXPath(inputXPathName);
      for (let i = 0; i < inputXPathName.length; i++) {
          await page.keyboard.press('Backspace');
        }
      await (await page.$x(inputXPathName))[0].type(COFFEE_NAME2);

      page.on('dialog', async dialog => {
          await dialog.accept();
          expect(dialog.message()).toBe(ERROR_MSG);
      });
      
      // go to review page
      await (
        await page.$x('//*[@id="customize-form"]/div/div[10]/input')
      )[0].click();
  });
});
