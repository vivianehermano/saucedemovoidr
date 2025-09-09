import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import ProdutosPage from '../pages/ProdutosPage.js';
import CarrinhoPage from '../pages/CarrinhoPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';
import { usuarios, produtos, dadosCheckout } from '../data/dataTest.js';

test.describe('Testes de Checkout', () => {
  let loginPage;
  let produtosPage;
  let carrinhoPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    produtosPage = new ProdutosPage(page);
    carrinhoPage = new CarrinhoPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navegarParaLogin();
    await loginPage.fazerLogin(usuarios.valido.nome, usuarios.valido.senha);
    await produtosPage.adicionarProdutoAoCarrinho(produtos.mochila);
    await produtosPage.irParaCarrinho();
  });

  test('CT11 - Checkout completo com sucesso', async ({ page }) => {
    console.log('Teste: Checkout completo');
    
    await carrinhoPage.irParaCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one/);
    
    const estaNaPaginaInfo = await checkoutPage.estaNaPaginaInformacoes();
    expect(estaNaPaginaInfo).toBe(true);
    
    const sucesso = await checkoutPage.processarCheckoutCompleto(dadosCheckout.valido);
    expect(sucesso).toBe(true);
    
    const mensagem = await checkoutPage.obterMensagemSucesso();
    expect(mensagem).toContain('Thank you for your order!');
    
    console.log('Checkout realizado com sucesso');
  });

  test('CT12 - Validar campos obrigatórios', async () => {
    console.log('Teste: Campos obrigatórios');

    await carrinhoPage.irParaCheckout();
    
    await checkoutPage.continuar();
    
    const mensagemErro = await checkoutPage.obterMensagemErro();
    expect(mensagemErro).toContain('First Name is required');
    
    console.log('Validação de campos obrigatórios funcionando');
  });

  test('CT13 - Cancelar processo de checkout', async ({ page }) => {
    console.log('Teste: Cancelar checkout');

    await carrinhoPage.irParaCheckout();
    
    await checkoutPage.cancelar();
    
    await expect(page).toHaveURL(/.*cart/);
    
    const voltouParaCarrinho = await carrinhoPage.estaNaPaginaCarrinho();
    expect(voltouParaCarrinho).toBe(true);
    
    console.log('Checkout cancelado com sucesso');
  });

  test('CT14 - Verificar cálculos do checkout', async () => {
    console.log('Teste: Cálculos do checkout');

    await carrinhoPage.continuarComprando();
    await produtosPage.adicionarProdutoAoCarrinho(produtos.jaqueta);
    await produtosPage.irParaCarrinho();
    
    await carrinhoPage.irParaCheckout();
    await checkoutPage.preencherInformacoes(
      dadosCheckout.valido.nome,
      dadosCheckout.valido.sobrenome,
      dadosCheckout.valido.cep
    );
    await checkoutPage.continuar();

    const estaNaRevisao = await checkoutPage.estaNaPaginaRevisao();
    expect(estaNaRevisao).toBe(true);

    const calculosCorretos = await checkoutPage.verificarCalculos();
    expect(calculosCorretos).toBe(true);
    
    const subtotal = await checkoutPage.obterSubtotal();
    const taxa = await checkoutPage.obterTaxa();
    const total = await checkoutPage.obterTotal();
    
    console.log(`Cálculos corretos - Subtotal: $${subtotal}, Taxa: $${taxa}, Total: $${total}`);
  });

  test('CT15 - Finalizar compra e voltar ao início', async ({ page }) => {
    console.log('Teste: Finalizar e voltar');
 
    await carrinhoPage.irParaCheckout();
    const sucesso = await checkoutPage.processarCheckoutCompleto(dadosCheckout.valido);
    expect(sucesso).toBe(true);

    await checkoutPage.voltarParaProdutos();
    await expect(page).toHaveURL(/.*inventory/);
    
    const voltouParaProdutos = await produtosPage.estaNaPaginaProdutos();
    expect(voltouParaProdutos).toBe(true);
    
    const contador = await produtosPage.obterContadorCarrinho();
    expect(contador).toBe(0);
    
    console.log('Compra finalizada e retornou ao início');
  });
});