const Helper = require('../../helpers');
const User = require('../../models/User');

class AuthController {
    /**
     * register new account
     * */
    async register(req, res) {
        console.log('register');
        const username = req.body.username;
        const password = req.body.password;
        const name = req.body.name;
        try {
            const user = await User.create({
                username,
                password: Helper.Hash.make(password),
                name: name
            });
            res.json({
                id: user._id,
                username: user.username,
                name: user.name,
                role: user.role,
                status: user.status,
                avatar: user.avatar
            });
        } catch (e) {
            res.json({
                status: e.code,
                message: e.message
            });
        }

    }
}

module.exports =  new AuthController();