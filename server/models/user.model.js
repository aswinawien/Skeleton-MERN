import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required!"
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists!",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required"
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  hashed_password: {
    type: String,
    required: "Password is required!"
  },
  salt: String
});

//  Password is not directly stored in the db, instead we need to encrypt it first by making it a virtual field
UserSchema.virtual("password")
  .set(password => {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encyrptPassword(password);
  })
  .get(() => this._password);

UserSchema.path("hashed_password").validate(v => {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters. ");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
});

UserSchema.methods = {
  auhtenticate: plainText => {
    return this.encyrptPassword(plainText) === this.hashed_password;
  },
  encyrptPassword: password => {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  makeSalt: () => {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  }
};

export default mongoose.model("User", UserSchema);
