const express = require('express');
const router = express.Router();
const User = require('../../../app-lib/Model/User');

router.post('/', async (req, res) => {
    const { name, age } = req.body;
    const userCreate = new User({ name, age });
    const user = await userCreate.save();
    res.json(user ? user : { message: 'User not created' });
});

router.get('/:id?', async (req, res) => {
    const id = req.params.id ?? null;
    let user;
    if (id) {
        user = await User.findById(id);
        
    } else {
        user = await User.find();
    }
    res.status((user) && user !== null ? 201 : 500).json(user ?? { message: 'User not found' });
});

module.exports = router;