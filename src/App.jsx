import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/footer";
import AuthModal from "./components/authcomponents/AuthModal";
import AppRoutes from "./routes/AppRoutes";

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    setTimeout(() => {
      const element =
        document.getElementById(
          hash.replace("#", "")
        );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 200);

  }, [hash]);

  return null;
}

function App() {

  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
<Header setAuthOpen={setAuthOpen} />

<ScrollToHash />

<AppRoutes />

<Footer />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        setUser={setUser}
      />
    </>
  );
}
export default App;