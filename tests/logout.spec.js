import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import ProdutosPage from '../pages/ProdutosPage.js';
import { usuarios } from '../data/dataTest.js';

test.describe('Testes de Logout', () => {
  let loginPage;
  let produtosPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    produtosPage = new ProdutosPage(page);
  });

  test('CT_LOGOUT_01 - Logout com sucesso', async ({ page }) => {
    console.log('Teste: Logout do sistema');

    await loginPage.navegarParaLogin();
    await loginPage.fazerLogin(usuarios.valido.nome, usuarios.valido.senha);

    const estaNaPaginaProdutos = await produtosPage.estaNaPaginaProdutos();
    expect(estaNaPaginaProdutos).toBe(true);

    await produtosPage.fazerLogout();

    await expect(page).toHaveURL(/.*saucedemo.com\/?$/);

    const estaNoLogin = await loginPage.estaNaPaginaLogin();
    expect(estaNoLogin).toBe(true);

    console.log('Logout realizado com sucesso');
  });

  test('CT_LOGOUT_02 - Tentativa de acesso após logout', async ({ page }) => {
    console.log('Teste: Acesso após logout');

    await loginPage.navegarParaLogin();
    await loginPage.fazerLogin(usuarios.valido.nome, usuarios.valido.senha);
    await produtosPage.fazerLogout();

    await page.goto('/inventory.html');

    await expect(page).toHaveURL(/.*saucedemo.com\/?$/);

    const estaNoLogin = await loginPage.estaNaPaginaLogin();
    expect(estaNoLogin).toBe(true);

    console.log('Segurança após logout funcionando');
  });

  test('CT_LOGOUT_03 - Logout preserva carrinho vazio', async () => {
    console.log('Teste: Estado do carrinho após logout');

    await loginPage.navegarParaLogin();
    await loginPage.fazerLogin(usuarios.valido.nome, usuarios.valido.senha);

    const contadorInicial = await produtosPage.obterContadorCarrinho();

    await produtosPage.fazerLogout();

    await loginPage.fazerLogin(usuarios.valido.nome, usuarios.valido.senha);

    const contadorFinal = await produtosPage.obterContadorCarrinho();
    expect(contadorFinal).toBe(contadorInicial);

    console.log('Estado do carrinho preservado após logout');
  });
});
