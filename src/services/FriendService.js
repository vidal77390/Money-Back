import User from "../models/UserModel";
import UserService from "./UserService";
import mongoose from "mongoose";


class FriendService {

    constructor() {
        this.userModel = mongoose.model('users');

        this.addFriend = this.addFriend.bind(this);
    }

    async addFriend(username, friend){

        let user = await this.userModel.find({"username": username});
        console.log("user :", user);
    }


}

export default FriendService;