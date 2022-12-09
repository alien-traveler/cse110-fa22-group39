describe("Testing for repeated recipe names", () => {
  jest.setTimeout(999999999);
  const COFFEE_NAME = "my coffee";
  const TYPE = "Hot";
  const DRINK = "Latte";
  const SIZE = "L";
  const ERROR_MSG =
    "The recipe name already exists. Please rename your recipe.";

  beforeAll(async () => {
    // first takes the test to the home page of app
    await page.goto(
      "https://alien-traveler.github.io/cse110-fa22-group39/webapp/"
    );
    // then takes the test to the create recipes page
    await page.goto(
      "https://alien-traveler.github.io/cse110-fa22-group39/webapp/presetCustomize/presetCustomize.html"
    );

    await (await page.$x("/html/body/div/div[2]/div/button"))[0].click();
    // coffee name: fav coffee
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
    await page.goBack();
  });

  it("The page should display the same contents as before by going back", async function () {
    // checks to see if the user's input reamin the same after using the back button on browser
    await page.waitForXPath('//*[@id="customize-form"]/div/div[1]/div/label');

    expect(
      await page.evaluate(() => document.getElementById("name").value)
    ).toBe(COFFEE_NAME);
    expect(
      await page.evaluate(() => document.getElementById("hot-coffee").checked)
    ).toBe(true);
    expect(
      await page.evaluate(() => document.getElementById("drinks-name")[2].value)
    ).toBe(DRINK);
    expect(
      await page.evaluate(() => document.getElementById("size-name")[3].value)
    ).toBe(SIZE);

    const caramelCheckbox = await page.waitForXPath('//*[@id="caramel"]');
    const carmelCheckboxVal = await (
      await caramelCheckbox.getProperty("checked")
    ).jsonValue();
    expect(carmelCheckboxVal).toBe(false);

    const sugarCheckbox = await page.waitForXPath('//*[@id="sugar"]');
    const sugarCheckboxVal = await (
      await sugarCheckbox.getProperty("checked")
    ).jsonValue();
    expect(sugarCheckboxVal).toBe(false);

    const extraShotCheckbox = await page.waitForXPath('//*[@id="extra-shot"]');
    const extraShotCheckboxVal = await (
      await extraShotCheckbox.getProperty("checked")
    ).jsonValue();
    expect(extraShotCheckboxVal).toBe(false);

    const milkCheckbox = await page.waitForXPath('//*[@id="milk"]');
    const milkCheckboxVal = await (
      await milkCheckbox.getProperty("checked")
    ).jsonValue();
    expect(milkCheckboxVal).toBe(true);

    const creamCheckbox = await page.waitForXPath('//*[@id="cream"]');
    const creamCheckboxVal = await (
      await creamCheckbox.getProperty("checked")
    ).jsonValue();
    expect(creamCheckboxVal).toBe(true);

    const waterCheckbox = await page.waitForXPath('//*[@id="water"]');
    const waterCheckboxVal = await (
      await waterCheckbox.getProperty("checked")
    ).jsonValue();
    expect(waterCheckboxVal).toBe(false);
  });
});
