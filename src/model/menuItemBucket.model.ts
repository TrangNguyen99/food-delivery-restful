import mongoose, {Schema} from 'mongoose'

const schema = new Schema({
  page: {
    type: Number,
    required: true,
    min: 1,
  },
  count: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  menuItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true,
    },
  ],
})

export const MenuItemBucketModel = mongoose.model('MenuItemBucket', schema)
