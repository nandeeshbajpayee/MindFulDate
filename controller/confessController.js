const confessService = require('../services/confessService');
const Confess = require('../models/confess');

exports.addConfess = async (req, res) => {
    const { to, msg , by} = req.body;
    // const by = req.user.userId;
    console.log(req.body)

    try {
        const confess = await confessService.addConfess(to, msg, by);
        res.status(201).json({ message: "Confess added successfully", confess });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller function to fetch all confesses
exports.getAllConfesses = async (req, res) => {
    try {
        const confesses = await Confess.find();
        res.json(confesses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to fetch confesses by userId
exports.getConfessesByUserId = async (req, res) => {
    const userId = req.body.userId;
    try {
        const confesses = await Confess.find({ by: userId });
        res.json(confesses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



exports.getConfessesForUserId = async (req, res) => {
    const userId = req.body.userId;
    try {
        const confesses = await Confess.find({ to: userId });

        // Create an object to store messages grouped by sender
        const messagesBySender = {};

        // Iterate over each confess
        confesses.forEach(confess => {
            // Iterate over the 'to' array to find the index of userId
            confess.to.forEach((toUserId, index) => {
                if (toUserId === userId) {
                    const senderId = confess.by;
                    // Check if the sender is already in the object
                    if (!messagesBySender[senderId]) {
                        // If not, initialize an array for the sender
                        messagesBySender[senderId] = [];
                    }
                    // Push the message to the sender's array
                    messagesBySender[senderId].push(confess.msg[index]);
                }
            });
        });

        // Convert the object into an array of { by, msg } objects
        const response = Object.entries(messagesBySender).map(([by, msg]) => ({ by, msg }));

        // Send the response
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
