import { signInWithPopup } from "firebase/auth";
import api from "../utils/axios";
import { auth, provider } from "../utils/firebaseConfig";
import { FcGoogle } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async (token) => {
    try {
      const res = await api.post("/api/auth/login", { token: token });
      dispatch(setUser(res?.data?.data || null));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChat = async () => {
    try {
      const res = await api.post("/api/chat/new-conversation");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetConversation = async () => {
    try {
      const res = await api.get("/api/chat/conversations");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      dispatch(setUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result?.user?.getIdToken();
      await handleLogin(token);
    } catch (err) {
      console.error("Firebase Sign-in Error:", err.code, err.message, err);
    }
  };
  return (
    <div className="h-screen bg-[#0d0f14] text-white  overflow-hidden">
      {!currentUser && (
        <div className="fixed justify-center inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
          <div className="w-[350px] bg-[#13151c] border border-white/[0.08] p-7 flex flex-col gap-2 rounded-xl">
            <div className="flex flex-col ">
              <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">
                Welcome to the OctAi
              </h2>
              <p className="text-[13px] text-slate-500">
                Please login to continue using application{" "}
              </p>
              <button
                onClick={loginWithGoogle}
                className="w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-white from-indigo-500 to-violet-700 hover:from-indigo-400 hover:to-violet-600 active:from-indigo-600 active:to-violet-80
                                border border-indigo-500/30 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-150 cursor-pointer"
              >
                <FcGoogle size={15} />
                Login With Google
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="w-full py-3 bg-slate-100 text-black mt-3"
      >
        Logout
      </button>
      <button
        onClick={handleChat}
        className="w-full py-3 bg-slate-100 text-black mt-3"
      >
        Chat
      </button>
      <button
        onClick={handleGetConversation}
        className="w-full py-3 bg-slate-100 text-black mt-3"
      >
        Chat
      </button>
    </div>
  );
};

export default Home;
