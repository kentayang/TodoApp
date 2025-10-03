import { db } from "../config/firebase.config.js";

export const createUser = async (email, hashedPassword, name) => {
  const user = await db
    .collection("users")
    .add({ email, password: hashedPassword, name });
  return { id: user.id, email, name };
};

export const getUserByEmail = async (email) => {
  const user = await db.collection("users").where("email", "==", email).get();
  if (user.empty) {
    return null;
  }
  return {
    id: user.docs[0].id,
    ...user.docs[0].data(),
  };
};
