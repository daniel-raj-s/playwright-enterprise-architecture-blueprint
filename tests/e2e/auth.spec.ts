import { test, expect } from '../../src/fixtures/authFixture';

test.describe('Authentication Flow', () => {
  test('should successfully log in with valid credentials', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should show error when logging in with locked out user', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

  test('should show error when logging in with invalid password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Username and password do not match any user in this service');
  });

  test('should successfully logout', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('/inventory.html');
    
    await inventoryPage.logout();
    await expect(page).toHaveURL('/');
  });
});
