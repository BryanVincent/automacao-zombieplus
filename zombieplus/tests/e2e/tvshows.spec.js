const { test, expect } = require('../support')
const data = require('../support/fixtures/tvshows.json')
const { executeSQL } = require('../support/database')

test.beforeAll( async () => {
    await executeSQL(`delete FROM public.tvshows`)
})

test('deve poder cadastrar uma nova série', async ({ page }) => {
    const serie = data.create
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.createSeries(serie)
    await page.movies.submit()
    await page.popup.haveText(`A série '${serie.title}' foi adicionada ao catálogo.`)
})

test('deve poder remover uma série cadastrada', async ({ page, request}) => {
    const serie = data.to_remove
    await request.api.postTvShow(serie)
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.removeSerie(serie.title)
    await page.popup.haveText('Série removida com sucesso.')
})

test('não deve cadastrar quando a série for duplicada', async ({ page, request }) => {
    const serie = data.duplicate
    await request.api.postTvShow(serie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.createSeries(serie)
    await page.movies.submit()
    await page.popup.haveText(`O título '${serie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})

test('não deve cadastrar série quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.goFormTvSeries()
    await page.movies.submit()
    await page.movies.alerHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)',
    ])
})

test('deve realizar busca por série pelo termo zombie', async ({ page, request }) => {
    const tvshows = data.search
    tvshows.data.forEach(async (m) => {
        await request.api.postTvShow(m)
    })
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.searchTvSeries(tvshows.input)
    await page.movies.tableHave(tvshows.outputs)
})

