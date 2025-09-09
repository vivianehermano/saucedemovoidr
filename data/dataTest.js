export const usuarios = {
  valido: {
    nome: 'standard_user',
    senha: 'secret_sauce',
  },
  bloqueado: {
    nome: 'locked_out_user',
    senha: 'secret_sauce',
  },
  invalido: {
    nome: 'usuario_inexistente',
    senha: 'senha_errada',
  },
  vazio: {
    nome: '',
    senha: '',
  },
};

export const produtos = {
  mochila: 'Sauce Labs Backpack',
  luzBicicleta: 'Sauce Labs Bike Light',
  camisetaBolt: 'Sauce Labs Bolt T-Shirt',
  jaqueta: 'Sauce Labs Fleece Jacket',
  macacao: 'Sauce Labs Onesie',
  camisetaVermelha: 'Test.allTheThings() T-Shirt (Red)',
};

export const dadosCheckout = {
  valido: {
    nome: 'João',
    sobrenome: 'Silva',
    cep: '88000-000',
  },
  invalido: {
    nome: '',
    sobrenome: '',
    cep: '',
  },
  parcial: {
    nome: 'Maria',
    sobrenome: '',
    cep: '12345-678',
  },
};

export const ordenacao = {
  nomeAZ: 'az',
  nomeZA: 'za',
  precoMenor: 'lohi',
  precoMaior: 'hilo',
};

export const mensagensErro = {
  usuarioBloqueado: 'Epic sadface: Sorry, this user has been locked out.',
  credenciaisInvalidas:
    'Epic sadface: Username and password do not match any user in this service',
  nomeObrigatorio: 'Error: First Name is required',
  sobrenomeObrigatorio: 'Error: Last Name is required',
  cepObrigatorio: 'Error: Postal Code is required',
  usuarioObrigatorio: 'Epic sadface: Username is required',
  senhaObrigatoria: 'Epic sadface: Password is required',
  invalido: 'do not match any user',
  bloqueado: 'locked out',
  semUsuario: 'Username is required',
  semSenha: 'Password is required',
};

export const urls = {
  login: 'https://www.saucedemo.com/',
  produtos: 'https://www.saucedemo.com/inventory.html',
  carrinho: 'https://www.saucedemo.com/cart.html',
  checkout: 'https://www.saucedemo.com/checkout-step-one.html',
};
