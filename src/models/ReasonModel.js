
import mongoose, {Schema} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


const reasonSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});


reasonSchema.plugin(uniqueValidator);


export default  mongoose.model('Reason', reasonSchema);