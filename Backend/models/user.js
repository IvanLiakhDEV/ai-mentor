import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username: { type: String, required: true, trim: true, minLength: [3, "Закоротке ім'я"], maxLength: [30, "Задовге ім'я"] },
        email: { type: String, required: true, unique: true },
        password: {
            type: String,
            required: true,
            minLength: [8, 'Пароль від 8 символів'],
            select: false,
        },
        role: {
            type: String,
            enum: ['student', 'admin'],
            default: 'student',
        },
        avatar: { type: String, required: false },
        about: { type: String, minLength: [16, 'Опис від 16 знаків'], maxLength: [200, 'Опис до 200 знаків'], required: false },
        refreshToken: { type: String, default: null, select: false },
    },
    { timestamps: true },
);

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.refreshToken;
        delete ret.__v;
        return ret;
    },
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
