import mongoose, {Schema} from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  recipes: [
    {
      type: new Schema({
        name: {
          type: String,
          required: true,
          trim: true,
          minLength: 2,
          maxLength: 20,
        },
      }),
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

export const IngredientModel = mongoose.model('Ingredient', schema)
