import mongoose, {Schema} from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 20,
  },
})

export const CompanyModel = mongoose.model('Company', schema)
