import * as Yup from 'yup';

import User from '../models/Users.js'


class UserController {

	async store(req, res) {
		const schema = Yup.object().shape({
			email: Yup.string().email().required(),
			senha: Yup.string().required().min(6),
			cep: Yup.string().required().min(8)
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(401).json({
				message: 'Dados inválidos'
			});
		}

		const userExists = await User.findOne({
			where: {
				email: req.body.email
			}
		});

		if (userExists) {
			return res.status(401).json({
				message: 'E-mail já existente'
			});
		}

		const values = await User.create(req.body)

		if (values){
			return res.status(201).json({
				"user": values['dataValues']
			})
		}
	};

		async index(req, res) {
		const authToken = req.headers.authorization;
		const [, token] = authToken.split(' '); //Remove o Bearer

		const checkValues = await User.findOne({
			where: {
				id: req.params.user_id
			}
		});

		const checkToken = await User.findOne({
			where: {
				token: token,
				id: req.params.user_id
			}
		});

		// Verifica se o token ou usuário são divergentes
		if (!checkToken || !checkValues) {
			return res.status(401).json({
				message: 'Não autorizado'
			});
		}

		// Verifica se o token e usuários estão divergentes dos valores no DB.
		if (!checkValues && !checkToken) {
			return res.status(401).json({
				message: 'Não autorizado'
			});
		}

		if (checkValues && checkToken) {
			var dtExpiresLogin = checkToken['dataValues']['expira_login'];

			var dateNow = new Date();
			dateNow.setHours(dateNow.getHours());

			if (dtExpiresLogin < dateNow) {
				return res.status(401).json({
					message: 'Sessão Inválida'
				});
			} else {
				return res.json({
					user: {
						id: checkToken['dataValues']['id'],
						nome: checkToken['dataValues']['nome'],
						email: checkToken['dataValues']['email'],
						senha: checkToken['dataValues']['senha'],
						telefone: checkToken['dataValues']['telefone'],
						data_criacao: checkToken['dataValues']['createdAt'],
						data_atualizacao: checkToken['dataValues']['updatedAt'],
						ultimo_login: checkToken['dataValues']['ultimo_login']
					}
				});
			}
		}

	}

}

export default new UserController();