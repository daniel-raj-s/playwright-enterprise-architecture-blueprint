import { test, expect } from '../../src/fixtures/authFixture';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';

test.describe('E2E Checkout Flow', () => {
  test('should successfully purchase items using custom fast login fixture', async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    const cartPage = new CartPage(authenticatedPage);
    const checkoutPage = new CheckoutPage(authenticatedPage);

    // 1. Add items to cart on inventory page
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);

    // 2. Open cart and verify item presence
    await inventoryPage.openCart();
    expect(await cartPage.verifyItemInCart('Sauce Labs Backpack')).toBe(true);
    expect(await cartPage.verifyItemInCart('Sauce Labs Bolt T-Shirt')).toBe(true);

    // 3. Proceed to checkout info form
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('John', 'Doe', '12345');

    // 4. Verify order overview totals
    const itemTotal = await checkoutPage.getItemTotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    expect(itemTotal).toContain('Item total: $45.98');
    expect(tax).toContain('Tax: $3.68');
    expect(total).toContain('Total: $49.66');

    // 5. Finalize order
    await checkoutPage.finishCheckout();
    expect(await checkoutPage.getCompleteHeader()).toContain('Thank you for your order!');

    // 6. Return back home
    await checkoutPage.clickBackHome();
    await expect(authenticatedPage).toHaveURL('/inventory.html');
  });
});
