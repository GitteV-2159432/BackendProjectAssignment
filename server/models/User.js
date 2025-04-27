import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    bookmarks: {
      exercises: [mongoose.Types.ObjectId],
      plans: [mongoose.Types.ObjectId],
      workouts: [mongoose.Types.ObjectId],
    },
    activePlan: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
