const db = require('../../db');

class UserDAO {
  changeOnlineState ({ id, online }) {
    return db('user')
      .where('id', id)
      .update({ online });
  }
}

module.exports = new UserDAO();