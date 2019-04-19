import {Given, Then, When} from 'cucumber';
import {AppPage} from '../../app.po';
import {expect} from 'chai';
import {browser} from 'protractor';

const page = new AppPage();

Given(/^the user is on the main page$/, () => {
	return page.navigateToMainPage();
});

When(/^the page is loaded$/, () => {
	// noop, narrative when
});

When('the user types in', async (dataTable: any) => {
	const urls = dataTable.raw()[0];
	const typeActions = [];
	for (let i = 0; i < urls.length; i++) {
		const url = urls[i];
		typeActions.push(page.typeInNthCarFormField(i, url));
	}
	return Promise.all(typeActions);
});

When('clicks the compare button', async () => {
	return page.clickTheCompareButton();
});

Then('after some time, a datatable should appear with', {timeout: 2 * 5000}, async (dataTable) => {
	await browser.sleep(2000);
	const tableHeads = await page.getCarDataTableHeads();
	const expectedRows = dataTable.raw();
	const expectedHeadRow = expectedRows[0];
	for (let i = 0; i < expectedHeadRow.length; i++) {
		const actualHeadField = await tableHeads[i].getText();
		await expect(actualHeadField).to.equal(expectedHeadRow[i]);
	}
	const actualRows = await page.getCarDataTableRows();
	for (let i = 0; i < actualRows.length; i++) {
		const currentActualRow = actualRows[i];
		const currentExpectedRow = expectedRows[i + 1];
		const actualName = await page.getName(currentActualRow);
		await expect(actualName).to.equal(currentExpectedRow[0]);
		const actualCells = await page.getCellsOfRow(currentActualRow);
		for(let j = 1; j < actualCells.length; j++ ) {
			await expect(await actualCells[j].getText()).to.equal(currentExpectedRow[j]);
		}
	}
});

Then(/^the brand on the navbar says "([^"]*)"$/, async (brandName) => {
	return expect(await page.getBrandElement().getText()).to.equal(brandName);
});
