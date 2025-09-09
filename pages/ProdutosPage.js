import BasePage from './BasePage.js';

class ProdutosPage extends BasePage {
  constructor(page) {
    super(page);

    this.tituloPagina = '.title';
    this.listaProdutos = '.inventory_item';
    this.nomeProduto = '.inventory_item_name';
    this.precoProduto = '.inventory_item_price';
    this.botaoAdicionar = '.btn_inventory';
    this.botaoRemover = '.btn_secondary';
    this.filtroOrdenacao = '.product_sort_container';
    this.contadorCarrinho = '.shopping_cart_badge';
    this.linkCarrinho = '.shopping_cart_link';
    this.menuHamburguer = '#react-burger-menu-btn';
    this.linkLogout = '#logout_sidebar_link';
  }

  async estaNaPaginaProdutos() {
    const titulo = await this.obterTexto(this.tituloPagina);
    return titulo === 'Products';
  }

  async obterQuantidadeProdutos() {
    return await this.contarElementos(this.listaProdutos);
  }

  async obterNomesProdutos() {
    return await this.obterTodosTextos(this.nomeProduto);
  }

  async obterPrecosProdutos() {
    const textosPrecos = await this.obterTodosTextos(this.precoProduto);
    return textosPrecos.map((preco) => parseFloat(preco.replace('$', '')));
  }

  async ordenarProdutos(opcao) {
    await this.page.selectOption(this.filtroOrdenacao, opcao);
    await this.aguardar(1000);
  }

  async adicionarProdutoAoCarrinho(nomeProduto) {
    const produtos = await this.page.locator(this.listaProdutos).all();

    for (const produto of produtos) {
      const nome = await produto.locator(this.nomeProduto).textContent();
      if (nome === nomeProduto) {
        await produto.locator(this.botaoAdicionar).click();
        break;
      }
    }
  }

  async removerProdutoDoCarrinho(nomeProduto) {
    const produtos = await this.page.locator(this.listaProdutos).all();

    for (const produto of produtos) {
      const nome = await produto.locator(this.nomeProduto).textContent();
      if (nome === nomeProduto) {
        await produto.locator(this.botaoRemover).click();
        break;
      }
    }
  }

  async obterContadorCarrinho() {
    if (await this.estaVisivel(this.contadorCarrinho)) {
      const texto = await this.obterTexto(this.contadorCarrinho);
      return parseInt(texto);
    }
    return 0;
  }

  async irParaCarrinho() {
    await this.clicar(this.linkCarrinho);
  }

  async fazerLogout() {
    await this.clicar(this.menuHamburguer);
    await this.aguardar(500);
    await this.clicar(this.linkLogout);
  }

  async produtoTemBotaoAdicionar(nomeProduto) {
    const produtos = await this.page.locator(this.listaProdutos).all();

    for (const produto of produtos) {
      const nome = await produto.locator(this.nomeProduto).textContent();
      if (nome === nomeProduto) {
        return await produto.locator(this.botaoAdicionar).isVisible();
      }
    }
    return false;
  }
}

export default ProdutosPage;
