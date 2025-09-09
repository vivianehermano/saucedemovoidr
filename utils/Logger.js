export class Logger {
  constructor(contexto = 'Test') {
    this.contexto = contexto;
  }

  static info(mensagem, dados = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO: ${mensagem}`, dados);
  }

  static error(mensagem, dados = {}) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${mensagem}`, dados);
  }

  static warn(mensagem, dados = {}) {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] WARN: ${mensagem}`, dados);
  }

  static debug(mensagem, dados = {}) {
    const timestamp = new Date().toISOString();
    console.debug(`[${timestamp}] DEBUG: ${mensagem}`, dados);
  }

  info(mensagem, dados = {}) {
    Logger.info(`[${this.contexto}] ${mensagem}`, dados);
  }

  error(mensagem, dados = {}) {
    Logger.error(`[${this.contexto}] ${mensagem}`, dados);
  }

  warn(mensagem, dados = {}) {
    Logger.warn(`[${this.contexto}] ${mensagem}`, dados);
  }

  debug(mensagem, dados = {}) {
    Logger.debug(`[${this.contexto}] ${mensagem}`, dados);
  }

  logJson(level, mensagem, dados = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      context: this.contexto,
      message: mensagem,
      data: dados
    };
    
    console.log(JSON.stringify(logEntry, null, 2));
  }

  tempo(nome) {
    const inicio = Date.now();
    
    return {
      fim: () => {
        const duracao = Date.now() - inicio;
        this.info(`Tempo de execução: ${nome}`, { duracao: `${duracao}ms` });
        return duracao;
      }
    };
  }

  testeInicio(nomeDoTeste) {
    this.info(`🎯 TESTE INICIADO: ${nomeDoTeste}`);
  }

  testeFim(nomeDoTeste, sucesso = true) {
    const status = sucesso ? '✅ PASSOU' : '❌ FALHOU';
    this.info(`🏁 TESTE FINALIZADO: ${nomeDoTeste} - ${status}`);
  }

  acao(descricao, dados = {}) {
    this.info(`🔧 AÇÃO: ${descricao}`, dados);
  }

  verificacao(descricao, resultado = true) {
    const status = resultado ? '✅' : '❌';
    this.info(`${status} VERIFICAÇÃO: ${descricao}`);
  }
}

export const logger = new Logger('Default');

export const log = {
  info: Logger.info,
  error: Logger.error,
  warn: Logger.warn,
  debug: Logger.debug
};