import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
  private emailInput = 'input#Email';
  private passwordInput = 'input#Password';
  private loginButton = 'input[value="Log in"]';

  constructor(page: Page) { super(page); }

  async login(email: string, password: string) {
    await this.page.click('a[href="/login"]');
    await this.page.waitForSelector(this.emailInput);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector('a.account', { timeout: 8000 });
  }
}
