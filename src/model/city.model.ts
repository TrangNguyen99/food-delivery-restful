import mongoose, {Schema} from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 20,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
})

export const CityModel = mongoose.model('City', schema)
