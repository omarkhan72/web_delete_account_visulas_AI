import { useEffect, useState } from "react";
import { MdOutlineManageAccounts } from "react-icons/md";
import {
  AWARENESS_POINTS,
  IOS_MANAGE_SUB_ACCOUNT_API_URL,
  MANGE_SUB_ACCOUNT_API_URL,
} from "../constants";
import "../style/ManageAccountPage.css";
import { DeleteConfirmation } from "../components";
import { useFirebaseUser } from "../context";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

const index: React.FC = () => {
  const [IsShowPopup, setIsShowPopup] = useState(false);
  const [subscriptionUrl, setSubscriptionUrl] = useState(
    MANGE_SUB_ACCOUNT_API_URL
  );
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "web">(
    "web"
  );
  const { signOutUser, setLoading, setIsLogin, setAlertText } =
    useFirebaseUser();

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const userAgent = navigator.userAgent || navigator.vendor || "";
    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (userAgent.includes("Mac") &&
        typeof document !== "undefined" &&
        "ontouchend" in document);
    const isAndroid = /Android/i.test(userAgent);

    if (isIOS) {
      setDeviceType("ios");
      setSubscriptionUrl(IOS_MANAGE_SUB_ACCOUNT_API_URL);
    } else if (isAndroid) {
      setDeviceType("android");
      setSubscriptionUrl(MANGE_SUB_ACCOUNT_API_URL);
    } else {
      setDeviceType("web");
      setSubscriptionUrl(MANGE_SUB_ACCOUNT_API_URL);
    }
  }, []);

  async function deleteAccount() {
    try {
      const deleteUserAccount = httpsCallable(functions, "deleteUserAccount");
      const result = await deleteUserAccount();
      console.log("Delete success:", result.data);
      setAlertText("Your account is successfully deleted");
    } catch (error) {
      console.error("Error deleting account:", error);
      setAlertText("Failed to delete the account");
    } finally {
      await signOutUser();
      setIsLogin(false);
    }
  }

  const handleDelete = async () => {
    setLoading(true);
    await deleteAccount();
    setIsShowPopup(false);
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOutUser();
    setIsLogin(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "flex-end",
          gap: 10,
        }}
      >
        <MdOutlineManageAccounts size={22} />
        <div style={{ fontWeight: "500" }}>Manage Your Account</div>
      </div>

      <div>
        Before deleting your account, ensure you've unsubscribed to prevent
        future charges.
      </div>
      <a className="subscription-link" target="_blank" href={subscriptionUrl}>
        Manage your subscription{" "}
        {deviceType !== "web"
          ? `on ${deviceType === "ios" ? "iOS" : "Android"}`
          : ""}
      </a>
      <div>
        {AWARENESS_POINTS.map((POINT, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              marginTop: 10,
            }}
          >
            <POINT.ICON size={18} />
            <div style={{ width: "94%" }}>{POINT.TEXT}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button className="manage-account-btn" onClick={() => handleLogout()}>
          Cancel
        </button>
        <button
          className=" manage-account-btn manage-account-cancel-btn"
          onClick={() => setIsShowPopup(true)}
        >
          Delete
        </button>
      </div>

      {IsShowPopup && (
        <DeleteConfirmation
          onYes={() => handleDelete()}
          onCancel={() => setIsShowPopup(false)}
        />
      )}
    </div>
  );
};

export default index;
