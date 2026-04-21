import mongoose, { Schema } from 'mongoose';

const lessonSchema = new Schema(
    {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
        moduleId: { type: mongoose.Schema.Types.ObjectId, required: true },
        sequenceNumber: { type: Number, required: true },
        title: {
            type: String,
            minLength: [5, 'Назва не може бути коротша за 5 символів'],
            maxLength: [100, 'Назва не може бути довша за 100 символів'],
        },
        theory: {
            content: { type: String, required: true },
        },
        practice: {
            taskDescription: { type: String, required: true },
            initialCode: { type: String, default: '' },
            expectedOutput: { type: String },
        },
    },
    {
        timestamps: true,
    },
);
lessonSchema.index({ courseId: 1, sequenceNumber: 1 }, { unique: true });

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
