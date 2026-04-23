import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Ім'я не може бути коротшим за 3 символи"],
        maxLength: [30, "Ім'я не може бути довшим за 30 символів"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Довжина пароля не може бути менше 8 симовлів'],
        select: false,
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student',
    },
    refreshToken: { type: String, default: null, select: false },
});

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
