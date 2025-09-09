import BasePage from './BasePage.js';

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    this.tituloPagina = '.title';
    this.campoNome = '[data-test="firstName"]';
    this.campoSobrenome = '[data-test="lastName"]';
    this.campoCep = '[data-test="postalCode"]';
    this.botaoContinuar = '[data-test="continue"]';
    this.botaoCancelar = '[data-test="cancel"]';
    this.botaoFinalizar = '[data-test="finish"]';
    this.mensagemErro = '[data-test="error"]';
    this.subtotal = '.summary_subtotal_label';
    this.taxa = '.summary_tax_label';
    this.total = '.summary_total_label';
    this.mensagemSucesso = '.complete-header';
    this.botaoVoltar = '[data-test="back-to-products"]';
  }

  async estaNaPaginaInformacoes() {
    const titulo = await this.obterTexto(this.tituloPagina);
    return titulo === 'Checkout: Your Information';
  }

  async estaNaPaginaRevisao() {
    const titulo = await this.obterTexto(this.tituloPagina);
    return titulo === 'Checkout: Overview';
  }

  async estaNaPaginaConclusao() {
    const titulo = await this.obterTexto(this.tituloPagina);
    return titulo === 'Checkout: Complete!';
  }

  async preencherInformacoes(nome, sobrenome, cep) {
    await this.preencher(this.campoNome, nome);
    await this.preencher(this.campoSobrenome, sobrenome);
    await this.preencher(this.campoCep, cep);
  }

  async continuar() {
    await this.clicar(this.botaoContinuar);
  }

  async cancelar() {
    await this.clicar(this.botaoCancelar);
  }

  async finalizar() {
    await this.clicar(this.botaoFinalizar);
  }

  async obterMensagemErro() {
    if (await this.estaVisivel(this.mensagemErro)) {
      return await this.obterTexto(this.mensagemErro);
    }
    return '';
  }

  async obterSubtotal() {
    const texto = await this.obterTexto(this.subtotal);
    const match = texto.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async obterTaxa() {
    const texto = await this.obterTexto(this.taxa);
    const match = texto.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async obterTotal() {
    const texto = await this.obterTexto(this.total);
    const match = texto.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async obterMensagemSucesso() {
    return await this.obterTexto(this.mensagemSucesso);
  }

  async voltarParaProdutos() {
    await this.clicar(this.botaoVoltar);
  }

  async processarCheckoutCompleto(dadosUsuario) {
    await this.preencherInformacoes(
      dadosUsuario.nome,
      dadosUsuario.sobrenome,
      dadosUsuario.cep
    );
    await this.continuar();

    if (await this.estaNaPaginaRevisao()) {
      await this.finalizar();
      return await this.estaNaPaginaConclusao();
    }

    return false;
  }

  async verificarCalculos() {
    const subtotal = await this.obterSubtotal();
    const taxa = await this.obterTaxa();
    const total = await this.obterTotal();

    const totalCalculado = subtotal + taxa;
    const diferenca = Math.abs(total - totalCalculado);

    return diferenca < 0.01;
  }
}

export default CheckoutPage;
