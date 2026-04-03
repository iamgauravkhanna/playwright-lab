import { type Locator, type Page, expect } from '@playwright/test';

export class LabPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly welcomeText: Locator;
  readonly todoInput: Locator;
  readonly addItemButton: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.welcomeText = page.locator('#welcome');
    this.todoInput = page.locator('#new-item');
    this.addItemButton = page.getByRole('button', { name: 'Add item' });
    this.todoItems = page.locator('#todo-list li');
  }

  async goto() {
    await this.page.goto('/pom');
  }

  async signIn(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async addTodo(title: string) {
    await this.todoInput.fill(title);
    await this.addItemButton.click();
  }

  async expectSignedInAs(username: string) {
    await expect(this.welcomeText).toHaveText(`Signed in as ${username}`);
  }
}
