import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
  actions: [{
    type: { type: String, enum: ['companyApproval', 'jobValidation', 'applicationReview', 'adminManagement'] },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    actionDate: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('Admin', AdminSchema);