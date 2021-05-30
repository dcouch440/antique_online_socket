const userDAO = require("../user/user.dao");

class UserService {
  async changeOnlineState ({ id, online }) {
    try {
      return await userDAO.changeOnlineState({ id, online });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new UserService();