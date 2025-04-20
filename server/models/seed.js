import { configDotenv } from 'dotenv'
import Session from '../models/Session.js'
import Plan from '../models/Plan.js'
import connectDB from '../config/db.js'

configDotenv()
connectDB()

const seedData = async () => {
    try {
        // 1. Clear old data
        await Session.deleteMany()
        await Plan.deleteMany()

        // 2. Insert sample sessions
        const sessions = [
            {
                date: new Date(),
                exercises: [
                    {
                        id: 12,
                        sets: 3,
                        reps: [10, 8, 6],
                        weight: [60, 70, 75],
                    },
                    {
                        id: 9,
                        sets: 3,
                        reps: [8, 8, 6],
                        weight: [40, 45, 50],
                    },
                ],
                notes: 'Good session!',
            },
            {
                date: new Date(),
                exercises: [
                    {
                        id: 20,
                        sets: 4,
                        reps: [12, 10, 10, 8],
                        weight: [30, 35, 40, 45],
                    },
                ],
                notes: 'Leg day!',
            },
        ]

        await Session.insertMany(sessions)

        // 3. Insert sample plans
        const plans = [
            {
                name: 'Push Day',
                schedule: ['Monday'],
                exercises: [{ exerciseId: 9 }, { exerciseId: 12 }],
                public: true,
            },
            {
                name: 'Leg Day',
                schedule: ['Wednesday'],
                exercises: [{ exerciseId: 20 }, { exerciseId: 15 }],
                public: false,
            },
        ]

        await Plan.insertMany(plans)

        console.log('Seeding complete!')
        process.exit()
    } catch (err) {
        console.error('Seeding failed:', err.message)
        process.exit(1)
    }
}

seedData()
