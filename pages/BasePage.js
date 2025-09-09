export default class BasePage {
  constructor(page) {
    this.page = page;
  }

  async irPara(url) {
    await this.page.goto(url);
  }

  async aguardarElemento(seletor) {
    await this.page.waitForSelector(seletor, { timeout: 10000 });
  }

  async clicar(seletor) {
    await this.aguardarElemento(seletor);
    await this.page.click(seletor);
  }

  async preencher(seletor, texto) {
    await this.aguardarElemento(seletor);
    await this.page.fill(seletor, texto);
  }

  async obterTexto(seletor) {
    await this.aguardarElemento(seletor);
    return await this.page.textContent(seletor);
  }

  async estaVisivel(seletor) {
    try {
      await this.page.waitForSelector(seletor, { timeout: 5000 });
      return await this.page.isVisible(seletor);
    } catch {
      return false;
    }
  }

  async contarElementos(seletor) {
    return await this.page.locator(seletor).count();
  }

  async obterTodosTextos(seletor) {
    const elementos = await this.page.locator(seletor).all();
    const textos = [];
    for (const elemento of elementos) {
      textos.push(await elemento.textContent());
    }
    return textos;
  }

  obterUrlAtual() {
    return this.page.url();
  }

  async aguardar(ms) {
    await this.page.waitForTimeout(ms);
  }
}
