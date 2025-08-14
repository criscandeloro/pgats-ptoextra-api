
// src/services/loginService.js
const UserModel = require('../models/userModel');

// Simula um banco de dados de usuários
const users = [
  new UserModel('test@example.com', 'password123'),
];

class LoginService {
  authenticate(email, password) {
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    // Em um app real, aqui você geraria um token (ex: JWT)
    return { token: 'fake-jwt-token' };
  }
}

module.exports = new LoginService();
