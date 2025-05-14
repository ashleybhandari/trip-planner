import mongoose from "mongoose";
import User from "./User.js";
import { Checklist } from "./Checklist.js";
import { BudgetItem } from "./Budget.js";
const { Schema } = mongoose;

const tripSchema = new Schema(
  {
    tripName: {
      type: String,
      required: true,
    },
    destinations: {
      type: String,
      required: true,
    },
    tripSlug: {
      type: String,
      required: true,
      unique: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],

    status: {
      type: Boolean,
      required: false,
    },

    destination: {
      type: String,
      default: "",
      required: false,
    },
    dates: {
      type: String,
      default: "",
      required: false,
    },
    collaborators: {
      type: String,
      default: "",
      required: false,
    },
    checklists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Checklist,
        required: false,
      },
    ],
    budget: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: BudgetItem,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
