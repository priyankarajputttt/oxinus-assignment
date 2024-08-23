const bcrypt = require('bcryptjs');
const Account = require('../models/accountModel');

const accountService = {
    createAccount: async (accountData) => {
        try {
            const hashedPassword = await bcrypt.hash(accountData.password, 10);
            const newAccountData = { ...accountData, password: hashedPassword };
            
            const id = await Account.create(newAccountData);
            return {id, ...newAccountData};
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    },

    getAccount: async (id) => {
        try {
            return await Account.findById(id);
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    },

    updateAccount: async (id, accountData) => {
        try {
            // Fetch the existing account data
            const existingAccount = await Account.findById(id);
    
            if (!existingAccount) {
                throw new Error('Account not found');
            }
    
            // Prepare the updated data object with existing values for required fields
            const updatedData = {
                first_name: accountData.first_name || existingAccount.first_name,
                last_name: accountData.last_name || existingAccount.last_name,
                email: accountData.email || existingAccount.email,
                phone: accountData.phone || existingAccount.phone,
                birthday: accountData.birthday || existingAccount.birthday,
                // Include password only if provided
                password: accountData.password ? await bcrypt.hash(accountData.password, 10) : existingAccount.password
            };
    
            // Update the account
            await Account.update(id, updatedData);
            return updatedData;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }
    ,
    
    

    deleteAccount: async (id) => {
        try {
            await Account.delete(id);
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    },

    listAccounts: async (limit) => {
        try {
            return await Account.list(limit);
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }
};

module.exports = accountService;
