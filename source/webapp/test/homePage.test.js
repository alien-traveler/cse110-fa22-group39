describe("Basic user flow for Website", () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto(
      "https://alien-traveler.github.io/cse110-fa22-group39/source/webapp/"
    );
  });

  it('title should ne named "Home"', async function () {
    await expect(page.title()).resolves.toMatch("Home");
  });

  it("make sure there are 2 btns on home page", async () => {
    await page.waitForSelector("#content > button");
    const btns = await page.$$("#content > button");
    expect(btns.length).toEqual(2);
  });
});
