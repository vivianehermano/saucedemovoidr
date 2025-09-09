import BasePage from './BasePage.js';

class CarrinhoPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.tituloPagina = '.title';
    this.itensCarrinho = '.cart_item';
    this.nomeItem = '.inventory_item_name';
    this.precoItem = '.inventory_item_price';
    this.quantidadeItem = '.cart_quantity';
    this.botaoRemover = '.btn_secondary';
    this.botaoContinuarComprando = '[data-test="continue-shopping"]';
    this.botaoCheckout = '[data-test="checkout"]';
  }

  async estaNaPaginaCarrinho() {
    const titulo = await this.obterTexto(this.tituloPagina);
    return titulo === 'Your Cart';
  }

  async obterQuantidadeItens() {
    return await this.contarElementos(this.itensCarrinho);
  }

  async obterNomesItens() {
    return await this.obterTodosTextos(this.nomeItem);
  }

  async obterPrecosItens() {
    const textosPrecos = await this.obterTodosTextos(this.precoItem);
    return textosPrecos.map(preco => parseFloat(preco.replace('$', '')));
  }

  async removerItem(nomeItem) {
    const itens = await this.page.locator(this.itensCarrinho).all();
    
    for (const item of itens) {
      const nome = await item.locator(this.nomeItem).textContent();
      if (nome === nomeItem) {
        await item.locator(this.botaoRemover).click();
        break;
      }
    }
  }

  async continuarComprando() {
    await this.clicar(this.botaoContinuarComprando);
  }

  async irParaCheckout() {
    await this.clicar(this.botaoCheckout);
  }

  async carrinhoEstaVazio() {
    const quantidade = await this.obterQuantidadeItens();
    return quantidade === 0;
  }

  async itemEstaNoCarrinho(nomeItem) {
    const nomes = await this.obterNomesItens();
    return nomes.includes(nomeItem);
  }
}

export default CarrinhoPage;