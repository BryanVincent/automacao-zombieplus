const { expect } = require('playwright/test')

export class TvShows {

    constructor(page) {
        this.page = page
    }

    async menuSerieTv() {
        await this.page.locator('a[href$="tvshows"]').click()
    }

    async goFormTvSeries() {
        await this.menuSerieTv()
        await this.page.locator('a[href$="register"]').click()
    }

    async createSeries(serie) {
        await this.goFormTvSeries()
        await this.page.waitForLoadState('networkidle')
        await this.page.getByLabel('Titulo da série').fill(serie.title)
        await this.page.getByLabel('Sinopse').fill(serie.overview)
        await this.page.locator('#select_company_id .react-select__indicator')
            .click()
            
        await this.page.locator('.react-select__option')
            .filter({hasText: serie.company})
            .click()

        await this.page.locator('#select_year .react-select__indicator')
            .click()
        await this.page.locator('.react-select__option')
            .filter({hasText: serie.release_year})
            .click()
        
        await this.page.getByLabel('Temporadas').fill(String(serie.season))

        await this.page.locator('input[name="cover"]')
            .setInputFiles('tests/support/fixtures' + serie.cover)

        if (serie.featured) {
            await this.page.locator('.featured .react-switch').click()
        }
    }

    async searchTvSeries(target) {
        await this.menuSerieTv()
        await this.page.getByPlaceholder('Busque pelo nome').fill(target)
        await this.page.click('.actions button')
    }

    async removeSerie(title) {
        await this.menuSerieTv()
        await this.page.getByRole('row', { name: title }).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }

}



