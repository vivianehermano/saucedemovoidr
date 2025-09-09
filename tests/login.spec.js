import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import ProdutosPage from '../pages/ProdutosPage.js';
import { usuarios, mensagensErro } from '../data/dataTest.js';

test.describe('Testes de Login', () => {
  let loginPage;
  let produtosPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    produtosPage = new ProdutosPage(page);
    await loginPage.navegarParaLogin();
  });

  test('CT01 - Login com credenciais válidas', async ({ page }) => {
    console.log('🧪 Teste: Login válido');
    
    await loginPage.fazerLogin(usuarios.valido.nome, usuarios.valido.senha);

    await expect(page).toHaveURL(/.*inventory/);

    const estaNaPagina = await produtosPage.estaNaPaginaProdutos();
    expect(estaNaPagina).toBe(true);

    console.log('✅ Login realizado com sucesso');
  });

  test('CT02 - Login com credenciais inválidas', async () => {
    console.log('🧪 Teste: Login inválido');

    await loginPage.fazerLogin(usuarios.invalido.nome, usuarios.invalido.senha);

    const temErro = await loginPage.temMensagemErro();
    expect(temErro).toBe(true);

    const mensagem = await loginPage.obterMensagemErro();
    expect(mensagem).toContain('do not match any user');

    console.log('✅ Mensagem de erro exibida corretamente');
  });

  test('CT03 - Login com usuário bloqueado', async () => {
    console.log('🧪 Teste: Usuário bloqueado');

    await loginPage.fazerLogin(usuarios.bloqueado.nome, usuarios.bloqueado.senha);

    const mensagem = await loginPage.obterMensagemErro();
    expect(mensagem).toContain('locked out');

    console.log('✅ Usuário bloqueado tratado corretamente');
  });

  test('CT04 - Login sem usuário', async () => {
    console.log('🧪 Teste: Login sem usuário');

    await loginPage.fazerLogin('', usuarios.valido.senha);

    const temErro = await loginPage.temMensagemErro();
    expect(temErro).toBe(true);

    const mensagem = await loginPage.obterMensagemErro();
    expect(mensagem).toContain('Username is required');

    console.log('✅ Mensagem de erro exibida corretamente');
  });

  test('CT05 - Login sem senha', async () => {
    console.log('🧪 Teste: Login sem senha');

    await loginPage.fazerLogin(usuarios.valido.nome, '');

    const temErro = await loginPage.temMensagemErro();
    expect(temErro).toBe(true);

    const mensagem = await loginPage.obterMensagemErro();
    expect(mensagem).toContain('Password is required');

    console.log('✅ Mensagem de erro exibida corretamente');
  });

  test('CT06 - Login sem usuário e senha', async () => {
    console.log('🧪 Teste: Login sem usuário e senha');

    await loginPage.fazerLogin('', '');

    const temErro = await loginPage.temMensagemErro();
    expect(temErro).toBe(true);

    const mensagem = await loginPage.obterMensagemErro();
    expect(mensagem).toContain('Username is required');

    console.log('✅ Mensagem de erro exibida corretamente');
  });
});