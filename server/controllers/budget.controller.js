import Trip from "../models/Trip.js"; 
import { BudgetItem } from "../models/Budget.js";


// ---------- API calls for Budget  ----------
export const getBudget = async (req, res) => {
  const { slug } = req.params;
  const userId = req.user.id;
  console.log("I WAS CALLED");

  try {
    // 1. Find the trip
    const trip = await Trip.findOne({ tripSlug: slug }).populate("budget");
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // 2. Check if current user is part of the trip
    const isUserInTrip = trip.users.some(user => user.toString() === userId);
    if (!isUserInTrip) {
      return res.status(403).json({ error: "Access denied" });
    }

    // 3. Fetch and return budget items
    return res.status(200).json(trip.budget);
  
  } catch (err) {
    console.error("Error fetching budget:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const  addToBudget = async (req, res) => {
  const { slug } = req.params;
  const userId = req.user.id;
  const { expense, date, amount, paidBy = [] } = req.body;

  try {
    // 1. Find the trip
    const trip = await Trip.findOne({ tripSlug: slug });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // 2. Check if current user is part of the trip
    const isUserInTrip = trip.users.some(user => user.toString() === userId);
    if (!isUserInTrip) {
      return res.status(403).json({ error: "Access denied" });
    }

    // 3. Fetch and return budget items

    const budgetItem = new BudgetItem({ expense:expense, date: date, amount: Number(amount), paidBy: paidBy}); 
    console.log(budgetItem);
    // await checklistItem.save(); 
    await budgetItem.save();
   
    trip.budget.push(budgetItem._id);
    await trip.save();
  
    res.status(201).json(budgetItem);


  
  
  } catch (err) {
    console.error("Error adding budget item:", err);
    res.status(500).json({ error: "Server error" });
  }
};

