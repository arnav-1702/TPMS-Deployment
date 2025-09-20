import JobApplication from "../models/JobApplicationSchema.js";
import Candidate from "../models/candidateModel.js";
import { uploadToCloudinary } from "../middleware/multer.js";

export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const candidateId = req.user.id;

    // Upload files
    let photoUrl = null;
    let resumeUrl = null;

    if (req.files?.photo) {
      photoUrl = await uploadToCloudinary(req.files.photo[0].buffer, "candidatePhotos");
    }

    if (req.files?.resume) {
      resumeUrl = await uploadToCloudinary(req.files.resume[0].buffer, "candidateResumes");
    }

    const candidateData = {
      candidateId,
      ...req.body,
      photo: photoUrl,
      resume: resumeUrl,
    };

    // Find existing job application document
    let jobApplication = await JobApplication.findOne({ jobId });

    if (!jobApplication) {
      // Create a new document if it doesn't exist
      jobApplication = new JobApplication({
        jobId,
        candidates: [candidateData],
      });
    } else {
      // Check if candidate already applied
      const alreadyApplied = jobApplication.candidates.some(
        (c) => c.candidateId.toString() === candidateId
      );

      if (alreadyApplied) {
        return res.status(400).json({ message: "You have already applied for this job." });
      }

      // Add candidate to existing job
      jobApplication.candidates.push(candidateData);
    }

    await jobApplication.save();

    // Optional: update candidate document with applied job info
    await Candidate.findByIdAndUpdate(candidateId, {
      $push: { applications: { jobId } },
    });

    res.status(201).json({ message: "Application submitted successfully", jobApplication });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting application", error: error.message });
  }
};
