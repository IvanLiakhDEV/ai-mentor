import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minLength: [10, 'Назва не може бути коротша за 10 символів'],
            maxLength: [100, 'Назва не може бути довша за 100 символів'],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minLength: [50, 'Опис не може бути коротшим за 50 символів'],
            maxLength: [500, 'Опис не може бути довшим за 500 символів'],
        },
        tags: [{ type: String, required: true, maxLength: [30, 'Текст не може бути довшим за 30 символів'] }],
        numOfParticipants: {
            type: Number,
            default: 0,
        },
        language: {
            type: String,
            enum: ['typescript', 'javascript', 'python', 'java', 'dart', 'ruby', 'cpp', 'c', 'csharp', 'sql', 'php'],
            default: 'javascript',
        },
        modules: [
            {
                title: { type: String, required: true },
                order: { type: Number, required: true },
            },
        ],
        isArchived: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
