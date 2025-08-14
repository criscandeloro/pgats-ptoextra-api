
// test/login.test.js
const chai = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const app = require('../src/app');
const loginService = require('../src/services/loginService');

const { expect } = chai;

describe('POST /login', () => {
  let authenticateStub;

  beforeEach(() => {
    // Antes de cada teste, criamos um stub para o método authenticate
    authenticateStub = sinon.stub(loginService, 'authenticate');
  });

  afterEach(() => {
    // Depois de cada teste, restauramos o método original
    authenticateStub.restore();
  });

  it('1. Deve retornar 200 e um token em caso de sucesso', async () => {
    const userCredentials = { email: 'test@example.com', password: 'password123' };
    const expectedToken = { token: 'fake-jwt-token' };

    // Configuramos o stub para retornar o token quando chamado com as credenciais corretas
    authenticateStub.withArgs(userCredentials.email, userCredentials.password).returns(expectedToken);

    const res = await request(app)
      .post('/login')
      .send(userCredentials);

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(expectedToken);
  });

  it('2. Deve retornar 401 para credenciais inválidas', async () => {
    const userCredentials = { email: 'wrong@example.com', password: 'wrongpassword' };
    const error = new Error('Invalid credentials');
    error.statusCode = 401;

    // Configuramos o stub para lançar um erro de autenticação
    authenticateStub.withArgs(userCredentials.email, userCredentials.password).throws(error);

    const res = await request(app)
      .post('/login')
      .send(userCredentials);

    expect(res.status).to.equal(401);
    expect(res.body).to.deep.equal({ message: 'Invalid credentials' });
  });

  it('3. Deve retornar 400 se o email não for fornecido', async () => {
    const userCredentials = { password: 'password123' };

    const res = await request(app)
      .post('/login')
      .send(userCredentials);

    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({ message: 'Email and password are required' });
  });

  it('4. Deve retornar 400 se a senha não for fornecida', async () => {
    const userCredentials = { email: 'test@example.com' };

    const res = await request(app)
      .post('/login')
      .send(userCredentials);

    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({ message: 'Email and password are required' });
  });

  it('5. Deve retornar 500 para erros inesperados do serviço', async () => {
    const userCredentials = { email: 'test@example.com', password: 'password123' };
    const error = new Error('Something went wrong');

    // Configuramos o stub para lançar um erro genérico
    authenticateStub.withArgs(userCredentials.email, userCredentials.password).throws(error);

    const res = await request(app)
      .post('/login')
      .send(userCredentials);

    expect(res.status).to.equal(500);
    expect(res.body).to.deep.equal({ message: 'Internal Server Error' });
  });
});
