import mongoose, { Schema } from 'mongoose';

const enrollmentSchema = new Schema(
    {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        completedSequence: { type: Number, default: 0 },
        status: { type: String, enum: ['Active', 'Completed'], default: 'Active' },
        archived: { type: Boolean, default: false },
        points: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    },
);

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
