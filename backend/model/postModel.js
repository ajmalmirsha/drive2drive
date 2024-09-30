const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required !"],
    },
    userId: {
        type: Types.objectId,
        ref: "Users"
    }
  },
  { timestamps: true }
);

const postModel = model("posts", postSchema);

module.exports = postModel;
