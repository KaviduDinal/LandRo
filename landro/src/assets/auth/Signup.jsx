import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../auth/firebase";

const handleRegister = async () => {
  const userCred = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // 🔔 Send verification email
  await sendEmailVerification(userCred.user);

  alert("Verification email sent! Please check inbox.");
};
