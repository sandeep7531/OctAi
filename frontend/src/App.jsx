import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Home from "./pages/home.jsx";
import api from "./utils/axios.js";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice.js";

function App() {
  const dispatch = useDispatch();

  const getCurrentuser = async () => {
    try {
      const res = await api.get("/api/get-user");
      dispatch(setUser(res?.data?.data));
    } catch (error) {
      console.log("Error while fetching current user", error);
    }
  };

  useEffect(() => {
    getCurrentuser();
  }, []);

  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}

export default App;
