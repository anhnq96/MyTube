const bcrypt = require('bcrypt');

class Hash {
    constructor() {
        this.saltRounds = 12;
    }
    /**
     * Generate a salt and hash
     * */
    make(text) {
        let salt = bcrypt.genSaltSync(this.saltRounds);
        let hash = bcrypt.hashSync(text, salt);
        return hash;
    }
}

module.exports = new Hash();