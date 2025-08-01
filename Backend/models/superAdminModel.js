import mongoose from 'mongoose';

const SuperAdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAdmins: [{
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    createdAt: { type: Date, default: Date.now }
  }],
  actions: [{
    type: { type: String, enum: ['adminCreation', 'companyApproval', 'jobValidation', 'applicationReview'] },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String, enum: ['completed', 'pending'], default: 'completed' },
    actionDate: { type: Date, default: Date.now }
  }]
});

const SuperAdmin = mongoose.model('SuperAdmin', SuperAdminSchema);
export default SuperAdmin;