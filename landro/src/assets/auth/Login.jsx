import { signInWithEmailAndPassword } from "firebase/auth";

const handleLogin = async () => {
  const res = await signInWithEmailAndPassword(auth, email, password);

  if (!res.user.emailVerified) {
    alert("Please verify your email first!");
    return;
  }

  // allow login
};
