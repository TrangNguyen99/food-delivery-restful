import mongoose, {Schema} from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  spotPrice: {
    type: Number,
    required: true,
  },
  takeawayPrice: {
    type: Number,
    required: true,
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
  ],
  levelScope: {
    type: String,
    required: true,
    enum: ['store', 'branch', 'company'],
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    default: null,
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    default: null,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    default: null,
  },
})

export const MenuItemModel = mongoose.model('MenuItem', schema)
