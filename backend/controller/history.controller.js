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

export const updateHistory = async (req, res) => {
    const { id } = req.params
    const history = req.body
    try{
        const updatedHistory = await History.findByIdAndUpdate(id, history, {new: true})
        res.status(200).json({success: true, data: updatedHistory})
    } catch (error){
        console.log("Error in updating history: ",error.message)
        res.status(500).json({success: false, message: 'Server error'})
    }
}

export const deleteHistory = async (req, res) => {
    const { id } = req.params
    try{
        await History.findByIdAndDelete(id)
        res.status(200).json({success: true, message: 'History deleted successfully'})
    } catch (error){
        console.log("Error in deleting history: ",error.message)
        res.status(500).json({success: false, message: 'Server error'})
    }
}
