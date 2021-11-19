import * as Yup from 'yup';
var axios = require('axios');

const { validationCEP } = require('../models/CEP.js');
import User from '../models/Users.js'


class CEPController {

	async index(req, res) {
	
		const schema = Yup.object().shape({
			cep: Yup.string().required().min(8)
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(401).json({
				message: 'Dados inválidos'
			});
		}

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
				const infosCEP = await validationCEP(req.body.cep);

				const user = [
					{"cep":infosCEP.cep},
					{"rua":infosCEP.logradouro}, 
					{"bairro":infosCEP.bairro}, 
					{"cidade":infosCEP.localidade},
					{"estado":infosCEP.uf}
				]

				const updateValues = await User.update(user, {
					where: {
						id: checkValues['dataValues']['id']
					}
				});


				if (await updateValues) {
				return res.json({
					 "cep":infosCEP.cep,
					 "rua":infosCEP.logradouro,
					 "bairro":infosCEP.bairro,
					 "cidade":infosCEP.localidade,
					 "estado":infosCEP.uf
					});
			}

			}
		}

	}
}

export default new CEPController();