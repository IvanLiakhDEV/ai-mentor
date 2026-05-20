import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconUrl: { type: String, default: 'https://www.svgrepo.com/show/452120/trophy.svg' },
    xpReward: { type: Number, default: 0 },
    conditionType: { type: String, required: true },
    targetValue: { type: Number, required: true },
});

export default mongoose.model('Achievement', achievementSchema);
