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
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
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



//I want encrypt yhe password
//way that we can add middleware is on the user schema
//befaure we save, we are going to run an async function and this is going to take in just next
//This should automatically run pre save, we dont have to bring it in to our user controller 
userSchema.pre('save', async function (next) {

    //when we have update profile, chande name, email...but not the password we dont want this to run because it is
        //going to create a new hash and we are going to be able to log in.
    //if password dont modified we just call next and move on
    if ( !this.isModified('password')) {
        next()
    }
    //if has been modified, then this will run and it will hach the password.

    //we want to encrypt the passwords, so create salt beacause salt to actually hash the password asynchronously
    //generate salt and it takes in a number of rounds
    //beacuse this returns a promise I use await
    const salt = await bcrypt.genSalt(10)

    //initially this.password (in () after hash) is the plain text password, but now we are resetting 
        //it to be the hashd password
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User;
