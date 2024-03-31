import Poll from "../Models/Poll.js";

export const addnewpoll = async (req, res) => {
    try {
        const { title, image, expirydate, category, state, options } = req.body;
        const editoptions = options.map(option => ({ newoptions: option, count: 0 }));
        const poll = new Poll({
            title,
            image,
            expirydate,
            category,
            state,
            options: editoptions
        });
        await poll.save();
        res.status(201).json({ message: 'Poll has been created', poll });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const fetchallpolls = async (req, res) => {
    try {
        const data = await Poll.find({ state: 'Active' }).sort({ _id: -1 });
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Internal Server Error' })
    }
}


