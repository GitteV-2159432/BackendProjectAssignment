import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  }

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB runtime error:', err)
  })
}

export default connectDB
