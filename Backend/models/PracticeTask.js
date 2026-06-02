import mongoose, { Schema } from 'mongoose';

const practiceTaskSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: String, required: true },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    shortDescription: { type: String, required: true },
    language: { type: String, required: true },
    taskDescription: { type: String, required: true },
    initialCode: { type: String, default: '' },
    testCode: { type: String, required: true },
    points: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
    attempts: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    userCode: { type: String, default: '' },
});

const PracticeTask = mongoose.model('PracticeTask', practiceTaskSchema);

export default PracticeTask;
