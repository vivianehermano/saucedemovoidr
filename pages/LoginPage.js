import BasePage from './BasePage.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.campoUsuario = '#user-name';
    this.campoSenha = '#password';
    this.botaoLogin = '#login-button';
    this.mensagemErro = '[data-test="error"]';
    this.logoLogin = '.login_logo';
  }

  async navegarParaLogin() {
    await this.irPara('/');
  }

  async fazerLogin(usuario, senha) {
    await this.preencher(this.campoUsuario, usuario);
    await this.preencher(this.campoSenha, senha);
    await this.clicar(this.botaoLogin);
  }

  async temMensagemErro() {
    return await this.estaVisivel(this.mensagemErro);
  }

  async obterMensagemErro() {
    if (await this.temMensagemErro()) {
      return await this.obterTexto(this.mensagemErro);
    }
    return '';
  }

  async estaNaPaginaLogin() {
    return await this.estaVisivel(this.logoLogin);
  }
}

export default LoginPage;
