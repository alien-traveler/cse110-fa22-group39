describe("Testing for repeated recipe names", () => {
  jest.setTimeout(999999999);
  const COFFEE_NAME = "try this";
  const TYPE = "Cold";
  const DRINK = "Cappuccinos";
  const SIZE = "S";

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
    // coffee name: bad coffee
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

    // go to saved recipe page
    await page.waitForXPath('//*[@id="coffee-name"]');
    await (await page.$x('//*[@id="content"]/button'))[0].click();

    // go to the view/edit page of a recipe
    await page.waitForXPath('//*[@id="home"]/button');
    await (await page.$x('//*[@id="recipe0"]'))[0].click();

    await page.waitForXPath('//*[@id="name"]');
    // type: Cold
    const coldBtn = await page.$x('//*[@id="cold-coffee"]');
    await coldBtn[0].click();
    // drink: Cappuccinos
    option = (
      await page.$x('//*[@id="drinks-name"]/option[text() = "Cappuccinos"]')
    )[0];
    value = await (await option.getProperty("value")).jsonValue();
    await page.select("#drinks-name", value);
    // size: S
    option = (await page.$x('//*[@id="size-name"]/option[text() = "S"]'))[0];
    value = await (await option.getProperty("value")).jsonValue();
    await page.select("#size-name", value);
    // addOn: Caramel + Sugar + Extra Shot + Water
    await (await page.$x('//*[@id="caramel"]'))[0].click();
    await (await page.$x('//*[@id="sugar"]'))[0].click();
    await (await page.$x('//*[@id="extra-shot"]'))[0].click();
    await (await page.$x('//*[@id="water"]'))[0].click();
    // addOn: Unclick Milk + Cream
    await (await page.$x('//*[@id="milk"]'))[0].click();
    await (await page.$x('//*[@id="cream"]'))[0].click();

    // go back to the review page
    await (
      await page.$x('//*[@id="customize-form"]/div/div[10]/input')
    )[0].click();
  });

  it("test the review process after editing recipe", async () => {
    // check review page has the same info as user's input

    // wait until page is loaded
    const nameXPath = '//*[@id="coffee-name"]';
    await page.waitForXPath(nameXPath);

    expect(
      await page.evaluate(
        () => document.getElementById("custom-coffee-name").value
      )
    ).toBe(TYPE);
    expect(
      await page.evaluate(
        () => document.getElementById("drink-type-input").value
      )
    ).toBe(DRINK);
    expect(
      await page.evaluate(
        () => document.getElementById("size-type-input").value
      )
    ).toBe(SIZE);

    const caramelCheckbox = await page.waitForXPath('//*[@id="caramel"]');
    const carmelCheckboxVal = await (
      await caramelCheckbox.getProperty("checked")
    ).jsonValue();
    expect(carmelCheckboxVal).toBe(true);

    const sugarCheckbox = await page.waitForXPath('//*[@id="sugar"]');
    const sugarCheckboxVal = await (
      await sugarCheckbox.getProperty("checked")
    ).jsonValue();
    expect(sugarCheckboxVal).toBe(true);

    const extraShotCheckbox = await page.waitForXPath('//*[@id="extra-shot"]');
    const extraShotCheckboxVal = await (
      await extraShotCheckbox.getProperty("checked")
    ).jsonValue();
    expect(extraShotCheckboxVal).toBe(true);

    const milkCheckbox = await page.waitForXPath('//*[@id="milk"]');
    const milkCheckboxVal = await (
      await milkCheckbox.getProperty("checked")
    ).jsonValue();
    expect(milkCheckboxVal).toBe(false);

    const creamCheckbox = await page.waitForXPath('//*[@id="cream"]');
    const creamCheckboxVal = await (
      await creamCheckbox.getProperty("checked")
    ).jsonValue();
    expect(creamCheckboxVal).toBe(false);

    const waterCheckbox = await page.waitForXPath('//*[@id="water"]');
    const waterCheckboxVal = await (
      await waterCheckbox.getProperty("checked")
    ).jsonValue();
    expect(waterCheckboxVal).toBe(true);

    expect(
      await page.evaluate(() => document.getElementById("shopName1").value)
    ).toBe("Starbucks");
  });
});
