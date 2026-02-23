import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./sections/Homepage";
import AuthCreateAccount from "./pages/AuthCreateAccount";
import AuthSignIn from "./pages/AuthSignIn";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import NutritionCalculator from "./pages/NutritionCalculator";
import About from "./pages/About";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogPosts from "./pages/admin/AdminBlogPosts";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import MealPlan from "./pages/MealPlan";
import Activity from "./pages/Activity";
import AccountSettings from "./pages/AccountSettings";
import AdminSettings from "./pages/admin/AdminSettings";
import ClientLayout from "./pages/client/ClientLayout";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:blogId" element={<BlogDetail />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
      <Route path="/calculator" element={<NutritionCalculator />} />
      <Route path="/about" element={<About />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/auth/createaccount" element={<AuthCreateAccount />} />
      <Route path="/auth/signin" element={<AuthSignIn />} />
      <Route path="/auth/signing" element={<AuthSignIn />} />
      <Route element={<ClientLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meal-plan" element={<MealPlan />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/account" element={<AccountSettings />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="blogs" element={<AdminBlogPosts />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
