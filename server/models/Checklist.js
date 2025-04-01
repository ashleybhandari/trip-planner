import mongoose from 'mongoose';
import Trip from './Trip.js';
import User from './User.js'

const checklistItemSchema= new mongoose.Schema({
  label:{
    type: String,
    required: true,
  }, 
  assignedTo:{
     type: String,
     required: false, 
  }, 
  checked:
  {
    type: Boolean, 
    required: true, 
  }

}); 

const checklistSchema = new mongoose.Schema({
  name:{
    type: String, 
    required: true,
  },
  items: [checklistItemSchema], 
  checklistSlug:
  {
        type: String, 
        required: true
  }, 


}, {timestamps: true} 
); 



const Checklist = mongoose.model("Checklist", checklistSchema);
const ChecklistItem = mongoose.model("ChecklistItem", checklistItemSchema);

export  {Checklist, ChecklistItem};