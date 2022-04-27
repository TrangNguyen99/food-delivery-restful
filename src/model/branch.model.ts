import mongoose, {Schema} from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 20,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
})

export const BranchModel = mongoose.model('Branch', schema)
