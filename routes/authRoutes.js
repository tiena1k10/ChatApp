const {Router} = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.get('/', (req, res) => res.render('home'));
router.get('/smoothies', (req, res) => res.render('smoothies'));
router.get("/signup", authController.singup_get);
router.post("/signup",authController.singup_post);
router.get("/login",authController.login_get);
router.post("/login",authController.login_post);



module.exports = router;