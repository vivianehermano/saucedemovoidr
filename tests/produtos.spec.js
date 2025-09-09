import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import ProdutosPage from '../pages/ProdutosPage.js';
import { usuarios, produtos, ordenacao } from '../data/dataTest.js';

test.describe('Testes de Produtos', () => {
  let loginPage;
  let produtosPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    produtosPage = new ProdutosPage(page);
    
    await loginPage.navegarParaLogin();
    await loginPage.fazerLogin(usuarios.valido.nome, usuarios.valido.senha);
    
    const estaNaPagina = await produtosPage.estaNaPaginaProdutos();
    expect(estaNaPagina).toBe(true);
  });

  test('CT04 - Visualizar lista de produtos', async () => {
    console.log('Teste: Visualizar produtos');
    
    const quantidade = await produtosPage.obterQuantidadeProdutos();
    expect(quantidade).toBe(6);
    
    const nomes = await produtosPage.obterNomesProdutos();
    expect(nomes).toContain(produtos.mochila);
    expect(nomes).toContain(produtos.luzBicicleta);
    
    console.log(`${quantidade} produtos encontrados`);
  });

  test('CT05 - Ordenar produtos por preço', async () => {
    console.log('Teste: Ordenação por preço');

    await produtosPage.ordenarProdutos(ordenacao.precoMenor);
    
    const precos = await produtosPage.obterPrecosProdutos();
    
    let ordenado = true;
    for (let i = 0; i < precos.length - 1; i++) {
      if (precos[i] > precos[i + 1]) {
        ordenado = false;
        break;
      }
    }
    
    expect(ordenado).toBe(true);
    console.log(`Produtos ordenados: ${precos.join(', ')}`);
  });

  test('CT06 - Adicionar produto ao carrinho', async () => {
    console.log('Teste: Adicionar ao carrinho');

    await produtosPage.adicionarProdutoAoCarrinho(produtos.mochila);
    
    const contador = await produtosPage.obterContadorCarrinho();
    expect(contador).toBe(1);
  });

  test('CT07 - Remover produto do carrinho', async () => {
    console.log('Teste: Remover do carrinho');
    
    await produtosPage.adicionarProdutoAoCarrinho(produtos.mochila);
    await produtosPage.removerProdutoDoCarrinho(produtos.mochila);
    
    const contador = await produtosPage.obterContadorCarrinho();
    expect(contador).toBe(0);
    console.log('Produto removido do carrinho');
  });
});

