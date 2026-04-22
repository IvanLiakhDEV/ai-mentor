import mongoose, { Schema } from 'mongoose';

const enrollmentSchema = new Schema(
    {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        completedSequence: { type: Number, default: 0 },
        status: { type: String, enum: ['Active', 'Completed'], default: 'Active' },
        archived: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

enrollmentSchema.post('save', async function () {
    if (this.isNew) await mongoose.model('Course').findByIdAndUpdate(this.courseId, { $inc: { numOfParticipants: 1 } });
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
