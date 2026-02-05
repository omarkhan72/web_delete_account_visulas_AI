import { PRIVACY_URL, TERMS_URL } from "../../constants";
import "./style.css";

function TermsAndPolicy() {
  PRIVACY_URL;
  TERMS_URL;

  const left = String((screen.width - 600) / 2);
  const top = 100;
  function openPopup(url: string) {
    window.open(url, "popup", `width=600, height=800 left=${left} top=${top}`);
  }

  return (
    <ul className="terms-condition-ul">
      <li>
        <a id="link-terms" href="" onClick={() => openPopup(TERMS_URL)}>
          Terms & Conditions
        </a>
      </li>
      <li>
        <a id="link-policy" href="#" onClick={() => openPopup(PRIVACY_URL)}>
          Privacy Policy
        </a>
      </li>
    </ul>
  );
}

export default TermsAndPolicy;
