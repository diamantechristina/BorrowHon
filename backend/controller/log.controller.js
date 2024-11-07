import Log from "../models/log.model.js";

export const getLog = async (req, res) => {
    try {
        const log = await Log.find({});
        res.status(200).json({ success: true, data: log });
    } catch (error) {
        console.log("Error in getting logs: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const updateLog = async (req, res) => {
    const { id } = req.params
    const log = req.body
    try{
        const updatedLog = await Log.findByIdAndUpdate(id, log, {new: true})
        res.status(200).json({success: true, data: updatedLog})
    } catch (error){
        console.log("Error in updating Log: ",error.message)
        res.status(500).json({success: false, message: 'Server error'})
    }
}

export const createLog = async (req, res) => {
    const log = req.body;
    try {
        const newLog = new Log(log);
        await newLog.save();
        res.status(201).json({ success: true, data: newLog });
    } catch (error) {
        console.log("Error in creating log: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

