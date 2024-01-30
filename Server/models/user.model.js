import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';


const userSchema = Schema({
    fullName: {
        type: String,
        required: [true, "user name is required"],
        minLength: [5, "name must be at least 5 char"],
        maxLength: [50, "name must be less than 50 char"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "user email is required"],
        lowercase: true,
        unquie: [true, "already registered"],
        trim: true,
        match: ["^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", "Please fill in valid email address"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [8, "password must be at least 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: "string"            
        },
        secure_url: {
            type: "string"
        }
    },
    role: {
        type: "string",
        enum: ["USER", "ADMIN"],
        default: "USER"

    },
    forgotPasswordToken: {
        type: String,        
    },
    forgotPasswordExpiryDate: {
        type: Date,
    },

}, {
    timestamps: true
});

// password security
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    return next()
})

const User = model("User", userSchema);

export default User;