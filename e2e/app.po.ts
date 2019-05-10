import {$, $$, browser, ElementArrayFinder, ElementFinder} from 'protractor';

export class AppPage {
	navigateToMainPage() {
		return browser.get('/');
	}

	getBrandElement(): ElementFinder {
		return $('navbar .navbar-brand');
	}

	getCarDataTableHeads(): ElementArrayFinder {
		return $$('car-data-table table thead th');
	}

	getCarDataTableRows(): ElementArrayFinder {
		return $$('car-data-table table tbody tr');
	}

	getName(element: ElementFinder) {
		return element.$('td a strong').getText();
	}

	getCellsOfRow(element: ElementFinder) {
		return element.$$('td');
	}

	typeInNthCarFormField(n: number, text: string) {
		const field = $$('individual-cars-form .form input[type=url]').get(n);
		return field.sendKeys(text);
	}

	clickTheCompareButton() {
		return $('individual-cars-form input[value=Összehasonlítás]').click();
	}
}
