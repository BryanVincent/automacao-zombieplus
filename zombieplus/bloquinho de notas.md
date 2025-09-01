https://github.com/qax-education/blog/blob/main/Instalando_Docker_Windows10_WSL2.md

Sobre o docker:

comando que listar os container >>> docker ps

comando para lista o container wello world >>> docker ps -a

comando para remover container >>> docker rm idDoContainer 
Ex: docker rm 461cb0853283

comando para visualizar as imagens que tem instalado no desktop >>> docker images

comando para deletar imagem por linha de comando >>> docker rmi idDaImagem
Ex: docker rmi d211f485f2dd


comando para subir um ambiente de banco de dados sem travar o terminal >>> docker-compose up -d

comando para descer/desligar um ambiente de banco de dados >>> docker-compose down -d

Se mandar o comando de down, ele irá deletar tudo! >>> docker-compose down

------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------------------

Mapeado elementos

Como criar um xpath no inspencionar do site:

Ex: //font[text()="Aperte o play... se tiver coragem"]

// >>> Inicializa o seletor/localizador para xpath
font(tag) >>> Tag HTML que representa o elemento
[text()="teste"] >>> Texto do próprio elemento para dentro sempre dos colchetes []

getByRole: Obter um elemento do tipo ['button']

------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------------------

Rodando os testes pelo console log:

Formato para visualizar o front da automação
    ```
    npx playwright test --headed
    ```

Formato para roda em modo debug
    ```
    npx playwright test --debug
    ```

Formato para roda em com interface gráfica do Playwright
    ```
    npx playwright test --ui
    ```

------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------------------

Exemplos de alguns códigos de steps:

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  // visit
  await page.goto('http://localhost:3000')

  // Xpath bem elaborado
  await page.click('//button[text()="Aperte o play... se tiver coragem"]')
  
  // Xpath com combinação de class Pai + seletor
  .click('.class seletor') ===> .click('.actions button')

  // Combinando a tag com o texto
  await page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click()
  
  // openLeadModal
  await page.getByRole('button', { name: /Aperte o play/ }).click()
  // Esquema de contains, localizador de Substring

// Não é usado assim pois o elemento que estamos tentando validar está no formato "id" no HTML,
e para funionar essa ação deve ser no formato "data-testid".
  await page.getByTestId('name').fill('Bryan teste')

BUSCA PROPRIEDADE ID
// Locator é usado quase sempre em qualquer ocasião, pois ele é genérico
  await page.locator('#name').fill('Bryan teste')


// Utilizando com seletor CSS
  await page.locator(ELEMENTO[PROP=VALUE]).fill('TEXTO A SER PREENCHIDO')
BUSCA PROPRIEDADE NAME
  await page.locator('input[name=name]').fill('Bryan teste')
BUSCA PROPRIEDADE PLACEHOLDER
  await page.locator('input[placeholder="Seu nome completo"]').fill('Bryan teste')
BUSCA ELEMENTO COM XPATH
$ >>> Termina na propiendade com "register"
* >>> Contem na propiendade "register"
^ >>> Começa na propriedade com "register"
  locator('a[href$="register"]')

// Utilizando localizador React Select
  locator('id + class react')
  locator('#select_company_id .react-select__indicator)


// Utilizando formato de placeholder do playwright
  await page.getByPlaceholder('Informe seu nome').fill('Bryan teste')
  await page.getByPlaceholder('Informe seu email').fill('bryanteste02@gmail.com')


// Estratégia para poder mapear o texto dinâmico
  await page.getByText('seus dados conosco').click()
  const content = await page.content()
  await page.evaluate(content => console.log(content), content)

});

// Roda uma vez para cada teste (beforeEach)
  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page)
    toast = new Toast(page)
  })

// Roda a mesma coisa uma única vez para todos os testes (beforeAll)
  test.beforeAll(async () => {
    leadName = faker.person.fullName()
    leadEmail = faker.internet.email()
  })

// Buscar linhas do HTML
  page.getByRole('row')

------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------------------

Ações do playwright

.click() >>>

.fill() >>>

.filter() >>> Filtrar algo de uma lista

.waitForTimeout() >>>

.toHaveText() >>> Texto esperado

.toHaveURL() >>> URL esperada

.toBeHidden() >>> Valida se o elemento está invisível, mesmo que esteja ataxado no HTML

.not.toBeVisible() >>> Garante que o elmento não está visível, mas não garante que o elemento
pode existir no HTML

.content() >>> Obtem o código HTML do momento que é chamado

------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------------------
Tipos de validações na page com playwright

page.locator >>> Pode ser utilizado para xpath, css, id, etc.

page.getByRole >>>>

page.getByTestId >>>

page.goto >>>

page.getByPlaceholder >>> 

page.waitForLoadState >>> Aguardar carregamento da tela
ex: page.waitForLoadState('netwotkidle') >>> Aguarda até que todo tráfego de rede seja finalizado


