import slugify from "slugify";
import { nanoid } from 'nanoid';
import Trip from "../models/Trip.js"; 
import {Checklist, ChecklistItem} from "../models/Checklist.js";
import { getIO } from "../sockets/socket.js";


export const getChecklistById=async (req, res) => {
  const { slug, checklist_id } = req.params;
  const userId = req.user.id;

  try {
    // 1. Find the trip
    const trip = await Trip.findOne({ tripSlug: slug });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // 2. Check if checklist_id matches the trip’s checklistId 
    const checklist = await Checklist.findById(checklist_id)   
    const isChecklistInTrip = trip.checklists.some(checklist => checklist.toString() === checklist_id);
    if (!isChecklistInTrip) {
      return res.status(403).json({ error: "Checklist does not belong to this trip" });
    }

    // 3. Check if current user is part of the trip
    const isUserInTrip = trip.users.some(user => user.toString() === userId);
    if (!isUserInTrip) {
      return res.status(403).json({ error: "Access denied" });
    }

    // 4. Fetch and return checklist
    // const checklist = await Checklist.findById(checklist_id).populate("items.assignedTo", "name email");
    if (!checklist) {
      return res.status(404).json({ error: "Checklist not found" });
    }
    console.log("looooooooooooooooook",checklist);
    res.json({ checklist });

  } catch (err) {
    console.error("Error fetching checklist:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const addChecklistItem=async (req, res) => {
  const { slug, checklist_id } = req.params;
  const { label, assignedTo, checked=false} = req.body;
  const userId = req.user.id;
  console.log(slug);

  try {
    // 1. Find the trip
    const trip = await Trip.findOne({ tripSlug: slug });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // 2. Check if checklist_id matches the trip’s checklistId 
    const checklist = await Checklist.findById(checklist_id)
    const isChecklistInTrip = trip.checklists.some(checklist => checklist.toString() === checklist_id);
    // if (!trip.checklistId || trip.checklistId.toString() !== checklist_id) {
    //   return res.status(403).json({ error: "Checklist does not belong to this trip" });
    // } 
    console.log(isChecklistInTrip);
    if (!isChecklistInTrip) {
      return res.status(403).json({ error: "Checklist does not belong to this trip" });
    }

    // 3. Check if current user is part of the trip
    const isUserInTrip = trip.users.some(user => user.toString() === userId);
    if (!isUserInTrip) {
      return res.status(403).json({ error: "Access denied" });
    }

    const checklistItem = new ChecklistItem({ label:label, assignedTo: assignedTo, checked: checked}); 
    console.log(checklist);
    // await checklistItem.save(); 
    
    console.log(`label: ${label}`); 
    checklist.items.push(checklistItem);
    await checklist.save();
    
   
    const io = getIO();
    
    io.to(slug.toString()).emit("checklist-updated", {
      checklistId:checklist_id,
      tripSlug: slug,
    });
  
    res.status(201).json(checklistItem);

  } catch (err) {
    console.error("Error fetching checklist:", err);
    res.status(500).json({ error: "Server error" });
  }
};



export const deleteChecklisItem=  async (req, res) => {
  const { slug, checklist_id, checklist_item_id } = req.params;
  const userId = req.user.id;
  console.log(slug);

  try {
    // 1. Find the trip
    const trip = await Trip.findOne({ tripSlug: slug });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // 2. Check if checklist_id matches the trip’s checklistId 
    const checklist = await Checklist.findById(checklist_id)
    const isChecklistInTrip = trip.checklists.some(checklist => checklist.toString() === checklist_id);
    // if (!trip.checklistId || trip.checklistId.toString() !== checklist_id) {
    //   return res.status(403).json({ error: "Checklist does not belong to this trip" });
    // } 
    console.log(isChecklistInTrip);
    if (!isChecklistInTrip) {
      return res.status(403).json({ error: "Checklist does not belong to this trip" });
    }

    // 3. Check if current user is part of the trip
    const isUserInTrip = trip.users.some(user => user.toString() === userId);
    if (!isUserInTrip) {
      return res.status(403).json({ error: "Access denied" });
    }
    await Checklist.findByIdAndUpdate(checklist_id, {
      $pull: {
        items: { _id: checklist_item_id }
      }
    });
    
    // io.emit("checklist-updated", { tripSlug: slug, checklistId: checklist_id });
    const io = getIO();
    io.to(slug.toString()).emit("checklist-updated", {
      checklistId:checklist_id,
      tripSlug: slug,
    });
  
  
    res.status(201).json({ response: "Success" });

  } catch (err) {
    console.error("Error fetching checklist:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const createEmptyChecklist= async (req, res) => {
    const { slug } = req.params;
    const userId = req.user.id;
    const { name } = req.body;
   
    const baseSlug = slugify(name, { lower: true });
    const checklistSlug = `${baseSlug}-${nanoid()}`;
     
    const trip = await Trip.findOne({ tripSlug: slug });
    console.log(trip); 
    
    if (!trip) return res.status(404).json({ error: "Trip not found" });
  
    const isMember = trip.users.some(u => u.toString() === userId);
    if (!isMember) return res.status(403).json({ error: "Access denied" });
  
    const checklist = new Checklist({ name:name, items: [], checklistSlug: checklistSlug}); 
    console.log(checklist);
    await checklist.save();
  
    trip.checklists.push(checklist._id);
    await trip.save();
  
    res.status(201).json(checklist);
  };
  

export const getAllChecklists=async (req, res) => {
    const { slug } = req.params;
    const userId = req.user.id;

    try{
        const trip= await Trip.findOne({ tripSlug: slug}).populate({
            path:"checklists", 
            select:"name", 
        }); 
        if (!trip) return res.status(404).json({ error: "Trip not found" });
        console.log(trip);
        const isMember= trip.users.some(user=>user.toString()===userId);
        if(!isMember)
        {
            return res.status(403).json({ error: "Access denied: not a trip member" });
        }

        res.json(trip.checklists);
    }catch(err){
        res.status(500).json({ error: "Server error" });
    }
  
   
  };
  
