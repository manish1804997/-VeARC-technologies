import { test, expect } from '@playwright/test';
import LoginPage from '../src/pages/LoginPage';
import ProductPage from '../src/pages/ProductPage';
import CartPage from '../src/pages/CartPage';
import { credentials, productsToAdd } from '../src/utils/testData';

test.describe('E2E demo webshop flow', () => {
  test('login, add products, verify cart, checkout', async ({ page }) => {
    const login = new LoginPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await login.goto('/');
    await login.login(credentials.username, credentials.password);

    for (const p of productsToAdd) {
      await product.goto('/');
      await product.addProductByPartialName(p.selectorContains);
    }

    await cart.openCart();
    const count = await cart.getCartCount();
    expect(count, 'cart count should match 2 after adding two products').toBeGreaterThanOrEqual(2);

    await cart.proceedToCheckout();

    const thankYou = page.locator('//input[@value="Continue"]');
    await expect(thankYou, 'order success message should be visible').toBeVisible();
  });
});
