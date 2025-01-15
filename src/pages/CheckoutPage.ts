import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  
  // Checkout Info Form Locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  // Checkout Overview Locators
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  // Checkout Complete Locators
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Step 1: Info Form
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');

    // Step 2: Overview
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');

    // Step 3: Complete
    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async getItemTotal(): Promise<string> {
    return (await this.itemTotalLabel.textContent()) || '';
  }

  async getTax(): Promise<string> {
    return (await this.taxLabel.textContent()) || '';
  }

  async getTotal(): Promise<string> {
    return (await this.totalLabel.textContent()) || '';
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getCompleteHeader(): Promise<string> {
    return (await this.completeHeader.textContent()) || '';
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }
}
