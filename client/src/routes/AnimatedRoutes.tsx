import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { TaskPage } from "../pages/TaskPage";
import { LoginPage } from "../modules/auth/LoginPage";
import { SignupPage } from "../modules/auth/SignupPage";
import { RequireAuth } from "../modules/auth/RequireAuth";
import { VerifyEmailPage } from "../pages/VerifyEmailPage";

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22 }}
      >
        <Routes location={location}>
          <Route path="/login" element={<LoginPage key={location.key} />} />
          <Route path="/signup" element={<SignupPage key={location.key} />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/task/:id" element={<TaskPage />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
