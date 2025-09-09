import { Logger } from '../utils/Logger.js';

export default class BasePage {
  constructor(page) {
    this.page = page;
    this.timeout = 30000;
    this.retries = 3;
  }

  async irPara(url) {
    await this.page.goto(url);
    Logger.info('Navegou para URL', { url });
  }

  async aguardarElemento(seletor) {
    await this.page.waitForSelector(seletor, { timeout: 10000 });
  }

  async clicar(seletor) {
    await this.aguardarElemento(seletor);
    await this.page.click(seletor);
    Logger.info('Elemento clicado', { seletor });
  }

  async preencher(seletor, texto) {
    await this.aguardarElemento(seletor);
    await this.page.fill(seletor, texto);
    Logger.info('Campo preenchido', { seletor, texto });
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

  async aguardar(ms) {
    await this.page.waitForTimeout(ms);
  }
}
