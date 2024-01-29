import { Schema, model } from "mongoose";


const userSchema = Schema({

});

const User = model("User", userSchema);

export default User;