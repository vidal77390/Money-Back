/**
 * Creating our Model
 */
import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

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
    friends: [{type: Schema.Types.ObjectId, ref: 'Friend'}]
}, {timestamps: true});



userSchema.plugin(uniqueValidator);



export default mongoose.model('User', userSchema);
