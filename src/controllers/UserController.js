import UserService from "../services/UserService.js"
import FriendService from "../services/FriendService.js"
import User from "../models/UserModel";
const userService = new UserService();
const friendService = new FriendService();


class UserController {

    constructor() {
        this.userService = userService;
        this.friendService = friendService;

        this.createAccount = this.createAccount.bind(this);
        this.login = this.login.bind(this);

        this.addFriend = this.addFriend.bind(this);
    }

    /*
     Creation de compte et login user
     */
    async login(req, res){
        let response = await this.userService.login(req.body);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async createAccount(req, res) {
        let response = await this.userService.createAccount(req.body);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    /*
    Friend Part
     */

    async addFriend(req, res){
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        let username;
        console.log("token : ", token);
        if(token) username = await this.isAuthenticate(token);
        // If not authenticatesend error 401
        if(!token || !username) res.status(401).send({error: "Bad credentials", statusCode: 401});

        //TODO gestion erreur parametre d'entrés

        let response = await this.friendService.addFriend(req.body);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async isUsernameAvailable(req, res) {

        const username = req.query.username;
        if(username) {
            let response = await this.userService.isUsernameAvailable(username);
            if (response.error) return res.status(response.statusCode).send(response);
            return res.status(201).send(response);
        }else return res.status(500).send("no username");

    }


    async isAuthenticate(token) {

        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        //get token in header
        var user = '';
        // Vériftoken Token
        if (token == null) {
            return user = null;
        }

        // verify token
        try{
            let decoded = jwt.verify(token, jwtKey);
            return user = decoded.username;
        }
        catch(err) {
            return user = null;
        }
    }

}

export default new UserController();