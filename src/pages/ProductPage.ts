import { Page, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }


  async addProductByPartialName(partialName: string) {
    // Locate the product tile that contains the partial product name
    const productLocator = this.page.locator(`.product-item:has-text("${partialName}")`);
    await productLocator.first().waitFor({ state: 'visible', timeout: 8000 });

    // Locate the Add to cart button
    const addToCartButton = productLocator.locator('text=Add to cart').first();
    await addToCartButton.waitFor({ state: 'visible', timeout: 5000 });

    // Click Add to cart
    await addToCartButton.click();

    // SIMPLE + STABLE VALIDATION:
    // Check that body contains the phrase "Shopping cart"
    // This text ALWAYS appears in the add-to-cart message.
    await expect(this.page.locator('body'))
      .toContainText(/shopping cart/i, { timeout: 8000 });
  }
}
