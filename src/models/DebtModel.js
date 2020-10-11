import mongoose, {Schema} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


const detteSchema = new Schema({
    initialValue: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    reason: {type: Schema.Types.ObjectId, ref: 'Reason'}
}, {timestamps: true});

detteSchema.plugin(uniqueValidator);


export default  mongoose.model('Debt', detteSchema);