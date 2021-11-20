import * as Yup from 'yup';

import User from '../models/Users.js'
const {validationCEP} = require('../../services/cep.js');


class CEPController {

	async index(req, res) {
		try {

			const schema = Yup.object().shape({
				cep: Yup.string().required().min(8)
			});

			if ((req.body.cep).length > 8) {
				return res.status(401).json({
					message: 'CEP inválido'
				});
			}

			if (!(await schema.isValid(req.body))) {
				return res.status(401).json({
					message: 'Dados inválidos'
				});
			}

			const authToken = req.headers.authorization;
			const [, token] = authToken.split(' '); //Remove o Bearer

			var checkValues = await User.findOne({
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

					const updateValues = await User.update({
						"cep": infosCEP.cep,
						"rua": infosCEP.logradouro,
						"bairro": infosCEP.bairro,
						"cidade": infosCEP.localidade,
						"estado": infosCEP.uf
						}, {
						where: {
							id: checkValues['dataValues']['id']
						}
					});

					var checkValues = await User.findOne({
						where: {
							email: checkValues['dataValues']['email']
						}
					});


					if (checkValues) {
						updateValues,
						res.json({
							'cep': checkValues['dataValues']['cep'],
							'rua': checkValues['dataValues']['rua'],
							'bairro': checkValues['dataValues']['bairro'],
							'cidade': checkValues['dataValues']['cidade'],
							'estado': checkValues['dataValues']['uf']
						});
					}

				}
			}

		} catch (error) {
			console.log('[ERROR]', error);
		};


	}
}

export default new CEPController();