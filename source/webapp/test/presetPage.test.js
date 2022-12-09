describe("check preset recipe1 can fill the input correctly", () => {
  beforeAll(async () => {
    await page.goto(
      "https://alien-traveler.github.io/cse110-fa22-group39/webapp/presetList/presetList.html"
    );

    const recipe1Ele = await page.waitForSelector("#recipe1");
    recipe1Ele.click("#recipe1");
  });

  it('make sure coffee name is "Coffe Americano', async () => {
    const coffeeName = await page.evaluate(
      (x) => x.value,
      await page.waitForXPath('//*[@id="name"]')
    );
    expect(coffeeName).toBe("Coffe Americano");
  });

  it('make sure coffee type is "hot"', async () => {
    const hotCheckbox = await page.waitForXPath('//*[@id="hot-coffee"]');
    const hotCheckboxVal = await (
      await hotCheckbox.getProperty("checked")
    ).jsonValue();
    expect(hotCheckboxVal).toBe(true);

    const coldCheckbox = await page.waitForXPath('//*[@id="cold-coffee"]');
    const coldCheckboxVal = await (
      await coldCheckbox.getProperty("checked")
    ).jsonValue();
    expect(coldCheckboxVal).toBe(false);
  });

  it('make sure drink is "Espresso"', async () => {
    const drink = await page.evaluate(
      (x) => x.value,
      await page.waitForXPath('//*[@id="drinks-name"]')
    );
    expect(drink).toBe("Espresso");
  });

  it('make sure size is "M', async () => {
    const size = await page.evaluate(
      (x) => x.value,
      await page.waitForXPath('//*[@id="size-name"]')
    );
    expect(size).toBe("M");
  });

  it('make sure only "extra shot" and "water" are selected', async () => {
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
  });
});
