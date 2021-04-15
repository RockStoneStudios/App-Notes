const router = require('express').Router();
const {renderSignUpForm,
       signup,
       renderSigninForm,
       signin,
       logout
    } = require('../controllers/users.controller');
   


router.get('/signup',renderSignUpForm);
router.post('/signup',signup);
router.get('/signin',renderSigninForm);
router.post('/signin',signin);

router.get('/logout',logout)




module.exports = router;