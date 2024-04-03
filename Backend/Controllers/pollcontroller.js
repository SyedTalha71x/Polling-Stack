import Poll from "../Models/Poll.js";
import User from '../Models/User.js';

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
            options: editoptions,
            user: req.user.id
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

export const voteonPoll = async (req, res) => {
    try {
        const { pollId, optionindex } = req.body;
        let poll = await Poll.findById(pollId);
        const userId = req.user._id;

        if (!poll) {
            return res.status(400).json({ message: 'No Poll Found' });
        }

        if (optionindex < 0 || optionindex >= poll.options.length) {
            return res.status(400).json({ message: 'Invalid option index' });
        }
        for (let i = 0; i < poll.options.length; i++) {
            if (poll.options[i].votedBy.includes(userId)) {
                poll.options[i].count--;
                poll.options[i].votedBy.pull(userId);
            }
        }
        poll.options[optionindex].count++;
        poll.options[optionindex].votedBy.push(userId);
        await poll.save();
        res.status(200).json({ message: 'Voted Successfully', poll })
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Internal Server Error' });
    }
}

export const fetchspecific = async (req, res) => {
    try {
        const pollid = req.params.id;
        let poll = await Poll.findById(pollid);

        if (!poll) {
            return res.status(400).json({ message: 'Poll not found' });
        }

        let newdate = new Date();
        if (newdate > new Date(poll.expirydate)) {
            let totalcount = 0;
            poll.options.forEach(option => {
                totalcount += option.count;
            });
            let overallpolloptions = [];

            for (const option of poll.options) {
                const users = await User.find({ _id: { $in: option.votedBy } }, 'name');
                const userNames = users.map(user => user.name.split(','));
                overallpolloptions.push({
                    option: option.newoptions,
                    overallpercentage: (option.count / totalcount) * 100,
                    users: userNames
                });
            }
            return res.status(200).json({
                poll: {
                    title: poll.title,
                    image: poll.image,
                    expirydate: poll.expirydate,
                    category: poll.category,
                    state: poll.state,
                    options: overallpolloptions
                }
            });
        } else {
            return res.status(200).json({
                poll: {
                    title: poll.title,
                    image: poll.image,
                    expirydate: poll.expirydate,
                    category: poll.category,
                    state: poll.state,
                    options: poll.options
                }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};





