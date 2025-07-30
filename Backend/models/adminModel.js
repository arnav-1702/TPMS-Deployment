import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  actions: [{
    type: { type: String, enum: ['companyApproval', 'jobValidation', 'applicationReview'] },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    actionDate: { type: Date, default: Date.now }
  }]
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
