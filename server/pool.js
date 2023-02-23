const pg = require("pg")
function  connectDatabase(){
	const  pool = new  pg.Pool ({

		user :  'postgres',
		password :  '199614',
		database :  'chatapp',
		host :  'localhost'

	})
		return  pool
	}
module.exports = { connectDatabase }


