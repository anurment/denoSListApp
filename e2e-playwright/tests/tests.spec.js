const { test, expect } = require("@playwright/test");

test("Server can add and list the a shopping lists", async ({ page }) => {

    await page.goto("/lists");
    const sListname = `My shopping list: ${Math.random()}`;
    await page.locator("input[id=newListTxtBox]").type(sListname);
    await page.locator("input[id=newListBtn]").click();
    await expect(page.locator(`a >> text='${sListname}'`)).toHaveText(sListname);

});

test("server can show a single shopping list", async ({ page }) => {
    await page.goto("/lists");
    const sListname = `My shopping list: ${Math.random()}`;
    await page.locator("input[id=newListTxtBox]").type(sListname);
    await page.locator("input[id=newListBtn]").click();
    await page.locator(`a >> text='${sListname}'`).click();
    await expect(page.locator("h1")).toHaveText(sListname);
});

test("server can add and list shopping list item", async ({ page }) => {
    await page.goto("/lists");
    const sListname = `My shopping list: ${Math.random()}`;
    await page.locator("input[id=newListTxtBox]").type(sListname);
    await page.locator("input[id=newListBtn]").click();
    await page.locator(`a >> text='${sListname}'`).click();

    const itemName = `My item: ${Math.random()}`;
    await page.locator("input[id=newItemTxtBox]").type(itemName);
    await page.locator("input[id=newItemBtn]").click();
    await expect(page.getByRole('listitem').filter({ hasText: itemName})).toBeVisible();

});

test("server can mark an item collected", async ({ page }) => {
    await page.goto("/lists");
    const sListname = `My shopping list: ${Math.random()}`;
    await page.locator("input[id=newListTxtBox]").type(sListname);
    await page.locator("input[id=newListBtn]").click();
    await page.locator(`a >> text='${sListname}'`).click();

    const itemName = `My item: ${Math.random()}`;
    //console.log(itemName);
    await page.locator("input[id=newItemTxtBox]").type(itemName);
    await page.locator("input[id=newItemBtn]").click();
    const id = await page.locator(`li >> text='${itemName}'`).getAttribute('id')
    //console.log(id);
    await page.locator(`input[id=itemCollectedBtn${id}]`).click();
    await expect(page.locator(`del >> text='${itemName}'`)).toHaveText(itemName);

});

test("server can move item from uncollented items list", async ({ page }) => {
    await page.goto("/lists");
    const sListname = `My shopping list: ${Math.random()}`;
    await page.locator("input[id=newListTxtBox]").type(sListname);
    await page.locator("input[id=newListBtn]").click();
    await page.locator(`a >> text='${sListname}'`).click();

    const itemName = `My item: ${Math.random()}`;
    //console.log(itemName);
    await page.locator("input[id=newItemTxtBox]").type(itemName);
    await page.locator("input[id=newItemBtn]").click();
    const id = await page.locator(`li >> text='${itemName}'`).getAttribute('id')
    //console.log(id);
    await page.locator(`input[id=itemCollectedBtn${id}]`).click();
    await expect(page.locator(`li >> id='${id}'`)).toHaveCount(0);

});

test("server can deactivate a shopping list", async ({ page }) => {
    await page.goto("/lists");
    const sListname = `My shopping list: ${Math.random()}`;
    await page.locator("input[id=newListTxtBox]").type(sListname);
    await page.locator("input[id=newListBtn]").click();
    const id = await page.locator(`a >> text='${sListname}'`).getAttribute('id')
    await page.locator(`input[id=deactivateBtn${id}]`).click();
    await expect(page.locator(`a >> text='${sListname}'`)).toHaveCount(0);
});
