import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.cartItems = page.locator('.cart_item');
  }

  async verifyItemInCart(itemName: string): Promise<boolean> {
    const item = this.cartItems.locator('.inventory_item_name', { hasText: itemName });
    return await item.isVisible();
  }

  async removeItemFromCart(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    const removeButton = item.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
