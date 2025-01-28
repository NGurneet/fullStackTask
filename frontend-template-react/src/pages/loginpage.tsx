import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { showSuccessToast, showErrorToast } from "../utils/toast-utils/toast.utils";
import FormField from "../components/FormField";
import FormLayout from "../components/FormLayout";
import { useLoginMutation } from "../api/apiSlice";

type FormData = {
  email: string;
  password: string;
};


/**
 * Login component handles user authentication.
 * 
 * This component utilizes the `react-hook-form` library for form state management,
 * and `useLoginMutation` from RTK Query for making login API requests.
 * 
 * - Displays a login form with fields for email and password.
 * - On form submission, attempts to log the user in by calling the login API.
 * - If login is successful, stores authentication tokens and role in localStorage,
 *   shows a success toast, and navigates to the appropriate dashboard based on the user's role.
 * - If login fails, displays an error toast with a relevant message.
 * 
 * Returns a JSX element representing the login form.
 */

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading }] = useLoginMutation(); // RTK Query mutation for login

  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data).unwrap();
      console.log("Login successful:", response);
  
      // Save the token, refreshToken, and role to localStorage
      localStorage.setItem("authToken", response.data?.token);
      localStorage.setItem("refreshToken", response.data?.refreshToken);
      localStorage.setItem("role", response.data?.role);
  
      // Show success toast
      showSuccessToast("Login successful!");
  
      // Check the user's role and navigate to the respective dashboard
      // if (response.data?.role === "ADMIN") {
      //   navigate("/admin"); // Redirect to admin dashboard
      // } else if (response.data?.role === "USER") {
      //   navigate("/user-dashboard"); // Redirect to user dashboard
      // } else {
      //   // Default fallback if the role is not recognized
      //   navigate("/"); // Or handle this case as needed
      // }
      navigate("/admin");
    } catch (error: any) {
      console.error("Login failed:", error);
  
      // Show error toast only if the error is from API response
      if (error?.data?.message) {
        showErrorToast(error?.data?.message || "Login failed. Please check your credentials.");
      } else {
        showErrorToast("An unexpected error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div>
      <FormLayout
        title="Log In"
        onSubmit={handleSubmit(onSubmit)}
        submitButtonText={isLoading ? "Logging In..." : "Log In"}
        linkText="Don't have an account?"
        linkHref="/signup"
      >
        {/* Email Field */}
        <FormField
          name="email"
          label="Email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />

        {/* Password Field */}
        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
        />
      </FormLayout>
    </div>
  );
};

export default Login;
