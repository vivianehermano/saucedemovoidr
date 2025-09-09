
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import ProdutosPage from '../pages/ProdutosPage.js';
import CarrinhoPage from '../pages/CarrinhoPage.js';
import { usuarios, produtos } from '../data/dataTest.js';

test.describe('Testes do Carrinho', () => {
  let loginPage;
  let produtosPage;
  let carrinhoPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    produtosPage = new ProdutosPage(page);
    carrinhoPage = new CarrinhoPage(page);

    await loginPage.navegarParaLogin();
    await loginPage.fazerLogin(usuarios.valido.nome, usuarios.valido.senha);
    
    const estaNaPagina = await produtosPage.estaNaPaginaProdutos();
    expect(estaNaPagina).toBe(true);
  });

  test('CT08 - Verificar itens no carrinho', async ({ page }) => {
    console.log('Teste: Verificar carrinho');

    await produtosPage.adicionarProdutoAoCarrinho(produtos.mochila);
    await produtosPage.adicionarProdutoAoCarrinho(produtos.luzBicicleta);
    
    await produtosPage.irParaCarrinho();
    await expect(page).toHaveURL(/.*cart/);
    
    const estaNaPageCarrinho = await carrinhoPage.estaNaPaginaCarrinho();
    expect(estaNaPageCarrinho).toBe(true);
    
    const quantidade = await carrinhoPage.obterQuantidadeItens();
    expect(quantidade).toBe(2);
    
    const itemMochila = await carrinhoPage.itemEstaNoCarrinho(produtos.mochila);
    const itemLuz = await carrinhoPage.itemEstaNoCarrinho(produtos.luzBicicleta);
    
    expect(itemMochila).toBe(true);
    expect(itemLuz).toBe(true);
    
    console.log('Itens verificados no carrinho');
  });

  test('CT09 - Remover item do carrinho', async () => {
    console.log('Teste: Remover item do carrinho');

    await produtosPage.adicionarProdutoAoCarrinho(produtos.mochila);
    await produtosPage.irParaCarrinho();
    
    let quantidade = await carrinhoPage.obterQuantidadeItens();
    expect(quantidade).toBe(1);
 
    await carrinhoPage.removerItem(produtos.mochila);

    const carrinhoVazio = await carrinhoPage.carrinhoEstaVazio();
    expect(carrinhoVazio).toBe(true);
    
    console.log('Item removido do carrinho');
  });

  test('CT10 - Continuar comprando do carrinho', async ({ page }) => {
    console.log('Teste: Continuar comprando');
    
    await produtosPage.adicionarProdutoAoCarrinho(produtos.mochila);
    await produtosPage.irParaCarrinho();
    
    await carrinhoPage.continuarComprando();
    
    await expect(page).toHaveURL(/.*inventory/);
    
    const voltouParaProdutos = await produtosPage.estaNaPaginaProdutos();
    expect(voltouParaProdutos).toBe(true);
    
    console.log('Retornou para página de produtos');
  });
});