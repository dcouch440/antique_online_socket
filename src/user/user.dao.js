const User = require('./user.model');

class UserDAO {
  changeOnlineState ({ id, online }) {
    return User
      .query()
      .where('id', id)
      .update({ online });
  }
}

module.exports = new UserDAO();