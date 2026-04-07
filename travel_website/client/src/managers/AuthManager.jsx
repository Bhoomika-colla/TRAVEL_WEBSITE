import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3111/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const normalizeEmail = (email = "") => String(email).trim().toLowerCase();
const normalizeText = (value = "") => String(value).trim();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("travel_user")) || null,
  );
  const [token, setToken] = useState(
    localStorage.getItem("travel_token") || "",
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedToken = localStorage.getItem("travel_token");

        if (!storedToken) {
          setLoading(false);
          return;
        }

        api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;

        const res = await api.get("/users/me");

        setUser(res.data.user || null);
        setToken(storedToken);
        localStorage.setItem(
          "travel_user",
          JSON.stringify(res.data.user || null),
        );
      } catch (_error) {
        localStorage.removeItem("travel_token");
        localStorage.removeItem("travel_user");
        setUser(null);
        setToken("");
        delete api.defaults.headers.common.Authorization;
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const register = async (payload) => {
    const sanitizedPayload = {
      fullName: normalizeText(payload?.fullName),
      email: normalizeEmail(payload?.email),
      password: String(payload?.password || ""),
    };

    const res = await api.post("/users/register", sanitizedPayload);

    setUser(res.data.user || null);
    setToken(res.data.token || "");
    localStorage.setItem("travel_token", res.data.token || "");
    localStorage.setItem("travel_user", JSON.stringify(res.data.user || null));
    api.defaults.headers.common.Authorization = `Bearer ${res.data.token || ""}`;

    return res.data;
  };

  const login = async (payload) => {
    const sanitizedPayload = {
      email: normalizeEmail(payload?.email),
      password: String(payload?.password || ""),
    };

    const res = await api.post("/users/login", sanitizedPayload);

    setUser(res.data.user || null);
    setToken(res.data.token || "");
    localStorage.setItem("travel_token", res.data.token || "");
    localStorage.setItem("travel_user", JSON.stringify(res.data.user || null));
    api.defaults.headers.common.Authorization = `Bearer ${res.data.token || ""}`;

    return res.data;
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("travel_token");
    localStorage.removeItem("travel_user");
    delete api.defaults.headers.common.Authorization;
  };

  const forgotPassword = async (email) => {
    const res = await api.post("/users/forgot-password", {
      email: normalizeEmail(email),
    });
    return res.data;
  };

  const resetPassword = async (tokenValue, password) => {
    const res = await api.put(`/users/reset-password/${tokenValue}`, {
      password: String(password || ""),
    });
    return res.data;
  };

  const fetchProfile = async () => {
    const res = await api.get("/users/me");
    setUser(res.data.user || null);
    localStorage.setItem("travel_user", JSON.stringify(res.data.user || null));
    return res.data.user;
  };

  const updateProfile = async (payload) => {
    const res = await api.put("/users/update-profile", payload);
    setUser(res.data.user || null);
    localStorage.setItem("travel_user", JSON.stringify(res.data.user || null));
    return res.data;
  };

  const getAllUsers = async () => {
    const res = await api.get("/users/all-users");
    return res.data.users || [];
  };

  const updateUserRole = async (id, role) => {
    const res = await api.put(`/users/update-role/${id}`, {
      role: normalizeText(role).toLowerCase(),
    });
    return res.data;
  };

  const value = useMemo(
    () => ({
      api,
      user,
      token,
      loading,
      isAuthenticated: !!token,
      register,
      login,
      logout,
      forgotPassword,
      resetPassword,
      fetchProfile,
      updateProfile,
      getAllUsers,
      updateUserRole,
    }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const AdminRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return isAuthenticated && user?.role === "superadmin" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export const PublicRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/profile" replace /> : children;
};
