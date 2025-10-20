export const signupCandidate = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: "Candidate already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Direct registration (no OTP)
    await Candidate.create({
      name,
      email,
      password: hashedPassword,
      isVerified: true, // Automatically verified
      authProvider: "local",
      role: "candidate",
    });

    res
      .status(201)
      .json({ message: "Candidate registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};