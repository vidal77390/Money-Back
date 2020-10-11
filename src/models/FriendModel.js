import mongoose, {Schema} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


const friendScehma = new Schema({
    name: {
        type: String,
        required: true
    },
    debt: [{type: Schema.Types.ObjectId, ref: 'Debt'}],

});

friendScehma.plugin(uniqueValidator);


export default  mongoose.model('Friend', friendScehma);