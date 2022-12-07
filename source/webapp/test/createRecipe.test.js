describe("Test customize recipe", () => {
  jest.setTimeout(999999999);
  const COFFEE_NAME = "my coffee";
  const TYPE = "Hot";
  const DRINK = "Latte";
  const SIZE = "L";

  beforeAll(async () => {
    // to load shop localStorage
    await page.goto(
      "https://alien-traveler.github.io/cse110-fa22-group39/source/webapp/"
    );
    await page.goto(
      "https://alien-traveler.github.io/cse110-fa22-group39/source/webapp/presetCustomize/presetCustomize.html"
    );

    await page.click("body > div.row > div.column2 > div > button");
    // await page.goto(
    //     'https://alien-traveler.github.io/cse110-fa22-group39/source/webapp/customizeRecipe/customizeRecipe.html');

    // name: my coffee
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
  });

  it("test the customized process", async () => {
    // check review page has the same info as user's input

    // wait until page is loaded
    const nameXPath = '//*[@id="coffee-name"]';
    await page.waitForXPath(nameXPath);

    expect(
      await page.evaluate(() => document.getElementById("coffee-name").value)
    ).toBe(COFFEE_NAME);
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

    // test available shop
    expect(
        await page.evaluate(() => document.getElementById("shopName1").value)
    ).toBe("Starbucks");

    await page.waitForSelector("#content > button");
    await page.click("#content > button");

    // test search
    const inputXPath = '//*[@id="input"]';
    await page.waitForXPath(inputXPath);
    await (await page.$x(inputXPath))[0].type(COFFEE_NAME);

    let name = await page.$eval(
      "body > table > tbody > tr:nth-child(2) > td:nth-child(1) > div",
      (x) => x.innerText
    );
    expect(name).toBe(COFFEE_NAME);

    // delete
    await (await page.$x(inputXPath))[0].type("");
    await page.click("#remove0");
    let tableHtml = await page.evaluate(
      () => document.querySelector("body > table > tbody").innerHTML
    );
    expect(tableHtml).not.toContain(COFFEE_NAME);

    // search the deleted coffee again
    await (await page.$x(inputXPath))[0].type(COFFEE_NAME);
    tableHtml = await page.evaluate(
      () => document.querySelector("body > table > tbody").innerHTML
    );
    expect(tableHtml).not.toContain(COFFEE_NAME);
  });
});
