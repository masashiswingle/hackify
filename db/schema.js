var mysql = require('mysql')
var Sequelize = require('sequelize');
var database = new Sequelize(process.env.DATABASE_URL || 'mysql://localhost/hackify', {
  user : 'root',
  password: '',
	dialect: 'mysql'
});

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

database
  .sync({force: true})
  .then(function (){
    console.log('Tables created');
   	return Songs.create({
 		  songName: 'pineapple pen',
 		  artistName: 'japanese man'
 	});
 });


module.exports = {
  Songs: Songs
};