1. craete firebase
2. linking firebase >> openprojectoverview >> addapp button >> select web >> write your app name >> add the creadtional in constant
   const firebaseConfig = {
   apiKey: "AIzaSyATGpwOBQH7bLDg9iTtZ-q2qXVfiSaC4Lo",
   authDomain: "authentiction-c0382.firebaseapp.com",
   projectId: "authentiction-c0382",
   storageBucket: "authentiction-c0382.appspot.com",
   messagingSenderId: "966126000836",
   appId: "1:966126000836:web:7eeeadbdbcada809684791",
   measurementId: "G-P18B8G97GM"
   };

3. add firebasercreadaitioanl >> go >> bulid >> aunthentication >> setting >> authorized Domain >> add link
   addlink >> apps.fordnine.com
4. make changes according to your project in constnat folder file
   const DELETE_ACCOUNT_API_URL = "";
   const MANGE_SUB_ACCOUNT_API_URL = "https://play.google.com/store/account/subscriptions?package=";
   const PRIVACY_URL = "";
   const TERMS_URL = "";
   const APP_TITLE = "";

5. chnage title show in top of link >> index.html >>> changetitle 
6. change app iocon show in top  of link  >> assets >>  change the icon  >> also change in index.html 
7.  run project  >> yarn run dev 

8.   make build >> yarn build 
9.   host the build on cPanel:
    - Upload `dist/` to `/public_html/delete-account/ai-trading-chart-analyzer/`
    - Ensure Vite base is set to `/delete-account/ai-trading-chart-analyzer/` in `vite.config.ts`
    - Add SPA rewrite in `.htaccess` under that folder:
      ```
      <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /delete-account/ai-trading-chart-analyzer/
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /delete-account/ai-trading-chart-analyzer/index.html [L]
      </IfModule>
      ```



  async function deleteAccount() {
  try {
    const user = getAuth().currentUser;
    if (!user) {
      setAlertText("No user found");
      return;
    }
    const response = await axios.post(DELETE_ACCOUNT_API_URL, {
      userId: user.uid,
      userEmail: user.email,
    });
    if (response && response.status === 200) {
      setAlertText("Your account is successfully deleted");
    } else {
      setAlertText("Failed to delete the account");
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a status code other than 2xx
      setAlertText(`Server Error: ${error.response.status}`);
    } else if (error.request) {
      // Request was made but no response received
      setAlertText("Network error. Please try again.");
    } else {
      // Something happened in setting up the request
      setAlertText("Unexpected error occurred");
    }
    console.error("Error deleting account:", error);
  } finally {
    await signOutUser();
    setIsLogin(false);
  }
}# web-delete-account
