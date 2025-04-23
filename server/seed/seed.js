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

  const users = await User.insertMany([
    {
      name: 'elias',
      email: 'elias@sample',
      passwordHash: await bcrypt.hash('banana1', 12),
    },
    {
      name: 'francis',
      email: 'francis@sample',
      passwordHash: await bcrypt.hash('banana2', 12),
    },
    {
      name: 'gitte',
      email: 'gitte@sample',
      passwordHash: await bcrypt.hash('banana3', 12),
    },
    {
      name: 'arne',
      email: 'arne@sample',
      passwordHash: await bcrypt.hash('banana4', 12),
    },
  ])

  const arne = users.find((u) => u.name === 'arne')

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

  if (exercises.length < 8) return console.error('Missing some exercises.')

  const [backday, legday, pushday, cardio] = await Workout.insertMany([
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
      public: true,
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
      public: false,
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
      public: true,
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
      public: false,
    },
  ])

  await Plan.insertMany([
    {
      userId: arne._id,
      name: 'Getting fit fast without pilates',
      description: 'Consists of the best workouts.',
      workouts: { Monday: backday._id, Tuesday: legday._id },
      public: true,
      active: true,
    },
    {
      userId: arne._id,
      name: 'Full Body Blast',
      description: 'Cycle through all major muscle groups.',
      workouts: {
        Monday: backday._id,
        Wednesday: pushday._id,
        Friday: legday._id,
      },
      public: true,
      active: false,
    },
    {
      userId: arne._id,
      name: 'Summer Shred',
      description: 'Get lean in 4 weeks.',
      workouts: {
        Tuesday: cardio._id,
        Thursday: pushday._id,
        Saturday: legday._id,
      },
      public: false,
      active: true,
    },
  ])

  await WorkoutLog.insertMany([
    {
      userId: arne._id,
      workoutId: legday._id,
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
    },
    {
      userId: arne._id,
      workoutId: pushday._id,
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
    },
    {
      userId: arne._id,
      workoutId: cardio._id,
      exercises: [
        {
          exerciseId: getEx('Wall balls')._id,
          sets: [{ reps: 15 }, { reps: 12 }],
        },
      ],
    },
  ])

  console.log('Seed finished successfully.')
}

seedData().catch((err) => console.error('Seed failed:', err))
