/** FIle Containing all of our API's Routes*/

// Import Controller
import userController from "../src/controllers/UserController";


// Utilisé dans /config/server.js
export default (app) => {


    app.get('/', function (req, res) {
        res.send("Welcome to your API");
    })

    app.post('/user', userController.createAccount)
        .post('/user/login', userController.login);

    app.post('/friend', userController.addFriend)
        .get('/friends', userController.getFriend)
        .post('/friend/addDebt', userController.addDebt)
        .get('/friend/debt', userController.getDebt);


}