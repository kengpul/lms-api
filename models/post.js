const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Conten cannot be blank"],
    },

    // likes: [   like move to sprint 3
    //   {
    //     name: String,
    //   },
    // ],

    comments: [
      {
        // name: String,
        text: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
