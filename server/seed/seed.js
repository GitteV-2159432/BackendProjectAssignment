import categoryService from '../services/category-service.js'
import muscleService from '../services/muscle-service.js'
import exerciseService from '../services/exercise-service.js'
import Category from '../models/Category.js'
import Muscle from '../models/Muscle.js'
import Exercise from '../models/Exercise.js'
import User from '../models/User.js'
import WorkoutLog from '../models/Workout-Log.js'
import Workout from '../models/Workout.js'
import Plan from '../models/Plan.js'
import { configDotenv } from 'dotenv'
import connectDB from '../config/db.js'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

configDotenv()
connectDB()

const seedData = async () => {
  await Category.deleteMany()
  await Muscle.deleteMany()
  await Exercise.deleteMany()
  await Plan.deleteMany()
  await User.deleteMany()
  await WorkoutLog.deleteMany()
  await Workout.deleteMany()

  await categoryService.populateCategories()
  await muscleService.populateMuscles()
  await exerciseService.populateExercises()

  const exercises = await Exercise.find({
    name: {
      $in: [
        'Pull-ups',
        'Deadlifts',
        'Wall balls',
        'Dumbbell Lunges Walking',
        'Squats (Dumbbells)',
        'Push-Ups | Decline',
        'Bench Press',
        'Suspended crossess',
      ],
    },
  })

  const getEx = (name) => exercises.find((ex) => ex.name === name)

  const users = await User.insertMany([
    {
      firstName: 'Elias',
      lastName: 'Sohm',
      email: 'elias@sample',
      passwordHash: await bcrypt.hash('banana1', 12),
      bookmarks: {
        exercises: [getEx('Pull-ups')._id, getEx('Deadlifts')._id],
      },
    },
    {
      firstName: 'Francis',
      lastName: 'Denz',
      email: 'francis@sample',
      passwordHash: await bcrypt.hash('banana2', 12),
    },
    {
      firstName: 'Gitte',
      lastName: 'Vandevenne',
      email: 'gitte@sample',
      passwordHash: await bcrypt.hash('banana3', 12),
    },
    {
      firstName: 'Arne',
      lastName: 'Vervaet',
      email: 'arne@sample',
      passwordHash: await bcrypt.hash('banana4', 12),
    },
  ])

  const arne = users.find((u) => u.firstName === 'Arne')
  const elias = users.find((u) => u.firstName === 'Elias')

  if (exercises.length < 8) return console.error('Missing some exercises.')

  const [backday, legday, pushday, cardio, backdayElias, cardioElias] =
    await Workout.insertMany([
      {
        userId: arne._id,
        name: 'Backday',
        description: 'Workout for shredding your back muscles.',
        exercises: [
          {
            exerciseId: getEx('Pull-ups')._id,
            sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
            restSecondsBetweenSets: 150,
            notes: 'Shoulders back.',
          },
          {
            exerciseId: getEx('Deadlifts')._id,
            sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
            restSecondsBetweenSets: 180,
            notes: 'Back straight!',
          },
        ],
        isPublic: true,
      },
      {
        userId: arne._id,
        name: 'Legday',
        description: 'Workout for getting a fat ass.',
        exercises: [
          {
            exerciseId: getEx('Wall balls')._id,
            sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
            restSecondsBetweenSets: 150,
          },
          {
            exerciseId: getEx('Dumbbell Lunges Walking')._id,
            sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
            restSecondsBetweenSets: 150,
          },
          {
            exerciseId: getEx('Squats (Dumbbells)')._id,
            sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
            restSecondsBetweenSets: 150,
            notes: 'Multijoint exercise.',
          },
        ],
        isPublic: false,
      },
      {
        userId: arne._id,
        name: 'Pushday',
        description: 'Targeting chest, triceps, and shoulders.',
        exercises: [
          {
            exerciseId: getEx('Push-Ups | Decline')._id,
            sets: [{ reps: 12 }, { reps: 10 }, { reps: 8 }],
            restSecondsBetweenSets: 90,
            notes: 'Feet elevated.',
          },
          {
            exerciseId: getEx('Bench Press')._id,
            sets: [
              { reps: 10, weight: 60 },
              { reps: 8, weight: 70 },
              { reps: 6, weight: 75 },
            ],
            restSecondsBetweenSets: 180,
            notes: 'Controlled reps.',
          },
          {
            exerciseId: getEx('Suspended crossess')._id,
            sets: [{ reps: 12 }, { reps: 10 }],
            restSecondsBetweenSets: 120,
            notes: 'Squeeze hard.',
          },
        ],
        isPublic: true,
      },
      {
        userId: arne._id,
        name: 'Cardio Madness',
        description: 'Short but brutal cardio session.',
        exercises: [
          {
            exerciseId: getEx('Wall balls')._id,
            sets: [{ reps: 15 }, { reps: 12 }],
            restSecondsBetweenSets: 90,
          },
        ],
        isPublic: false,
      },
      {
        userId: elias._id,
        name: 'Backday',
        description: 'Workout for wide back.',
        exercises: [
          {
            exerciseId: getEx('Pull-ups')._id,
            sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
            restSecondsBetweenSets: 150,
            notes: 'Shoulders back.',
          },
          {
            exerciseId: getEx('Deadlifts')._id,
            sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
            restSecondsBetweenSets: 180,
            notes: 'Back straight!',
          },
        ],
        isPublic: true,
      },
      {
        userId: elias._id,
        name: 'Cardio',
        description: 'Short but brutal cardio session.',
        exercises: [
          {
            exerciseId: getEx('Wall balls')._id,
            sets: [{ reps: 15 }, { reps: 12 }],
            restSecondsBetweenSets: 90,
          },
        ],
        isPublic: false,
      },
    ])

  await User.updateOne(
    { _id: arne._id },
    {
      $set: {
        'bookmarks.workouts': [backday._id, pushday._id, backdayElias.id],
      },
    }
  )

  await Plan.insertMany([
    {
      userId: arne._id,
      name: 'Getting fit fast without pilates',
      description: 'Consists of the best workouts.',
      workouts: {
        monday: [backday._id, cardio._id],
        tuesday: [legday._id],
      },
      isPublic: true,
      active: true,
    },
    {
      userId: arne._id,
      name: 'Full Body Blast',
      description: 'Cycle through all major muscle groups.',
      workouts: {
        monday: [backday._id],
        wednesday: [pushday._id],
        friday: [legday._id],
      },
      isPublic: true,
      active: false,
    },
    {
      userId: arne._id,
      name: 'Summer Shred',
      description: 'Get lean in 4 weeks.',
      workouts: {
        tuesday: [cardio._id],
        thursday: [pushday._id],
        saturday: [legday._id],
      },
      isPublic: false,
      active: true,
    },
  ])

  await WorkoutLog.insertMany([
    {
      userId: arne._id,
      workoutId: legday._id,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      exercises: [
        {
          exerciseId: getEx('Wall balls')._id,
          sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
        },
        {
          exerciseId: getEx('Dumbbell Lunges Walking')._id,
          sets: [
            { reps: 10, weight: 20 },
            { reps: 8, weight: 20 },
            { reps: 6, weight: 20 },
          ],
        },
        {
          exerciseId: getEx('Squats (Dumbbells)')._id,
          sets: [
            { reps: 10, weight: 80 },
            { reps: 8, weight: 80 },
            { reps: 10, weight: 70 },
          ],
        },
      ],
      durationInMinutes: 120,
    },
    {
      userId: arne._id,
      workoutId: pushday._id,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      exercises: [
        {
          exerciseId: getEx('Push-Ups | Decline')._id,
          sets: [{ reps: 12 }, { reps: 10 }, { reps: 8 }],
        },
        {
          exerciseId: getEx('Bench Press')._id,
          sets: [
            { reps: 10, weight: 60 },
            { reps: 8, weight: 70 },
            { reps: 6, weight: 75 },
          ],
        },
        {
          exerciseId: getEx('Suspended crossess')._id,
          sets: [{ reps: 12 }, { reps: 10 }],
        },
      ],
      durationInMinutes: 60,
    },
    {
      userId: arne._id,
      workoutId: cardio._id,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      exercises: [
        {
          exerciseId: getEx('Wall balls')._id,
          sets: [{ reps: 15 }, { reps: 12 }],
        },
      ],
      durationInMinutes: 80,
    },
  ])

  console.log('Seed finished successfully.')
}

try {
  await seedData()
} catch (error) {
  console.error('Seed failed:', error)
} finally {
  mongoose.disconnect()
}
