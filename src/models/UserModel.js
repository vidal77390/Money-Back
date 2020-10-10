/**
 * Creating our Model
 */
import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class User {

    initSchema() {

        const motifSchema = new Schema({
            title: {
                type: String,
                required: true
            }
            //TODO add color to motif
        });

        const detteSchema = new Schema({
            initialValue: {
                type: Number,
                required: true
            },
            value: {
                type: Number,
                required: true
            },
            motif: motifSchema
        }, {timestamps: true});

        const friendScehma = new Schema({
            name: {
                type: String,
                required: true
            },
            dette: [detteSchema],

        });

        const userSchema = new Schema({
            username: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true
            },
            friends: [friendScehma]
        }, {timestamps: true});

        userSchema.plugin(uniqueValidator);
        mongoose.model('users', userSchema);
    }


    getInstance() {
        this.initSchema();
        return mongoose.model('users');
    }
}

export default User;
