import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class usersluizalabs extends Model {
	static init(sequelize) {
		super.init({
			cep: Sequelize.STRING,
			rua: Sequelize.STRING,
			email: Sequelize.STRING,
			senha: Sequelize.STRING,
			token: Sequelize.STRING,
			bairro: Sequelize.STRING,
			cidade: Sequelize.STRING,
			estado: Sequelize.STRING,
			password: Sequelize.VIRTUAL,
			ultimo_login: Sequelize.STRING,
			expira_login: Sequelize.STRING
		}, 
		{
			sequelize,
		});
		this.addHook('beforeSave', async user => {
			user.password = user.senha;
			user.senha = await bcrypt.hash(user.password, 10);
		});

		return this;
	}
	checkPassword(password){
		return bcrypt.compare(password, this.senha);
	}

}

export default usersluizalabs;