import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class CartPage extends BasePage {
  constructor(page: Page) { super(page); }

  async openCart() {
      await this.page.locator('body > div.master-wrapper-page > div.master-wrapper-content > div.header-menu > ul.top-menu > li:nth-child(1) > a').click();
    await this.page.locator('//*[@id="topcartlink"]/a').click();
    // await this.page.click('#flyout-cart > div > div.buttons > input',{ timeout: 7000});

    await this.page.waitForSelector('.order-summary-content');
  }

  async getCartCount() {
    const text = await this.page.textContent('.cart-qty');
    if (!text) return 0;
    const m = text.match(/\((\d+)\)/);
    return m ? Number(m[1]) : 0;
  }

  async proceedToCheckout() {
  // Check terms
  await this.page.click('input#termsofservice');

  // Checkout button
  await this.page.click('button#checkout');

  // Billing step
  const billingBtn = this.page.locator('//*[@id="billing-buttons-container"]/input');
  await billingBtn.waitFor({ state: 'visible', timeout: 10000 });
  await billingBtn.click();

  // Shipping step
  const shippingBtn = this.page.locator('//*[@id="shipping-buttons-container"]/input');
  await shippingBtn.waitFor({ state: 'visible', timeout: 10000 });
  await shippingBtn.click();

  // Shipping method step
  const shippingMethodBtn = this.page.locator('//*[@id="shipping-method-buttons-container"]/input');
  await shippingMethodBtn.waitFor({ state: 'visible', timeout: 10000 });
  await shippingMethodBtn.click();

  // Payment method step
  const paymentMethodBtn = this.page.locator('//*[@id="payment-method-buttons-container"]/input');
  await paymentMethodBtn.waitFor({ state: 'visible', timeout: 10000 });
  await paymentMethodBtn.click();

  // Payment info step
  const paymentInfoBtn = this.page.locator('//*[@id="payment-info-buttons-container"]/input');
  await paymentInfoBtn.waitFor({ state: 'visible', timeout: 10000 });
  await paymentInfoBtn.click();

  // Confirm order
  const confirmOrderBtn = this.page.locator('//*[@id="confirm-order-buttons-container"]/input');
  await confirmOrderBtn.waitFor({ state: 'visible', timeout: 10000 });
  await confirmOrderBtn.click();

  await this.page.waitForTimeout(8000);

  // 🔥 FINAL ASSERTION — THANK YOU PAGE


}

}
