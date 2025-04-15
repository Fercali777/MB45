import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  phone: { type: String, required: true  },
  address: { type: String, required: true  },
  city: { type: String, required: true  },
  country: { type: String, required: true  },
  postCode: { type: String, required: true  },
  role: { type: String, enum: ['seller', 'buyer'], default:"seller", required: true }, 
});

export const User = mongoose.model('User', userSchema);