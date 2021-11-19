import * as Yup from 'yup';

import User from '../models/Users.js'


class UserController {

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

			const userExists = await User.findOne({
				where: { email: req.body.email }
			});

			if (userExists) {
				return res.status(401).json({
					message: 'E-mail já existente'
				});
			} // Verifica se o e-mail já existe.

			const values = await User.create(req.body);
			// Registra o usuário no banco de dados.

			if (values) {
				return res.status(201).json({
					id: values['dataValues']['id'],
					email: values['dataValues']['email'],
					senha: values['dataValues']['senha'],
					data_criacao: values['dataValues']['createdAt'],
					data_atualizacao: values['dataValues']['updatedAt']
				});
			} // Retorna os valores como resposta na requisição

		} catch (error) {
			console.log('[ERROR]', error);
		};

	};

}

export default new UserController();