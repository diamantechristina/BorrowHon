import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    const notifications = await Notification.find({})
    res.status(200).json({data: notifications})
}

export const createNotification = async (req, res) => {
    const notification = req.body
    const newNotification = new Notification(notification)
    await newNotification.save()
    res.json({data:newNotification})
}

export const updateNotification = async (req, res) => {
    const { id } = req.params
    const notification = req.body
    const updatedNotification = await Notification.findByIdAndUpdate(id, notification, { new: true })
    res.json({data: updatedNotification})
}

export const deleteNotification = async (req, res) => {
    const { id } = req.params
    await Notification.findByIdAndDelete(id)
    res.json({ message: 'Notification deleted successfully' })
}

