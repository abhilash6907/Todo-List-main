import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Layout } from "./components/Layout";
import { AnimatedRoutes } from "./routes/AnimatedRoutes";
import { AuthProvider } from "./modules/auth/AuthContext";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <AnimatedRoutes />
        </Layout>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              borderRadius: 14
            }
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
