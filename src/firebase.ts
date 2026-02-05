import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { FIREBASE_CONFIG } from "./constants";

const app = initializeApp(FIREBASE_CONFIG);

export const auth = getAuth(app);
export const functions = getFunctions(app);
