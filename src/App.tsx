import { Route, Routes } from "react-router-dom";
import "./globals.css";
// import "./../app/globals.css"
import { Home } from "./_root/pages";
import SigninForm from "./_auth/forms/SigninForm";
import AuthLayout from "./_auth/AuthLayout";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";
function App() {
  return (
    <main className="flex h-screen ">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes  */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
