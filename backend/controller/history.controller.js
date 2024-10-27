import History from "../models/history.model.js"

export const getHistory = async (req, res) => {
    try{
        const history = await History.find({});
        res.status(200).json({success: true, data: history})
    } catch (error){
        console.log("Error in getting history: ",error.message)
        res.status(500).json({success: false, message: 'Server error'})
    }
}

export const createHistory = async (req, res) => {
    const history = req.body
    try{
        const newHistory = new History(history)
        await newHistory.save()
        res.status(201).json({success: true, data: newHistory})
    } catch (error){
        console.log("Error in creating history: ",error.message)
        res.status(500).json({success: false, message: 'Server error'})
    }
}
