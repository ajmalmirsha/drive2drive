const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username required !"],
    },
    email: {
      type: String,
      required: [true, "email required !"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password required"],
      select: false,
    },
    phone: {
      type: Number,
      default: null,
    },
    image: {
      type: Object,
      default: {},
    },
    dob: {
      type: String,
      default: "",
    },
    block: {
      type: Boolean,
      default: false,
    },
    license: {
      front: {
        type: Object,
        default: {
          url: "",
          id: "",
        },
      },
      rear: {
        type: Object,
        default: {
          url: "",
          id: "",
        },
      },
      verification: {
        type: String,
        default: "pending",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
});

module.exports = mongoose.model("Users", userSchema);
