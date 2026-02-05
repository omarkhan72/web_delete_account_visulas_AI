import PROJECT_LOGO from "../assets/iconImage.png";
import { LuAlertTriangle } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
export const IMAGES = {
  PROJECT_LOGO,
};

export const AWARENESS_POINTS = [
  {
    ICON: LuAlertTriangle,
    TEXT: "Warning: This action will permanently delete your data. To proceed with account deletion, click Delete.",
  },
  { ICON: FaCheck, TEXT: "Delete Account Data" },
];

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAnqxqoAg976GmtvIQeMsXE3dkcUtXLenk",
  authDomain: "ai-visuals-app.firebaseapp.com",
  projectId: "ai-visuals-app",
  storageBucket: "ai-visuals-app.firebasestorage.app",
  messagingSenderId: "586339131877",
  appId: "1:586339131877:web:8b08aa19ec7b15b1024f0c",
  measurementId: "G-06R5E2QE3W"
};


export const MANGE_SUB_ACCOUNT_API_URL =
  "https://play.google.com/store/account/subscriptions?package=com.ford9.courseai.generator.creator.maker.online.syllabus";
export const IOS_MANAGE_SUB_ACCOUNT_API_URL =
  "https://apps.apple.com/account/subscriptions";

export const PRIVACY_URL =
  "https://quantumlabsai.com.pk/products/ai-room-planner/privacy-policy.html";
export const TERMS_URL =
  "https://quantumlabsai.com.pk/products/ai-room-planner/terms-and-conditions.html";
export const APP_TITLE =
  "com.quantumlabs.aidesign.ai.room.planner.homedecor";
