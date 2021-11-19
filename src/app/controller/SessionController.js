import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as Yup from 'yup';

import User from '../models/Users';

dotenv.config();
class SessionController {
	async store(req, res) {

		try {
			const schema = Yup.object().shape({
				email: Yup.string().email().required(),
				senha: Yup.string().required().min(6)
			});

			if (!(await schema.isValid(req.body))) {
				return res.status(401).json({
					message: 'Dados inválidos'
				});
			} // Valida os dados passados no body da requisição.

			const email = req.body.email;
			const senha = req.body.senha;

			const user = await User.findOne({
				where: { email }
			});

			// Verifica se o e-mail informado existe
			if (!user) {
				return res.status(401).json({
					message: 'Usuário e/ou senha inválidos'
				});
			}

			// Retorna o e-mail informado e verifica se a senha está incorreta
			if (!(await user.checkPassword(senha))) {
				return res.status(401).json({
					message: 'Usuário e/ou senha inválidos'
				});
			}

			var dateNow = new Date();
			dateNow.setHours(dateNow.getHours());

			var dateExpiresIn = new Date();
			dateExpiresIn.setHours(dateExpiresIn.getHours());

			var expiresIn = dateExpiresIn;
			expiresIn.setMinutes(expiresIn.getMinutes() + 30);
			//Acrescenta 30 min ao horário atual para validação de autenticação.

			const userId = user['dataValues']['id'];
			const userNome = user['dataValues']['nome'];

			var token = jwt.sign({
				userId,
				userNome,
				email
			}, process.env.SECRET, {
				expiresIn: process.env.EXPIRESIN,
			});


			const updateValues = await User.update({
				token: token,
				data_atualizacao: dateNow.toUTCString(),
				ultimo_login: dateNow.toUTCString(),
				expira_login: expiresIn.toUTCString()
			}, {
				where: {
					id: user['dataValues']['id']
				}
			});

			const checkValues = await User.findOne({
				where: {
					email: email
				}
			});


			if (checkValues) {
				updateValues,
				res.json({
					id: checkValues['dataValues']['id'],
					email: checkValues['dataValues']['email'],
					senha: req.body.senha,
					data_criacao: checkValues['dataValues']['createdAt'],
					data_atualizacao: checkValues['dataValues']['updated_at'],
					ultimo_login: checkValues['dataValues']['ultimo_login'],
					token: checkValues['dataValues']['token']
				});
			}

		} catch (error) {
			console.log('[ERROR]', error);
		};

	}
}


export default new SessionController();