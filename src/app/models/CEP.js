const axios = require('axios').default;
const moment = require('moment');
global.timestampToken = null;

exports.validationCEP = async function (cep) {

	const findCEP = (cep) => {
		return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
	}

	try {
		var resultCep = await findCEP(cep)
		if (resultCep.status == 200 && resultCep.data.erro === true) {
			for (var i = cep.length - 1; i >= 0; i--) {
				cep = cep.split('')
				cep[i] = '0';
				cep = cep.join('');

				var resultCep = await findCEP(cep)
				if (resultCep.data.cep != undefined) {
					break
				}
			}
			return resultCep.data;
		} else if (resultCep.status == 200) {
			return resultCep.data;
		}

	} catch (error) {
		console.log("[ERROR]", error);
	};
}