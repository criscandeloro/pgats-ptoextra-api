
// src/routes/loginRoutes.js
const { Router } = require('express');
const loginController = require('../controllers/loginController');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoint de autenticação de usuário
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário.
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: fake-jwt-token
 *       400:
 *         description: Email e senha são obrigatórios
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', loginController.login);

module.exports = router;
