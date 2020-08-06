const User = require('../models/user');

exports.read = (req, res) => {
    const userId = req.params.userId;
    User.findById(userId).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: 'User not fount'
            })
        }
        user.hashed_password=undefined;
        user.salt=undefined;
        return res.json({
            user
        })
    })
};

exports.update = (req, res) => {
    // console.log(req.user, req.body);
    const {name, password} = req.body;
    User.findOne({_id:req.user._id},(err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        if(!name) {
            return res.status(400).json({
                error:'Name is required'
            });
        }else{
            user.name=name
        }

        if(password) {
            if(password.length<6){
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            }else{
                user.password=password
            }
        }
        user.save((err, updatedUser) => {
            if(err){
                return res.status(400).json({
                    error:'USer update failed '
                });
            }
            updatedUser.hashed_password=undefined
            updatedUser.salt=undefined
            return res.json(updatedUser);
        })
    })
}