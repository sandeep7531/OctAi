import * as React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/utils/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { loginWithFirebaseToken } from "@/api/auth.api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { LuSparkles } from "react-icons/lu";

export const LoginModal = ({ open, onOpenChange }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result?.user?.getIdToken();
      if (!token) throw new Error("No token received from Firebase");

      const response = await loginWithFirebaseToken(token);
      dispatch(setUser(response?.data || response?.user || null));
      onOpenChange?.(false);
    } catch (err) {
      console.error("Firebase Sign-in Error:", err);
      setError(err?.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[380px] bg-[#14151a] border-white/[0.08] p-7 shadow-2xl">
        <DialogHeader className="items-center text-center">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-2">
            <LuSparkles className="h-5 w-5 animate-pulse" />
          </div>
          <DialogTitle className="text-xl font-semibold text-neutral-100 tracking-tight">
            Welcome to OctAI
          </DialogTitle>
          <DialogDescription className="text-[13px] text-neutral-400 max-w-[260px] mx-auto">
            Experience multi-agent intelligence for chat, coding, search, and document tasks.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-2.5 text-xs text-red-400 text-center">
            {error}
          </div>
        )}

        <div className="mt-2 flex flex-col gap-3">
          <Button
            type="button"
            variant="default"
            size="lg"
            disabled={loading}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-neutral-100 font-medium py-3 rounded-xl shadow-lg transition-transform active:scale-[0.99]"
          >
            <FcGoogle className="h-5 w-5" />
            <span>{loading ? "Signing in..." : "Continue with Google"}</span>
          </Button>

          <p className="text-[11px] text-center text-neutral-500 mt-2">
            By signing in, you agree to our Terms of Service & Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
