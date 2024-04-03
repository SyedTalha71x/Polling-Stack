import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    image: { type: String },
    expirydate: { type: Date },
    category: { type: String },
    state: { type: String },
    options: [
        {
            newoptions: { type: String },
            count: { type: Number, default: 0 },
            votedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

        }
    ]
})

export default mongoose.models.polls || mongoose.model('polls', PollSchema);