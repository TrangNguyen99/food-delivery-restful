import mongoose, {Schema} from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 20,
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
})

export const StoreModel = mongoose.model('Store', schema)
