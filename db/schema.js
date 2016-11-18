var mysql = require('mysql')
var Sequelize = require('sequelize');
var database = new Sequelize(process.env.DATABASE_URL || 'mysql://root:gulpfiction@localhost/hackify', {
  // password: 'gulpfiction',
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
  	},
    views: {
      type: Sequelize.INTEGER
    }
  });

database
  .sync({force: false})
  .then(function (){
    console.log('Tables created');
 })
  .catch(function(err) {
    console.log(err);
  })

module.exports = {
  Songs: Songs
};
