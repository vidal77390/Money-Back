import UserService from "../services/UserService.js"
import FriendService from "../services/FriendService.js"
import User from "../models/UserModel";

const userService = new UserService();
const friendService = new FriendService();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtExpirySeconds = 84500;
const jwtKey = process.env.JWT_KEY || 'mySecretKey';


class UserController {

    constructor() {
        this.userService = userService;
        this.friendService = friendService;

        this.createAccount = this.createAccount.bind(this);
        this.login = this.login.bind(this);

        this.addFriend = this.addFriend.bind(this);
        this.getFriend = this.getFriend.bind(this);

        this.addDebt = this.addDebt.bind(this);
        this.getDebt = this.getDebt.bind(this);
    }

    /*
     Creation de compte et login user
     */
    async login(req, res) {
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

    async addFriend(req, res) {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        let username;
        if (token) username = await this.isAuthenticate(token);
        // If not authenticatesend error 401
        if (!token || !username) res.status(401).send({error: "Bad credentials", statusCode: 401});

        //TODO gestion erreur parametre d'entrés

        let response = await this.friendService.addFriend(username, req.body.name);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async getFriend(req, res){
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        let username;
        if (token) username = await this.isAuthenticate(token);
        // If not authenticatesend error 401
        if (!token || !username) res.status(401).send({error: "Bad credentials", statusCode: 401});


        let response = await this.friendService.getFriends(username);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async addDebt(req, res){
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        let username;
        if (token) username = await this.isAuthenticate(token);
        let idFriend = req.body.idFriend;
        let value = req.body.value;
        // If not authenticatesend error 401
        if (!token || !username) res.status(401).send({error: "Bad credentials", statusCode: 401});
        // If body isn't correct send error
        if(!idFriend || !value) res.status(402).send({error: "Wrong body", statusCode: 402});
        console.log("idfriend : ", idFriend);
        console.log("value : ", value);

        let response = await this.friendService.addDebt(idFriend, value);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async getDebt(req, res){
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        let username;
        if (token) username = await this.isAuthenticate(token);
        let idFriend = req.body.idFriend;
        let value = req.body.value;
        // If not authenticatesend error 401
        if (!token || !username) res.status(401).send({error: "Bad credentials", statusCode: 401});
        // If body isn't correct send error
        if(!idFriend) res.status(402).send({error: "Wrong body", statusCode: 402});
        console.log("idfriend : ", idFriend);

        let response = await this.friendService.getDebt(idFriend);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
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
        try {
            let decoded = jwt.verify(token, jwtKey);
            return user = decoded.username;
        } catch (err) {
            return user = null;
        }
    }

}

export default new UserController();