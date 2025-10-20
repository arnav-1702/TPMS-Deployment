export const signupCompany = async (req, res) => {
  try {
    const {
      companyName,
      companyDomain,
      description,
      culture,
      careerGrowth,
      disclaimer,
      email,
      password,
    } = req.body;

    if (!companyName || !companyDomain || !email || !password) {
      return res.status(400).json({
        message: "Company name, domain, email, and password are required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const existingCompany = await Company.findOne({
      "loginCredentials.email": email,
    });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Direct registration (no OTP)
    await Company.create({
      companyName,
      companyDomain,
      description,
      culture,
      careerGrowth,
      disclaimer,
      loginCredentials: {
        email,
        password: hashedPassword,
      },
      isVerified: true,  // Automatically verified
      isApproved: false, // Still needs admin approval
    });

    res.status(201).json({
      message: "Company registered successfully. Waiting for admin approval.",
      company: { companyName, email },
    });
  } catch (error) {
    console.error("SignupCompany Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};