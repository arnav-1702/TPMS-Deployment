import JobApplication from "../models/JobApplicationSchema.js";
import Candidate from "../models/candidateModel.js";
import { uploadToCloudinary } from "../middleware/multer.js";

export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const candidateId = req.user.id;

    // ✅ Check if candidate already applied for this job
    const existingApplication = await JobApplication.findOne({
      jobId,
      candidateId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
      });
    }

    let photoUrl = null;
    let resumeUrl = null;

    if (req.files?.photo) {
      const photoBuffer = req.files.photo[0].buffer;
      photoUrl = await uploadToCloudinary(photoBuffer, "candidatePhotos");
    }

    if (req.files?.resume) {
      const resumeBuffer = req.files.resume[0].buffer;
      resumeUrl = await uploadToCloudinary(resumeBuffer, "candidateResumes");
    }

    const application = new JobApplication({
      jobId,
      candidateId,
      ...req.body,
      photo: photoUrl,
      resume: resumeUrl,
    });

    await application.save();

    await Candidate.findByIdAndUpdate(candidateId, {
      $push: { applications: { jobId, applicationId: application._id } },
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting application",
      error: error.message,
    });
  }
};
