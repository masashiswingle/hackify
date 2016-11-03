var Sequelize = require('sequelize')
var database = new Sequelize('soundbear', 'soundbear', '!Gummybear1', {
	host: 'soundbearserver.database.windows.net',
	dialect: 'mysql'
}
})

database
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

  var Songs = database.define('songs', {
  	songName: {
  		type: Sequelize.STRING
  	},
  	artistName: {
  		type: Sequelize.STRING
  	}
  });

 User.sync({force: true}).then(function (){
 	return Songs.create({
 		songName: 'pineapple pen',
 		artistName: 'japanese man'
 	});
 });
