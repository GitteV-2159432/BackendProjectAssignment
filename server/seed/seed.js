import bcrypt from 'bcrypt'
import { configDotenv } from 'dotenv'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import Category from '../models/Category.js'
import Exercise from '../models/Exercise.js'
import Muscle from '../models/Muscle.js'
import Plan from '../models/Plan.js'
import User from '../models/User.js'
import WorkoutLog from '../models/Workout-Log.js'
import Workout from '../models/Workout.js'
import categoryService from '../services/category-service.js'
import exerciseService from '../services/exercise-service.js'
import muscleService from '../services/muscle-service.js'

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

  // const exercises = await Exercise.find({
  //   name: {
  //     $in: [
  //       'Pull-ups',
  //       'Deadlifts',
  //       'Wall balls',
  //       'Dumbbell Lunges Walking',
  //       'Squats (Dumbbells)',
  //       'Push-Ups | Decline',
  //       'Bench Press',
  //       'Suspended crossess',
  //     ],
  //   },
  // })

  const exercises = {
    cardio: await Exercise.find({
      name: { $in: ['Suspended crossess', 'Talons fesses'] },
    }),
    legs: await Exercise.find({
      name: {
        $in: [
          'Standing Calf Stretch',
          'Lateral Push Off',
          'Hamstring Kicks',
          'Front Squats',
          'Dumbbell Goblet Squat',
          'Double Leg Calf Raise',
        ],
      },
    }),
    abs: await Exercise.find({
      name: {
        $in: [
          'Crunches',
          'Incline Crunches',
          'Side Crunch',
          'Plank',
          'Plank Shoulter Taps',
          'Russion Twist',
        ],
      },
    }),
    back: await Exercise.find({
      name: {
        $in: [
          'Bent Over Dumbbell Rows',
          'Bent Over Rowing',
          'Chin-ups',
          'Deadlifts',
          'Incline Chest-Supported Dumbbell Row',
          'Pull-ups',
          'Single Arm Plank to Row',
        ],
      },
    }),
    arms: await Exercise.find({
      name: {
        $in: [
          'Alternating Biceps Curls With Dumbbell',
          'Barbell Triceps Extension',
          'Bench Press Narrow Grip',
          'Claps over the head',
          'Dips Between Two Benches',
          'Hammercurls',
          'Push Ups',
          'Shoulder Press (Dumbbell)',
        ],
      },
    }),
    chest: await Exercise.find({
      name: {
        $in: [
          'Inverted Rows',
          'Incline Dumbbell Press',
          'Incline Dumbbell Bench Press',
          'Fly With Dumbbells',
          'Dips',
          'Close-grip Press-ups',
          'Bench Press',
        ],
      },
    }),
  }

  const getEx = (category, name) =>
    exercises[category].find((ex) => ex.name === name)

  const users = await User.insertMany([
    {
      firstName: 'Elias',
      lastName: 'Sohm',
      email: 'elias@sample',
      passwordHash: await bcrypt.hash('banana1', 12),
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
    {
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@sample',
      type: 'admin',
      passwordHash: await bcrypt.hash('Admin', 12),
    },
  ])

  const elias = users.find((u) => u.firstName === 'Elias')
  const francis = users.find((u) => u.firstName === 'Francis')
  const gitte = users.find((u) => u.firstName === 'Gitte')
  const arne = users.find((u) => u.firstName === 'Arne')

  if (exercises.length < 8) return console.error('Missing some exercises.')

  const workouts = await Workout.insertMany([
    {
      userId: arne._id,
      name: 'Cardio Burn',
      description: 'Quick cardio session for endurance.',
      exercises: [
        {
          exerciseId: getEx('cardio', 'Suspended crossess')._id,
          sets: [{ reps: 15 }, { reps: 15 }],
          restSecondsBetweenSets: 60,
          notes: 'Keep the core tight throughout.',
        },
        {
          exerciseId: getEx('cardio', 'Talons fesses')._id,
          sets: [{ reps: 20 }, { reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 90,
          notes: 'Stay light on the feet.',
        },
      ],
      isPublic: true,
    },
    {
      userId: francis._id,
      name: 'Leg Day Strength',
      description: 'Powerful leg day session.',
      exercises: [
        {
          exerciseId: getEx('legs', 'Front Squats')._id,
          sets: [{ reps: 8 }, { reps: 8 }, { reps: 6 }, { reps: 6 }],
          restSecondsBetweenSets: 180,
          notes: 'Keep knees behind toes.',
        },
        {
          exerciseId: getEx('legs', 'Double Leg Calf Raise')._id,
          sets: [{ reps: 12 }, { reps: 12 }],
          restSecondsBetweenSets: 90,
          notes: 'Pause at the top of the motion.',
        },
      ],
      isPublic: false,
    },
    {
      userId: elias._id,
      name: 'Upper Body Builder',
      description: 'Hit arms, chest and back in one session.',
      exercises: [
        {
          exerciseId: getEx('chest', 'Bench Press')._id,
          sets: [{ reps: 10 }, { reps: 8 }, { reps: 6 }],
          restSecondsBetweenSets: 150,
          notes: 'Touch chest lightly at the bottom.',
        },
        {
          exerciseId: getEx('arms', 'Hammercurls')._id,
          sets: [{ reps: 12 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Avoid swinging your arms.',
        },
        {
          exerciseId: getEx('back', 'Deadlifts')._id,
          sets: [{ reps: 6 }, { reps: 6 }, { reps: 6 }],
          restSecondsBetweenSets: 180,
          notes: 'Back straight! Engage glutes.',
        },
      ],
      isPublic: true,
    },
    {
      userId: gitte._id,
      name: 'Abs Focus',
      description: 'Short and intense ab workout.',
      exercises: [
        {
          exerciseId: getEx('abs', 'Crunches')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 60,
          notes: 'Chin away from chest.',
        },
        {
          exerciseId: getEx('abs', 'Incline Crunches')._id,
          sets: [{ reps: 30 }, { reps: 30 }],
          restSecondsBetweenSets: 60,
          notes: 'Twist from the core, not the shoulders.',
        },
        {
          exerciseId: getEx('abs', 'Plank')._id,
          sets: [{ reps: 60 }],
          restSecondsBetweenSets: 90,
          notes: 'Stay tight from head to heels.',
        },
      ],
      isPublic: true,
    },
    {
      userId: elias._id,
      name: 'Back Attack',
      description: 'Back workout to improve posture and strength.',
      exercises: [
        {
          exerciseId: getEx('back', 'Pull-ups')._id,
          sets: [{ reps: 8 }, { reps: 6 }, { reps: 6 }],
          restSecondsBetweenSets: 150,
          notes: 'Full range of motion!',
        },
        {
          exerciseId: getEx('back', 'Incline Chest-Supported Dumbbell Row')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Squeeze shoulder blades together.',
        },
      ],
      isPublic: true,
    },
    {
      userId: francis._id,
      name: 'Chest & Arms Combo',
      description: 'Build pushing and curling strength.',
      exercises: [
        {
          exerciseId: getEx('chest', 'Fly With Dumbbells')._id,
          sets: [{ reps: 12 }, { reps: 12 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Keep a slight bend in the elbows.',
        },
        {
          exerciseId: getEx('arms', 'Push Ups')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 90,
          notes: 'Elbows at 45 degrees.',
        },
        {
          exerciseId: getEx('arms', 'Alternating Biceps Curls With Dumbbell')
            ._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Controlled movement both up and down.',
        },
      ],
      isPublic: true,
    },
    {
      userId: gitte._id,
      name: 'Full Body Blast',
      description: 'Functional full-body circuit workout.',
      exercises: [
        {
          exerciseId: getEx('legs', 'Dumbbell Goblet Squat')._id,
          sets: [{ reps: 12 }, { reps: 12 }, { reps: 12 }],
          restSecondsBetweenSets: 90,
          notes: 'Keep chest proud.',
        },
        {
          exerciseId: getEx('arms', 'Shoulder Press (Dumbbell)')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Don’t lock out at the top.',
        },
        {
          exerciseId: getEx('abs', 'Plank Shoulter Taps')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 60,
          notes: 'Keep hips steady.',
        },
      ],
      isPublic: true,
    },
    {
      userId: arne._id,
      name: 'Lower Body Power',
      description: 'Explosive lower body training.',
      exercises: [
        {
          exerciseId: getEx('legs', 'Lateral Push Off')._id,
          sets: [{ reps: 12 }, { reps: 12 }, { reps: 10 }],
          restSecondsBetweenSets: 90,
          notes: 'Explode with each push.',
        },
        {
          exerciseId: getEx('legs', 'Hamstring Kicks')._id,
          sets: [{ reps: 15 }, { reps: 15 }],
          restSecondsBetweenSets: 60,
          notes: 'Keep leg extended straight behind.',
        },
      ],
      isPublic: false,
    },
    {
      userId: francis._id,
      name: 'Shoulder Strength',
      description: 'Focused shoulder workout.',
      exercises: [
        {
          exerciseId: getEx('arms', 'Shoulder Press (Dumbbell)')._id,
          sets: [{ reps: 10 }, { reps: 10 }, { reps: 8 }],
          restSecondsBetweenSets: 150,
          notes: 'Don’t shrug up.',
        },
        {
          exerciseId: getEx('arms', 'Claps over the head')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 90,
          notes: 'Engage shoulders and core.',
        },
      ],
      isPublic: true,
    },
    {
      userId: elias._id,
      name: 'Core & Cardio',
      description: 'Get your heart pumping and abs fired up.',
      exercises: [
        {
          exerciseId: getEx('cardio', 'Talons fesses')._id,
          sets: [{ reps: 25 }, { reps: 25 }],
          restSecondsBetweenSets: 60,
          notes: 'Fast tempo.',
        },
        {
          exerciseId: getEx('abs', 'Side Crunch')._id,
          sets: [{ reps: 15 }, { reps: 15 }],
          restSecondsBetweenSets: 60,
          notes: 'Elbow to hip crunch motion.',
        },
      ],
      isPublic: true,
    },
    {
      userId: arne._id,
      name: 'Pull Strength',
      description: 'Back and biceps focused for stronger pulls.',
      exercises: [
        {
          exerciseId: getEx('back', 'Chin-ups')._id,
          sets: [{ reps: 6 }, { reps: 5 }, { reps: 4 }],
          restSecondsBetweenSets: 180,
          notes: 'Controlled negative.',
        },
        {
          exerciseId: getEx('arms', 'Barbell Triceps Extension')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Keep elbows tight.',
        },
      ],
      isPublic: false,
    },
    {
      userId: gitte._id,
      name: 'Quick Core',
      description: 'Fast and effective ab circuit.',
      exercises: [
        {
          exerciseId: getEx('abs', 'Incline Crunches')._id,
          sets: [{ reps: 15 }, { reps: 15 }],
          restSecondsBetweenSets: 60,
          notes: 'Exhale on the crunch.',
        },
        {
          exerciseId: getEx('abs', 'Plank')._id,
          sets: [{ reps: 60 }, { reps: 60 }],
          restSecondsBetweenSets: 90,
          notes: 'Keep glutes tight.',
        },
      ],
      isPublic: true,
    },
    {
      userId: francis._id,
      name: 'Chest Day',
      description: 'Push it hard with this chest-focused session.',
      exercises: [
        {
          exerciseId: getEx('chest', 'Incline Dumbbell Press')._id,
          sets: [{ reps: 10 }, { reps: 8 }, { reps: 6 }],
          restSecondsBetweenSets: 150,
          notes: 'Drive through the palms.',
        },
        {
          exerciseId: getEx('chest', 'Close-grip Press-ups')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 90,
          notes: 'Elbows close to ribs.',
        },
      ],
      isPublic: false,
    },
    {
      userId: elias._id,
      name: 'Explosive Lower Body',
      description: 'Improve power and stability in your legs.',
      exercises: [
        {
          exerciseId: getEx('legs', 'Lateral Push Off')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 90,
          notes: 'Explode off the leg.',
        },
        {
          exerciseId: getEx('legs', 'Standing Calf Stretch')._id,
          sets: [{ reps: 30 }, { reps: 30 }],
          restSecondsBetweenSets: 60,
          notes: 'Hold the stretch fully.',
        },
      ],
      isPublic: true,
    },
    {
      userId: gitte._id,
      name: 'Pump Arms',
      description: 'All biceps and triceps!',
      exercises: [
        {
          exerciseId: getEx('arms', 'Hammercurls')._id,
          sets: [{ reps: 12 }, { reps: 12 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Strict form.',
        },
        {
          exerciseId: getEx('arms', 'Dips Between Two Benches')._id,
          sets: [{ reps: 15 }, { reps: 15 }],
          restSecondsBetweenSets: 90,
          notes: 'Keep hips close to bench.',
        },
      ],
      isPublic: false,
    },
    {
      userId: francis._id,
      name: 'Bodyweight Blast',
      description: 'All bodyweight, no excuses.',
      exercises: [
        {
          exerciseId: getEx('arms', 'Push Ups')._id,
          sets: [{ reps: 20 }, { reps: 15 }, { reps: 15 }],
          restSecondsBetweenSets: 90,
          notes: 'Chest to ground.',
        },
        {
          exerciseId: getEx('chest', 'Inverted Rows')._id,
          sets: [{ reps: 12 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Squeeze shoulder blades.',
        },
      ],
      isPublic: true,
    },
    {
      userId: elias._id,
      name: 'Posterior Chain',
      description: 'Glutes, hamstrings and lower back.',
      exercises: [
        {
          exerciseId: getEx('back', 'Deadlifts')._id,
          sets: [{ reps: 6 }, { reps: 6 }, { reps: 6 }],
          restSecondsBetweenSets: 180,
          notes: 'Lift with hips, not back.',
        },
        {
          exerciseId: getEx('legs', 'Hamstring Kicks')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 90,
          notes: 'Squeeze hamstrings.',
        },
      ],
      isPublic: false,
    },
    {
      userId: arne._id,
      name: 'Functional Full Body',
      description: 'Efficient workout to hit all muscle groups.',
      exercises: [
        {
          exerciseId: getEx('legs', 'Front Squats')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 150,
          notes: 'Elbows up, chest up.',
        },
        {
          exerciseId: getEx('arms', 'Shoulder Press (Dumbbell)')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Brace the core.',
        },
        {
          exerciseId: getEx('abs', 'Plank Shoulter Taps')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 60,
          notes: 'Avoid hip sway.',
        },
      ],
      isPublic: true,
    },
    {
      userId: gitte._id,
      name: 'Power Push',
      description: 'Pushing muscles workout for upper body.',
      exercises: [
        {
          exerciseId: getEx('arms', 'Bench Press Narrow Grip')._id,
          sets: [{ reps: 8 }, { reps: 8 }],
          restSecondsBetweenSets: 150,
          notes: 'Keep wrists straight.',
        },
        {
          exerciseId: getEx('chest', 'Incline Dumbbell Bench Press')._id,
          sets: [{ reps: 10 }, { reps: 8 }],
          restSecondsBetweenSets: 120,
          notes: 'Control the descent.',
        },
      ],
      isPublic: false,
    },
    {
      userId: elias._id,
      name: 'HIIT Cardio Core',
      description: 'Mix of cardio and core training.',
      exercises: [
        {
          exerciseId: getEx('cardio', 'Suspended crossess')._id,
          sets: [{ reps: 30 }, { reps: 30 }],
          restSecondsBetweenSets: 60,
          notes: 'Fast tempo.',
        },
        {
          exerciseId: getEx('abs', 'Crunches')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 60,
          notes: 'Controlled and tight.',
        },
      ],
      isPublic: true,
    },
    {
      userId: arne._id,
      name: 'Upper Body Strength',
      description: 'Hit chest, shoulders, and arms.',
      exercises: [
        {
          exerciseId: getEx('chest', 'Bench Press')._id,
          sets: [{ reps: 8 }, { reps: 6 }, { reps: 4 }],
          restSecondsBetweenSets: 180,
          notes: 'Explode up, slow down.',
        },
        {
          exerciseId: getEx('arms', 'Shoulder Press (Dumbbell)')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 150,
          notes: 'Do not lock elbows.',
        },
      ],
      isPublic: true,
    },
    {
      userId: francis._id,
      name: 'Leg Burnout',
      description: 'Push your limits with a heavy leg day.',
      exercises: [
        {
          exerciseId: getEx('legs', 'Dumbbell Goblet Squat')._id,
          sets: [{ reps: 15 }, { reps: 12 }, { reps: 10 }],
          restSecondsBetweenSets: 150,
          notes: 'Keep dumbbell close.',
        },
        {
          exerciseId: getEx('legs', 'Double Leg Calf Raise')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 90,
          notes: 'Full range of motion.',
        },
      ],
      isPublic: false,
    },
    {
      userId: gitte._id,
      name: 'Core Focused',
      description: 'Strengthen your abs and stabilize your spine.',
      exercises: [
        {
          exerciseId: getEx('abs', 'Plank Shoulter Taps')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 60,
          notes: 'Twist from the torso.',
        },
        {
          exerciseId: getEx('abs', 'Side Crunch')._id,
          sets: [{ reps: 15 }, { reps: 15 }],
          restSecondsBetweenSets: 60,
          notes: 'Target the obliques.',
        },
      ],
      isPublic: true,
    },
    {
      userId: elias._id,
      name: 'Posterior Sculpt',
      description: 'Back, glutes, and hams.',
      exercises: [
        {
          exerciseId: getEx('back', 'Bent Over Rowing')._id,
          sets: [{ reps: 10 }, { reps: 10 }, { reps: 8 }],
          restSecondsBetweenSets: 150,
          notes: 'Flat back, row to waist.',
        },
        {
          exerciseId: getEx('legs', 'Hamstring Kicks')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 90,
          notes: 'Pause at top.',
        },
      ],
      isPublic: false,
    },
    {
      userId: francis._id,
      name: 'Chest & Triceps',
      description: 'Push muscles day for growth.',
      exercises: [
        {
          exerciseId: getEx('chest', 'Fly With Dumbbells')._id,
          sets: [{ reps: 12 }, { reps: 10 }, { reps: 8 }],
          restSecondsBetweenSets: 120,
          notes: 'Stretch wide.',
        },
        {
          exerciseId: getEx('arms', 'Barbell Triceps Extension')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 90,
          notes: 'Keep upper arms still.',
        },
      ],
      isPublic: true,
    },
    {
      userId: gitte._id,
      name: 'Lower Body Circuit',
      description: 'Legs, calves, and mobility.',
      exercises: [
        {
          exerciseId: getEx('legs', 'Lateral Push Off')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 90,
          notes: 'Control landing.',
        },
        {
          exerciseId: getEx('legs', 'Standing Calf Stretch')._id,
          sets: [{ reps: 30 }, { reps: 30 }],
          restSecondsBetweenSets: 60,
          notes: 'Deep stretch.',
        },
      ],
      isPublic: false,
    },
    {
      userId: elias._id,
      name: 'Body Blast',
      description: 'Full-body strength and stability.',
      exercises: [
        {
          exerciseId: getEx('legs', 'Front Squats')._id,
          sets: [{ reps: 12 }, { reps: 10 }, { reps: 8 }],
          restSecondsBetweenSets: 150,
          notes: 'Brace core and push up.',
        },
        {
          exerciseId: getEx('back', 'Incline Chest-Supported Dumbbell Row')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Squeeze shoulder blades.',
        },
      ],
      isPublic: true,
    },
    {
      userId: arne._id,
      name: 'Back Builder',
      description: 'Lats and mid-back workout.',
      exercises: [
        {
          exerciseId: getEx('back', 'Single Arm Plank to Row')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Control each rep.',
        },
        {
          exerciseId: getEx('back', 'Pull-ups')._id,
          sets: [{ reps: 6 }, { reps: 5 }, { reps: 5 }],
          restSecondsBetweenSets: 180,
          notes: 'Full range every time.',
        },
      ],
      isPublic: false,
    },
    {
      userId: gitte._id,
      name: 'Glute Focus',
      description: 'Build stronger, rounder glutes.',
      exercises: [
        {
          exerciseId: getEx('legs', 'Dumbbell Goblet Squat')._id,
          sets: [{ reps: 12 }, { reps: 12 }],
          restSecondsBetweenSets: 120,
          notes: 'Drive through heels.',
        },
        {
          exerciseId: getEx('legs', 'Hamstring Kicks')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 90,
          notes: 'Isolate glutes.',
        },
      ],
      isPublic: true,
    },
    {
      userId: francis._id,
      name: 'Core & Cardio',
      description: 'Keep your heart rate up while engaging your abs.',
      exercises: [
        {
          exerciseId: getEx('cardio', 'Talons fesses')._id,
          sets: [{ reps: 30 }, { reps: 30 }],
          restSecondsBetweenSets: 60,
          notes: 'Stay light on feet.',
        },
        {
          exerciseId: getEx('abs', 'Plank Shoulter Taps')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 60,
          notes: 'Stay stable.',
        },
      ],
      isPublic: false,
    },
    {
      userId: elias._id,
      name: 'Power Chest',
      description: 'Hit your chest with explosive pushing exercises.',
      exercises: [
        {
          exerciseId: getEx('chest', 'Dips')._id,
          sets: [{ reps: 10 }, { reps: 10 }, { reps: 8 }],
          restSecondsBetweenSets: 150,
          notes: 'Lean forward to target chest.',
        },
        {
          exerciseId: getEx('chest', 'Bench Press')._id,
          sets: [{ reps: 8 }, { reps: 6 }],
          restSecondsBetweenSets: 180,
          notes: 'Heavy and slow.',
        },
      ],
      isPublic: false,
    },
    {
      userId: gitte._id,
      name: 'Leg & Core Burn',
      description: 'Alternate leg work and core holds.',
      exercises: [
        {
          exerciseId: getEx('legs', 'Double Leg Calf Raise')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 90,
          notes: 'Hold top for 1 second.',
        },
        {
          exerciseId: getEx('abs', 'Plank')._id,
          sets: [{ reps: 60 }, { reps: 60 }],
          restSecondsBetweenSets: 90,
          notes: 'Neck aligned with spine.',
        },
      ],
      isPublic: true,
    },
    {
      userId: francis._id,
      name: 'Cardio Boost',
      description: 'Quick, high-intensity cardio set.',
      exercises: [
        {
          exerciseId: getEx('cardio', 'Suspended crossess')._id,
          sets: [{ reps: 30 }, { reps: 30 }],
          restSecondsBetweenSets: 60,
          notes: 'Keep a quick rhythm.',
        },
        {
          exerciseId: getEx('cardio', 'Talons fesses')._id,
          sets: [{ reps: 30 }, { reps: 30 }],
          restSecondsBetweenSets: 60,
          notes: 'Knees soft, quick feet.',
        },
      ],
      isPublic: true,
    },
    {
      userId: arne._id,
      name: 'Arm Day Max',
      description: 'Biceps, triceps, and grip.',
      exercises: [
        {
          exerciseId: getEx('arms', 'Alternating Biceps Curls With Dumbbell')
            ._id,
          sets: [{ reps: 12 }, { reps: 10 }, { reps: 8 }],
          restSecondsBetweenSets: 120,
          notes: 'Full stretch and squeeze.',
        },
        {
          exerciseId: getEx('arms', 'Dips Between Two Benches')._id,
          sets: [{ reps: 15 }, { reps: 15 }],
          restSecondsBetweenSets: 90,
          notes: 'Shoulders down.',
        },
      ],
      isPublic: false,
    },
    {
      userId: elias._id,
      name: 'Strong Core',
      description: 'Challenge your abdominals with variety.',
      exercises: [
        {
          exerciseId: getEx('abs', 'Crunches')._id,
          sets: [{ reps: 25 }, { reps: 25 }],
          restSecondsBetweenSets: 60,
          notes: 'Hands off thighs.',
        },
        {
          exerciseId: getEx('abs', 'Incline Crunches')._id,
          sets: [{ reps: 15 }, { reps: 15 }],
          restSecondsBetweenSets: 60,
          notes: 'Pause at top.',
        },
      ],
      isPublic: true,
    },
    {
      userId: gitte._id,
      name: 'Back & Biceps',
      description: 'Pull-focused upper body day.',
      exercises: [
        {
          exerciseId: getEx('back', 'Chin-ups')._id,
          sets: [{ reps: 6 }, { reps: 6 }],
          restSecondsBetweenSets: 180,
          notes: 'Dead hang start.',
        },
        {
          exerciseId: getEx('arms', 'Hammercurls')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Keep elbows at sides.',
        },
      ],
      isPublic: false,
    },
    {
      userId: francis._id,
      name: 'Explosive Push',
      description: 'Chest and triceps in a fast-paced combo.',
      exercises: [
        {
          exerciseId: getEx('chest', 'Incline Dumbbell Press')._id,
          sets: [{ reps: 12 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Explode on the press.',
        },
        {
          exerciseId: getEx('arms', 'Push Ups')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 90,
          notes: 'Chest to ground, fast pace.',
        },
      ],
      isPublic: true,
    },
    {
      userId: arne._id,
      name: 'Athletic Legs',
      description: 'Legs with mobility and explosiveness.',
      exercises: [
        {
          exerciseId: getEx('legs', 'Lateral Push Off')._id,
          sets: [{ reps: 12 }, { reps: 12 }],
          restSecondsBetweenSets: 90,
          notes: 'Explode laterally.',
        },
        {
          exerciseId: getEx('legs', 'Standing Calf Stretch')._id,
          sets: [{ reps: 30 }, { reps: 30 }],
          restSecondsBetweenSets: 60,
          notes: 'Breathe deeply into stretch.',
        },
      ],
      isPublic: false,
    },
    {
      userId: elias._id,
      name: 'Chest Sculpt',
      description: 'Refine shape and strength in the pecs.',
      exercises: [
        {
          exerciseId: getEx('chest', 'Incline Dumbbell Bench Press')._id,
          sets: [{ reps: 10 }, { reps: 10 }, { reps: 8 }],
          restSecondsBetweenSets: 150,
          notes: 'Keep wrists over elbows.',
        },
        {
          exerciseId: getEx('chest', 'Close-grip Press-ups')._id,
          sets: [{ reps: 20 }, { reps: 20 }],
          restSecondsBetweenSets: 90,
          notes: 'Control the descent.',
        },
      ],
      isPublic: true,
    },
    {
      userId: gitte._id,
      name: 'Balanced Body',
      description: 'A full-body tune-up day.',
      exercises: [
        {
          exerciseId: getEx('legs', 'Front Squats')._id,
          sets: [{ reps: 12 }, { reps: 10 }],
          restSecondsBetweenSets: 150,
          notes: 'Chest tall.',
        },
        {
          exerciseId: getEx('arms', 'Shoulder Press (Dumbbell)')._id,
          sets: [{ reps: 10 }, { reps: 10 }],
          restSecondsBetweenSets: 120,
          notes: 'Core tight, controlled lift.',
        },
      ],
      isPublic: false,
    },
  ])

  const plans = await Plan.insertMany([
    {
      userId: arne._id,
      name: 'Full Body Blast',
      description:
        'Cycle through all major muscle groups for a complete workout.',
      workouts: {
        friday: [workouts[36]._id, workouts[2]._id, workouts[23]._id],
        monday: [workouts[33]._id, workouts[17]._id, workouts[39]._id],
        wednesday: [workouts[8]._id, workouts[26]._id],
        sunday: [workouts[33]._id, workouts[21]._id],
      },
      isPublic: false,
    },
    {
      userId: elias._id,
      name: 'Strength Cycle',
      description:
        'Progressively build strength and power with compound lifts.',
      workouts: {
        tuesday: [workouts[27]._id],
        friday: [workouts[18]._id],
        sunday: [workouts[34]._id, workouts[5]._id, workouts[19]._id],
        thursday: [workouts[34]._id, workouts[18]._id],
        wednesday: [workouts[31]._id],
      },
      isPublic: true,
    },
    {
      userId: francis._id,
      name: 'Lean Muscle Focus',
      description: 'Emphasize hypertrophy and muscle tone.',
      workouts: {
        tuesday: [workouts[27]._id, workouts[3]._id, workouts[28]._id],
        friday: [workouts[31]._id, workouts[0]._id],
        sunday: [workouts[12]._id],
      },
      isPublic: true,
    },
    {
      userId: gitte._id,
      name: 'HIIT Burner',
      description: 'High-intensity training to boost cardio and burn fat.',
      workouts: {
        monday: [workouts[21]._id, workouts[34]._id, workouts[36]._id],
        saturday: [workouts[23]._id, workouts[26]._id],
        thursday: [workouts[12]._id, workouts[24]._id, workouts[29]._id],
        sunday: [workouts[34]._id],
      },
      isPublic: true,
    },
    {
      userId: arne._id,
      name: 'Core Intensive',
      description: 'Target abdominal and core stabilizing muscles.',
      workouts: {
        monday: [workouts[28]._id, workouts[21]._id, workouts[38]._id],
        wednesday: [workouts[27]._id, workouts[9]._id, workouts[31]._id],
        thursday: [workouts[2]._id, workouts[6]._id, workouts[38]._id],
        saturday: [workouts[2]._id, workouts[1]._id],
      },
      isPublic: false,
    },
    {
      userId: elias._id,
      name: 'Leg Dominator',
      description: 'Isolate and power up the lower body.',
      workouts: {
        monday: [workouts[15]._id],
        wednesday: [workouts[22]._id, workouts[30]._id],
        saturday: [workouts[7]._id, workouts[19]._id],
        friday: [workouts[0]._id],
      },
      isPublic: false,
    },
    {
      userId: francis._id,
      name: 'Push-Pull Split',
      description: 'Balance push and pull movements for upper body symmetry.',
      workouts: {
        tuesday: [workouts[3]._id, workouts[11]._id],
        thursday: [workouts[25]._id, workouts[32]._id],
        saturday: [workouts[12]._id],
      },
      isPublic: true,
    },
    {
      userId: gitte._id,
      name: 'Cardio Core Mix',
      description: 'Heart rate meets abs in this hybrid workout.',
      workouts: {
        monday: [workouts[2]._id, workouts[8]._id],
        wednesday: [workouts[26]._id],
        sunday: [workouts[13]._id, workouts[30]._id],
      },
      isPublic: false,
    },
    {
      userId: arne._id,
      name: 'Upper Body Sculpt',
      description: 'Carve a defined upper body through isolation lifts.',
      workouts: {
        tuesday: [workouts[1]._id, workouts[15]._id],
        thursday: [workouts[35]._id],
        friday: [workouts[10]._id, workouts[18]._id],
      },
      isPublic: true,
    },
    {
      userId: elias._id,
      name: 'Power Week',
      description: 'High-effort week for maximum strength output.',
      workouts: {
        monday: [workouts[9]._id, workouts[17]._id],
        wednesday: [workouts[5]._id],
        saturday: [workouts[34]._id, workouts[7]._id, workouts[28]._id],
        sunday: [workouts[21]._id],
      },
      isPublic: true,
    },
    {
      userId: francis._id,
      name: 'Agility & Balance',
      description: 'Functional movements to improve body control.',
      workouts: {
        tuesday: [workouts[6]._id, workouts[19]._id],
        thursday: [workouts[13]._id],
        saturday: [workouts[32]._id, workouts[35]._id],
      },
      isPublic: false,
    },
    {
      userId: gitte._id,
      name: 'Mass Builder',
      description: 'Heavy loads and volume for muscle size.',
      workouts: {
        monday: [workouts[18]._id],
        wednesday: [workouts[11]._id, workouts[8]._id],
        friday: [workouts[27]._id, workouts[39]._id],
        saturday: [workouts[10]._id],
      },
      isPublic: true,
    },
    {
      userId: arne._id,
      name: 'Tone & Tighten',
      description: 'Shaping workouts with moderate resistance.',
      workouts: {
        tuesday: [workouts[4]._id],
        thursday: [workouts[9]._id, workouts[21]._id],
        sunday: [workouts[14]._id, workouts[16]._id],
      },
      isPublic: false,
    },
    {
      userId: elias._id,
      name: 'Mobility Flow',
      description: 'Stretch and strengthen through dynamic movement.',
      workouts: {
        monday: [workouts[2]._id],
        wednesday: [workouts[17]._id, workouts[31]._id],
        saturday: [workouts[5]._id],
      },
      isPublic: true,
    },
    {
      userId: francis._id,
      name: 'Shred Series',
      description: 'Get lean with circuits and supersets.',
      workouts: {
        tuesday: [workouts[28]._id, workouts[22]._id],
        thursday: [workouts[6]._id],
        friday: [workouts[29]._id, workouts[37]._id],
        sunday: [workouts[10]._id, workouts[12]._id],
      },
      isPublic: true,
    },
  ])

  await User.updateOne(
    { _id: arne._id },
    {
      $set: {
        'bookmarks.exercises': [
          getEx('abs', 'Plank')._id,
          getEx('legs', 'Dumbbell Goblet Squat')._id,
          getEx('arms', 'Shoulder Press (Dumbbell)')._id,
        ],
        'bookmarks.workouts': [
          workouts[3]._id,
          workouts[5]._id,
          workouts[9]._id,
          workouts[24]._id,
        ],
        'bookmarks.plans': [plans[1]._id, plans[6]._id, plans[11]._id],
        activePlan: plans[4]._id,
      },
    }
  )

  await User.updateOne(
    { _id: elias._id },
    {
      $set: {
        'bookmarks.exercises': [
          getEx('chest', 'Incline Dumbbell Bench Press')._id,
          getEx('back', 'Deadlifts')._id,
          getEx('legs', 'Front Squats')._id,
        ],
        'bookmarks.workouts': [
          workouts[3]._id,
          workouts[10]._id,
          workouts[18]._id,
        ],
        'bookmarks.plans': [plans[1]._id, plans[9]._id],
      },
    }
  )

  await User.updateOne(
    { _id: francis._id },
    {
      $set: {
        'bookmarks.exercises': [
          getEx('arms', 'Push Ups')._id,
          getEx('back', 'Chin-ups')._id,
          getEx('abs', 'Plank Shoulter Taps')._id,
        ],
        'bookmarks.workouts': [
          workouts[2]._id,
          workouts[6]._id,
          workouts[17]._id,
        ],
        'bookmarks.plans': [plans[2]._id, plans[10]._id],
      },
    }
  )

  await User.updateOne(
    { _id: gitte._id },
    {
      $set: {
        'bookmarks.exercises': [
          getEx('cardio', 'Suspended crossess')._id,
          getEx('legs', 'Hamstring Kicks')._id,
          getEx('chest', 'Fly With Dumbbells')._id,
        ],
        'bookmarks.workouts': [
          workouts[4]._id,
          workouts[8]._id,
          workouts[20]._id,
        ],
        'bookmarks.plans': [plans[3]._id, plans[7]._id],
      },
    }
  )

  await WorkoutLog.insertMany([
    {
      userId: arne._id,
      workoutId: [workouts[0]._id],
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      exercises: [
        {
          exerciseId: getEx('legs', 'Dumbbell Goblet Squat')._id,
          sets: [
            { reps: 12, weight: 50 },
            { reps: 10, weight: 55 },
            { reps: 8, weight: 60 },
          ],
        },
        {
          exerciseId: getEx('legs', 'Lateral Push Off')._id,
          sets: [
            { reps: 10, weight: 22 },
            { reps: 8, weight: 22 },
            { reps: 6, weight: 22 },
          ],
        },
        {
          exerciseId: getEx('legs', 'Hamstring Kicks')._id,
          sets: [
            { reps: 10, weight: 85 },
            { reps: 8, weight: 85 },
            { reps: 8, weight: 75 },
          ],
        },
        {
          exerciseId: getEx('chest', 'Incline Dumbbell Press')._id,
          sets: [
            { reps: 10, weight: 30 },
            { reps: 8, weight: 32 },
            { reps: 6, weight: 35 },
          ],
        },
      ],
      durationInMinutes: 115,
    },
    {
      userId: arne._id,
      workoutId: [workouts[4]._id],
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      exercises: [
        {
          exerciseId: getEx('legs', 'Dumbbell Goblet Squat')._id,
          sets: [
            { reps: 12, weight: 55 },
            { reps: 12, weight: 60 },
            { reps: 10, weight: 65 },
          ],
        },
        {
          exerciseId: getEx('legs', 'Lateral Push Off')._id,
          sets: [
            { reps: 12, weight: 20 },
            { reps: 12, weight: 20 },
            { reps: 10, weight: 22 },
          ],
        },
        {
          exerciseId: getEx('legs', 'Hamstring Kicks')._id,
          sets: [
            { reps: 12, weight: 80 },
            { reps: 10, weight: 80 },
            { reps: 8, weight: 75 },
          ],
        },
        {
          exerciseId: getEx('arms', 'Push Ups')._id,
          sets: [{ reps: 15 }, { reps: 12 }, { reps: 10 }],
        },
      ],
      durationInMinutes: 120,
    },
    {
      userId: arne._id,
      workoutId: [workouts[2]._id],
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      exercises: [
        {
          exerciseId: getEx('legs', 'Dumbbell Goblet Squat')._id,
          sets: [
            { reps: 10, weight: 70 },
            { reps: 8, weight: 75 },
            { reps: 6, weight: 80 },
          ],
        },
        {
          exerciseId: getEx('legs', 'Lateral Push Off')._id,
          sets: [
            { reps: 8, weight: 18 },
            { reps: 8, weight: 20 },
            { reps: 6, weight: 22 },
          ],
        },
        {
          exerciseId: getEx('legs', 'Hamstring Kicks')._id,
          sets: [
            { reps: 10, weight: 80 },
            { reps: 8, weight: 85 },
            { reps: 8, weight: 75 },
          ],
        },
        {
          exerciseId: getEx('chest', 'Fly With Dumbbells')._id,
          sets: [
            { reps: 12, weight: 12 },
            { reps: 10, weight: 14 },
            { reps: 8, weight: 15 },
          ],
        },
      ],
      durationInMinutes: 120,
    },
    {
      userId: arne._id,
      workoutId: [workouts[8]._id],
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      exercises: [
        {
          exerciseId: getEx('legs', 'Dumbbell Goblet Squat')._id,
          sets: [
            { reps: 12, weight: 60 },
            { reps: 10, weight: 65 },
            { reps: 8, weight: 70 },
          ],
        },
        {
          exerciseId: getEx('legs', 'Hamstring Kicks')._id,
          sets: [
            { reps: 10, weight: 20 },
            { reps: 10, weight: 22 },
            { reps: 8, weight: 22 },
          ],
        },
        {
          exerciseId: getEx('legs', 'Front Squats')._id,
          sets: [
            { reps: 10, weight: 80 },
            { reps: 8, weight: 80 },
            { reps: 6, weight: 75 },
          ],
        },
        {
          exerciseId: getEx('back', 'Bent Over Dumbbell Rows')._id,
          sets: [
            { reps: 12, weight: 25 },
            { reps: 10, weight: 30 },
            { reps: 8, weight: 35 },
          ],
        },
      ],
      durationInMinutes: 130,
    },
    {
      userId: arne._id,
      workoutId: [workouts[5]._id],
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      exercises: [
        {
          exerciseId: getEx('legs', 'Dumbbell Goblet Squat')._id,
          sets: [
            { reps: 8, weight: 75 },
            { reps: 8, weight: 80 },
            { reps: 6, weight: 85 },
          ],
        },
        {
          exerciseId: getEx('legs', 'Hamstring Kicks')._id,
          sets: [
            { reps: 12, weight: 20 },
            { reps: 10, weight: 22 },
            { reps: 8, weight: 22 },
          ],
        },
        {
          exerciseId: getEx('legs', 'Front Squats')._id,
          sets: [
            { reps: 10, weight: 85 },
            { reps: 8, weight: 85 },
            { reps: 8, weight: 80 },
          ],
        },
        {
          exerciseId: getEx('arms', 'Shoulder Press (Dumbbell)')._id,
          sets: [
            { reps: 10, weight: 22 },
            { reps: 8, weight: 25 },
            { reps: 6, weight: 28 },
          ],
        },
      ],
      durationInMinutes: 130,
    },
  ])

  // const [backday, legday, pushday, cardio, backdayElias, cardioElias] =
  //   await Workout.insertMany([
  //     {
  //       userId: arne._id,
  //       name: 'Backday',
  //       description: 'Workout for shredding your back muscles.',
  //       exercises: [
  //         {
  //           exerciseId: getEx('Pull-ups')._id,
  //           sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
  //           restSecondsBetweenSets: 150,
  //           notes: 'Shoulders back.',
  //         },
  //         {
  //           exerciseId: getEx('Deadlifts')._id,
  //           sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
  //           restSecondsBetweenSets: 180,
  //           notes: 'Back straight!',
  //         },
  //       ],
  //       isPublic: true,
  //     },
  //     {
  //       userId: arne._id,
  //       name: 'Legday',
  //       description: 'Workout for getting a fat ass.',
  //       exercises: [
  //         {
  //           exerciseId: getEx('Wall balls')._id,
  //           sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
  //           restSecondsBetweenSets: 150,
  //         },
  //         {
  //           exerciseId: getEx('Dumbbell Lunges Walking')._id,
  //           sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
  //           restSecondsBetweenSets: 150,
  //         },
  //         {
  //           exerciseId: getEx('Squats (Dumbbells)')._id,
  //           sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
  //           restSecondsBetweenSets: 150,
  //           notes: 'Multijoint exercise.',
  //         },
  //       ],
  //       isPublic: false,
  //     },
  //     {
  //       userId: arne._id,
  //       name: 'Pushday',
  //       description: 'Targeting chest, triceps, and shoulders.',
  //       exercises: [
  //         {
  //           exerciseId: getEx('Push-Ups | Decline')._id,
  //           sets: [{ reps: 12 }, { reps: 10 }, { reps: 8 }],
  //           restSecondsBetweenSets: 90,
  //           notes: 'Feet elevated.',
  //         },
  //         {
  //           exerciseId: getEx('Bench Press')._id,
  //           sets: [
  //             { reps: 10, weight: 60 },
  //             { reps: 8, weight: 70 },
  //             { reps: 6, weight: 75 },
  //           ],
  //           restSecondsBetweenSets: 180,
  //           notes: 'Controlled reps.',
  //         },
  //         {
  //           exerciseId: getEx('Suspended crossess')._id,
  //           sets: [{ reps: 12 }, { reps: 10 }],
  //           restSecondsBetweenSets: 120,
  //           notes: 'Squeeze hard.',
  //         },
  //       ],
  //       isPublic: true,
  //     },
  //     {
  //       userId: arne._id,
  //       name: 'Cardio Madness',
  //       description: 'Short but brutal cardio session.',
  //       exercises: [
  //         {
  //           exerciseId: getEx('Wall balls')._id,
  //           sets: [{ reps: 15 }, { reps: 12 }],
  //           restSecondsBetweenSets: 90,
  //         },
  //       ],
  //       isPublic: false,
  //     },
  //     {
  //       userId: elias._id,
  //       name: 'Backday',
  //       description: 'Workout for wide back.',
  //       exercises: [
  //         {
  //           exerciseId: getEx('Pull-ups')._id,
  //           sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
  //           restSecondsBetweenSets: 150,
  //           notes: 'Shoulders back.',
  //         },
  //         {
  //           exerciseId: getEx('Deadlifts')._id,
  //           sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
  //           restSecondsBetweenSets: 180,
  //           notes: 'Back straight!',
  //         },
  //       ],
  //       isPublic: true,
  //     },
  //     {
  //       userId: elias._id,
  //       name: 'Cardio',
  //       description: 'Short but brutal cardio session.',
  //       exercises: [
  //         {
  //           exerciseId: getEx('Wall balls')._id,
  //           sets: [{ reps: 15 }, { reps: 12 }],
  //           restSecondsBetweenSets: 90,
  //         },
  //       ],
  //       isPublic: false,
  //     },
  //   ])

  // await User.updateOne(
  //   { _id: arne._id },
  //   {
  //     $set: {
  //       'bookmarks.workouts': [backday._id, pushday._id, backdayElias.id],
  //     },
  //   }
  // )

  // await Plan.insertMany([
  //   {
  //     userId: arne._id,
  //     name: 'Getting fit fast without pilates',
  //     description: 'Consists of the best workouts.',
  //     workouts: {
  //       monday: [backday._id, cardio._id],
  //       tuesday: [legday._id],
  //     },
  //     isPublic: true,
  //     active: true,
  //   },
  //   {
  //     userId: arne._id,
  //     name: 'Full Body Blast',
  //     description: 'Cycle through all major muscle groups.',
  //     workouts: {
  //       monday: [backday._id],
  //       wednesday: [pushday._id],
  //       friday: [legday._id],
  //     },
  //     isPublic: true,
  //     active: false,
  //   },
  //   {
  //     userId: arne._id,
  //     name: 'Summer Shred',
  //     description: 'Get lean in 4 weeks.',
  //     workouts: {
  //       tuesday: [cardio._id],
  //       thursday: [pushday._id],
  //       saturday: [legday._id],
  //     },
  //     isPublic: false,
  //     active: true,
  //   },
  // ])

  // await WorkoutLog.insertMany([
  //   {
  //     userId: arne._id,
  //     workoutId: legday._id,
  //     date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  //     exercises: [
  //       {
  //         exerciseId: getEx('Wall balls')._id,
  //         sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
  //       },
  //       {
  //         exerciseId: getEx('Dumbbell Lunges Walking')._id,
  //         sets: [
  //           { reps: 10, weight: 20 },
  //           { reps: 8, weight: 20 },
  //           { reps: 6, weight: 20 },
  //         ],
  //       },
  //       {
  //         exerciseId: getEx('Squats (Dumbbells)')._id,
  //         sets: [
  //           { reps: 10, weight: 80 },
  //           { reps: 8, weight: 80 },
  //           { reps: 10, weight: 70 },
  //         ],
  //       },
  //     ],
  //     durationInMinutes: 120,
  //   },
  //   {
  //     userId: arne._id,
  //     workoutId: pushday._id,
  //     date: new Date(Date.now() - 24 * 60 * 60 * 1000),
  //     exercises: [
  //       {
  //         exerciseId: getEx('Push-Ups | Decline')._id,
  //         sets: [{ reps: 12 }, { reps: 10 }, { reps: 8 }],
  //       },
  //       {
  //         exerciseId: getEx('Bench Press')._id,
  //         sets: [
  //           { reps: 10, weight: 60 },
  //           { reps: 8, weight: 70 },
  //           { reps: 6, weight: 75 },
  //         ],
  //       },
  //       {
  //         exerciseId: getEx('Suspended crossess')._id,
  //         sets: [{ reps: 12 }, { reps: 10 }],
  //       },
  //     ],
  //     durationInMinutes: 60,
  //   },
  //   {
  //     userId: arne._id,
  //     workoutId: cardio._id,
  //     date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  //     exercises: [
  //       {
  //         exerciseId: getEx('Wall balls')._id,
  //         sets: [{ reps: 15 }, { reps: 12 }],
  //       },
  //     ],
  //     durationInMinutes: 80,
  //   },
  // ])

  console.log('Seed finished successfully.')
}

try {
  await seedData()
} catch (error) {
  console.error('Seed failed:', error)
} finally {
  mongoose.disconnect()
}
