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

  test('CT05 - Ordenar produtos por preço menor para maior', async () => {
    console.log('Teste: Ordenação por preço menor');

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
    console.log(`Preços ordenados (menor→maior): $${precos.join(', $')}`);
  });

  test('CT06 - Adicionar produto ao carrinho', async () => {
    console.log('Teste: Adicionar ao carrinho');

    await produtosPage.adicionarProdutoAoCarrinho(produtos.mochila);
    
    const contador = await produtosPage.obterContadorCarrinho();
    expect(contador).toBe(1);
    
    console.log('Produto adicionado ao carrinho');
  });

  test('CT07 - Remover produto do carrinho', async () => {
    console.log('Teste: Remover do carrinho');
    
    await produtosPage.adicionarProdutoAoCarrinho(produtos.mochila);
    await produtosPage.removerProdutoDoCarrinho(produtos.mochila);
    
    const contador = await produtosPage.obterContadorCarrinho();
    expect(contador).toBe(0);
    
    console.log('Produto removido do carrinho');
  });

  test('CT08 - Ordenar produtos por nome A-Z', async () => {
    console.log('Teste: Ordenação por nome A-Z');

    await produtosPage.ordenarProdutos(ordenacao.nomeAZ);
    
    const nomes = await produtosPage.obterNomesProdutos();
    
    const nomesOrdenados = [...nomes].sort();
    expect(nomes).toEqual(nomesOrdenados);
    
    console.log(`Produtos ordenados A-Z: ${nomes.slice(0, 3).join(', ')}...`);
  });

  test('CT09 - Ordenar produtos por nome Z-A', async () => {
    console.log('Teste: Ordenação por nome Z-A');

    await produtosPage.ordenarProdutos(ordenacao.nomeZA);
    
    const nomes = await produtosPage.obterNomesProdutos();
    
    const nomesOrdenadosReverso = [...nomes].sort().reverse();
    expect(nomes).toEqual(nomesOrdenadosReverso);
    
    console.log(`Produtos ordenados Z-A: ${nomes.slice(0, 3).join(', ')}...`);
  });

  test('CT10 - Ordenar produtos por preço maior para menor', async () => {
    console.log('Teste: Ordenação por preço maior');

    await produtosPage.ordenarProdutos(ordenacao.precoMaior);
    
    const precos = await produtosPage.obterPrecosProdutos();
    
    let ordenado = true;
    for (let i = 0; i < precos.length - 1; i++) {
      if (precos[i] < precos[i + 1]) {
        ordenado = false;
        break;
      }
    }
    
    expect(ordenado).toBe(true);
    console.log(`Preços ordenados (maior→menor): $${precos.join(', $')}`);
  });

  test('CT11 - Verificar se filtro mantém funcionalidade do carrinho', async () => {
    console.log('Teste: Filtro + Carrinho');


    await produtosPage.ordenarProdutos(ordenacao.precoMaior);
    
    const nomes = await produtosPage.obterNomesProdutos();
    await produtosPage.adicionarProdutoAoCarrinho(nomes[0]);
    
    const contador = await produtosPage.obterContadorCarrinho();
    expect(contador).toBe(1);

    await produtosPage.ordenarProdutos(ordenacao.nomeAZ);
    
    const contadorApós = await produtosPage.obterContadorCarrinho();
    expect(contadorApós).toBe(1);
    
    console.log('Carrinho mantido após mudança de filtro');
  });

  test('CT12 - Testar todos os filtros sequencialmente', async () => {
    console.log('Teste: Todos os filtros em sequência');

    const filtros = [
      { tipo: ordenacao.nomeAZ, nome: 'Nome A-Z' },
      { tipo: ordenacao.nomeZA, nome: 'Nome Z-A' },
      { tipo: ordenacao.precoMenor, nome: 'Preço Menor' },
      { tipo: ordenacao.precoMaior, nome: 'Preço Maior' }
    ];

    for (const filtro of filtros) {
      console.log(`Testando filtro: ${filtro.nome}`);
      
      await produtosPage.ordenarProdutos(filtro.tipo);
      
      const quantidade = await produtosPage.obterQuantidadeProdutos();
      expect(quantidade).toBe(6);
      console.log(` - ${quantidade} produtos exibidos corretamente`);
  
      await produtosPage.aguardar(500);
    }
    
    console.log('Todos os filtros funcionando corretamente');
  });
});
