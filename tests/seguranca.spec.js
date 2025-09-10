import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';

test.describe('Testes de Segurança', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('CT_SEC_01 - Acesso direto à produtos sem login @seguranca @critico', async ({
    page,
  }) => {
    console.log(' Teste: Acesso direto sem autenticação');

    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/.*saucedemo.com\/?$/);

    const estaNoLogin = await loginPage.estaNaPaginaLogin();
    expect(estaNoLogin).toBe(true);

    console.log('Proteção de acesso funcionando');
  });

  test('CT_SEC_02 - Acesso direto ao carrinho sem login @seguranca @critico', async ({
    page,
  }) => {
    console.log(' Teste: Acesso direto ao carrinho');

    await page.goto('/cart.html');

    await expect(page).toHaveURL(/.*saucedemo.com\/?$/);

    const estaNoLogin = await loginPage.estaNaPaginaLogin();
    expect(estaNoLogin).toBe(true);

    console.log('Carrinho protegido contra acesso direto');
  });

  test('CT_SEC_03 - Acesso direto ao checkout sem login @seguranca @critico', async ({
    page,
  }) => {
    console.log(' Teste: Acesso direto ao checkout');

    await page.goto('/checkout-step-one.html');

    await expect(page).toHaveURL(/.*saucedemo.com\/?$/);

    const estaNoLogin = await loginPage.estaNaPaginaLogin();
    expect(estaNoLogin).toBe(true);

    console.log('Checkout protegido contra acesso direto');
  });

  test('CT_SEC_04 - Caracteres especiais no login @seguranca @validacao', async ({
    page,
  }) => {
    console.log(' Teste: Caracteres especiais');

    await loginPage.navegarParaLogin();

    await loginPage.fazerLogin('<script>alert("xss")</script>', 'password');

    const temErro = await loginPage.temMensagemErro();
    expect(temErro).toBe(true);

    const url = page.url();
    expect(url).toContain('saucedemo.com');

    console.log('Caracteres especiais tratados corretamente');
  });

  test('CT_SEC_05 - Login com campos muito longos @seguranca @validacao', async () => {
    console.log(' Teste: Campos extremamente longos');

    await loginPage.navegarParaLogin();

    const stringLonga = 'A'.repeat(1000);

    await loginPage.fazerLogin(stringLonga, stringLonga);

    const temErro = await loginPage.temMensagemErro();
    expect(temErro).toBe(true);

    const estaNoLogin = await loginPage.estaNaPaginaLogin();
    expect(estaNoLogin).toBe(true);

    console.log('Campos longos tratados sem crash');
  });
});
