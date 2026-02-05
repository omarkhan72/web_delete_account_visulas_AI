import { IMAGES } from "../constants";
import { AlertText, GoogleBtn } from "../components";
import { useFirebaseUser } from "../context";

const Index = () => {
  const { signInWithGoogle, setAlertText, setLoading, signOutUser } =
    useFirebaseUser();

  const logGoogleUser = async () => {
    setAlertText("");
    setLoading(true);
    await signOutUser();
    await signInWithGoogle();
    setLoading(false);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="header"
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            borderWidth: 2,
            marginBottom: "30px",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="logo-image"
        >
          <img
            src={IMAGES.PROJECT_LOGO}
            alt=""
            style={{ width: "50%", borderRadius: 16 }}
          />
        </div>
        <div style={{ margin: "0rem 0 1rem 0", fontWeight: "500" }}>
          Manage Your AI Course App Account
        </div>
        <GoogleBtn onClick={() => logGoogleUser()} />
        <AlertText />
      </div>
    </div>
  );
};

export default Index;
