import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js'; // adjust if needed
import connectDB from './config/db.js'; // your db connection logic

dotenv.config();
await connectDB();

const demoUsers = [
    {
        name: 'Test User',
        email: 'test@test.fi',
        passwordHash: await bcrypt.hash('test123', 12),
    },
];

try {
    await User.deleteMany(); // Optional: clear existing users
    await User.insertMany(demoUsers);
    console.log('✅ Demo users added');
} catch (err) {
    console.error('Error seeding users:', err);
} finally {
    mongoose.disconnect();
}
