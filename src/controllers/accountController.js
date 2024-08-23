const accountService = require('../services/accountService');
const { accountSchema } = require('../validators/accountValidator');

const accountController = {
    createAccount: async (req, res) => {
        const { error } = accountSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        try {
            const createdAccount = await accountService.createAccount(req.body);
            res.status(201).json(createdAccount);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAccount: async (req, res) => {
        const { id } = req.params;
        try {
            const account = await accountService.getAccount(id);
            if (!account) return res.status(404).json({ error: 'Account not found' });
            res.json(account);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateAccount: async (req, res) => {
        
        try {
            const data = await accountService.updateAccount(req.params.id, req.body);
            res.json({ message: 'Account updated successfully', data : data });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteAccount: async (req, res) => {
        const { id } = req.params;
        try {
            await accountService.deleteAccount(id);
            res.json({ message: 'Account deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    listAccounts: async (req, res) => {
        const limit = parseInt(req.query.limit) || 10;
        try {
            const accounts = await accountService.listAccounts(limit);
            res.json(accounts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = accountController;
