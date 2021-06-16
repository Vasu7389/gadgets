import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//this method is for authUser to compare the encrypted password and entered password by the user
//this.password will be equal to the current user's password, we can access this method in authUser
//hint, treat userSchema as a class which has method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//this method will be called just before SAVING the data for registration in the DB.
//this is to encrypt the entered password
//if operation is modification/update for data(that time also save call will be called) so check first if password ever isModified that means already created (NOT REGISTERING NEWLY).
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
