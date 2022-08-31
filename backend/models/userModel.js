import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default:false
    }
}, {
    timestamps: true
})


//because pass in database is encrypted we need to use decrypt now
//enteredPassword is plain text password
//we use decrypt to compare the entered pass to the one in the database thats hashed
//compare method - compare the plain text to the enccrypted password
//with this. we can access with all fields in users (pass, name...)
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}




const User = mongoose.model('User', userSchema)

export default User

