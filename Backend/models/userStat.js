import mongoose from 'mongoose';

const userStatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    lessonsCompleted: { type: Number, default: 0 },
    coursesCompleted: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
});

export default mongoose.model('UserStat', userStatSchema);
