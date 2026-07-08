import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
    username:{
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
    password:{
    type: String,
    required: true,
    minlength: 6
  },
    profileImage:{
    type: String,
    default: "",
  }
}, { timestamps: true });

//hash the password before saving user to db
UserSchema.pre("save", async function () { //removed the next() function so the post csn work
  if (!this.isModified("password")) return ;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

UserSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
}

const User = mongoose.model("User", UserSchema);

export default User;