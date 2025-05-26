const { Status } = require("../../config/constants");
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId:{
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null
    },
    image: {
      url: String,
      optimizedUrl: String,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);
const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel;