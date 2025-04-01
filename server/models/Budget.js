import mongoose from 'mongoose';



const budgetItemSchema = new mongoose.Schema({
  expense:{
    type: String, 
    required: true,
  },
  date:{
    type: String, 
    required: true,
  },
 amount:{
    type: Number, 
    required: true

 }, 
 paidBy:
 {
    type: String, 
    required: true
 }


}, {timestamps: true} 
); 
const budgetSchema = new mongoose.Schema({

  items: [budgetItemSchema], 

}, {timestamps: true} 
); 

const Budget = mongoose.model("Budget", budgetSchema);
const BudgetItem = mongoose.model("BudgetItem", budgetItemSchema);

export  {Budget, BudgetItem};