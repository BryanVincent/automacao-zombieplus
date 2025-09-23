import { expect, Locator, type Page } from '@playwright/test'

export interface Account {
  username: string,
  password: string
}

export class Login {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async submit(account: Account) {
        await this.page.goto('/')
        await this.page.getByRole('textbox', { name: 'nome de usuário' }).fill(account.username)
        await this.page.getByRole('textbox', { name: 'senha secreta' }).fill(account.password)
        await this.page.getByRole('button', { name: 'Entrar' }).click()
    }

    async getPopUpContent(): Promise<Locator> {
        return this.page.locator('#swal2-html-container')
    }

    async assertToast(expectText: string) {
        const toast = this.page.getByRole('status')
        await expect(toast).toContainText(expectText)
    }

}