const bcrypt = require("bcryptjs");

module.exports = {
  hash(password) {
    return bcrypt.hashSync(password, 10);
  },
  compare(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
};
