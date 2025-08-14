
// src/controllers/loginController.js
const loginService = require('../services/loginService');

class LoginController {
  login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const result = loginService.authenticate(email, password);
      return res.status(200).json(result);
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      // Erro inesperado
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new LoginController();
