import { useState } from "react";
import { X } from "lucide-react";
import Login from "./Login";
import Register from "./Register";

const AuthModal = ({ isOpen, onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
const [prefillPhone, setPrefillPhone] = useState("");

  if (!isOpen) return null;

  return (
    <div
className="
fixed inset-0
bg-black/50
backdrop-blur-sm
flex items-center justify-center
p-3 md:p-5
z-50
"
      onClick={onClose}
    >
      <div
className="
relative
w-[95vw]
max-w-[420px]
sm:max-w-[520px]
lg:max-w-[700px]
xl:max-w-[1000px]
bg-white
rounded-2xl
shadow-2xl
overflow-hidden
max-h-[90vh]
overflow-y-auto
"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black z-10"
        >
          <X size={20} />
        </button>

        {isLogin ? (
        <Login
  onLoginSuccess={(user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    onClose();
    window.location.reload();
  }}
  openRegisterWithPhone={(phone) => {
    setPrefillPhone(phone);
    setIsLogin(false);
  }}
/>
        ) : (
          <Register
  switchToLogin={() => setIsLogin(true)}
  phone={prefillPhone}
/>
        )}
      </div>
    </div>
  );
};

export default AuthModal;