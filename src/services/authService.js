const bcrypt = require('bcryptjs');

const authService = {
    comparePassword: async (password, accountPassword) => {
        try {
            const validPassword = await bcrypt.compare(password, accountPassword);
            if (!validPassword) {
                return false
            }
            
            return true;
        } catch (err) {
            throw new Error('Service error: ' + err.message);
        }
    },
};

module.exports = authService;
