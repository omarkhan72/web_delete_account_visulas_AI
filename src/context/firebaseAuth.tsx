// UserContext.tsx
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { doc, getDoc, Firestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { FIREBASE_CONFIG } from "../constants";

interface UserContextType {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  alertText: string;
  setAlertText: (text: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  firebaseInitialization: () => Promise<void>;
}

// Create a new context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const FirebaseUserProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [loading, setLoading] = useState(false);
  let database: Firestore;
  let provider: GoogleAuthProvider;

  const firebaseInitialization = async () => {
    const app = initializeApp(FIREBASE_CONFIG);
    database = getFirestore(app);
    provider = new GoogleAuthProvider();
  };

  useEffect(() => {
    firebaseInitialization();
  }, []);

  const checkUserExistence = async () => {
    const user = getAuth().currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }
    const docRef = doc(database, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
      return true;
    }
    // If the user document doesn't exist, allow login to proceed for deletion flow
    console.log(
      "User does not exist in Firestore; proceeding without profile document"
    );
    return true;
  };

  const signInWithGooglePopup = async () => {
    try {
      await signInWithPopup(
        getAuth(),
        provider.setCustomParameters({
          prompt: "select_account",
        })
      );
    } catch (error: any) {
      console.error(error);
      new Error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
      const isUserExist = await checkUserExistence();

      if (isUserExist) {
        setIsLogin(true);
        console.log("User is logged In");
      } else {
        setAlertText("Account not found");
        console.log("User is not logged in");
      }
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        setAlertText("Sign-in popup closed by the user");
      } else {
        console.error("Error signing in:", error);
      }
    }
  };

  const signOutUser = async () =>
    await signOut(getAuth()).then(() => {
      firebaseInitialization();
    });

  return (
    <UserContext.Provider
      value={{
        isLogin,
        setIsLogin,
        alertText,
        setAlertText,
        loading,
        setLoading,
        signInWithGoogle,
        signOutUser,
        firebaseInitialization,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume user context
export const useFirebaseUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a FirebaseUserProvider");
  }
  return context;
};
