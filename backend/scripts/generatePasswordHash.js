import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

async function generateHash() {
  const password = "admin123"; // The password to hash
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Generated hash for 'admin123':");
    console.log(hash);

    // Verify the hash works
    const isValid = await bcrypt.compare(password, hash);
    console.log("Hash verification:", isValid ? "Valid" : "Invalid");
  } catch (error) {
    console.error("Error generating hash:", error);
  }
}

generateHash();
