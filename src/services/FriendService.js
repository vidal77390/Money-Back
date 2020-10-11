import User from "../models/UserModel";
import Reason from "../models/ReasonModel";
import Debt from "../models/DebtModel";
import Friend from "../models/FriendModel";
import UserService from "./UserService";
import mongoose from "mongoose";


class FriendService {

    constructor() {
        this.userModel = User;
        this.reasonModel = Reason;
        this.debtModel = Debt;
        this.friendModel = Friend;

        this.addFriend = this.addFriend.bind(this);
    }

    async addFriend(username, nameFriend) {

        try {
            let user = await this.userModel.findOne({"username": username});

            const newFriend = {
                name: nameFriend,
            }

            let friend = await this.friendModel.create(newFriend);
            user.friends.push(friend._id);
            let document = await user.save();
            return {
                error: false,
                statusCode: 202,
                document
            };

        } catch (error) {
            console.error(error);
            return {
                //error: true,
                statusCode: 500,
                error: error,
            };
        }

    }

    async getFriends(username) {
        try {
            let user = await this.userModel.findOne({"username": username}, 'friends').populate('friends');
            console.log("user : ", user);
            let friends = user.friends;
            return {
                statusCode: 202,
                friends
            }
        } catch (error) {
            console.error(error);
            return {
                //error: true,
                statusCode: 500,
                error: error,
            };
        }

    }

    async addDebt(idFriends, value) {
        const newDebt = {
            initialValue: value,
            value: value
        }
        
        try {
            let debt = await this.debtModel.create(newDebt);
            let friend = await this.friendModel.findById(idFriends);
            friend.debt.push(debt._id);
            let document = await friend.save();
            return {
                statusCode: 202,
                document
            }
        } catch (error) {
            console.error(error);
            return {
                //error: true,
                statusCode: 500,
                error: error,
            };
        }
    }

    async getDebt(idFriend) {
        try {
            let friend = await this.friendModel.findById(idFriend).populate('debt');
            let debts = friend.debt;
            return {
                statusCode: 202,
                debts
            }
        } catch (error) {
            console.error(error);
            return {
                //error: true,
                statusCode: 500,
                error: error,
            };
        }
    }


}

export default FriendService;