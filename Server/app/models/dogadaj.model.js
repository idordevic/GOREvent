module.exports = (sequelize, Sequelize) => {
    const dogadaj = sequelize.define("dogadaj", {
      naziv: {
        type: Sequelize.STRING
      },
      opis: {
        type: Sequelize.STRING
      },
      favorit: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return dogadaj;
  };