import React, { useState } from "react";
import { 
  Box, Typography, Card, CardContent, TextField, 
  Button, Container, InputAdornment, IconButton, Link, Alert, Fade 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// Import the configuration
import { API_BASE_URL } from "../config";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(""); 
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Use API_BASE_URL instead of hardcoded strings
    const endpoint = isLogin 
      ? `${API_BASE_URL}/login` 
      : `${API_BASE_URL}/register`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("userToken", data.access_token);
          localStorage.setItem("userName", data.user.name);
          navigate("/dashboard");
        } else {
          setShowSuccess(true);
          setTimeout(() => {
            setIsLogin(true);
            setShowSuccess(false);
            setFormData({ name: "", email: "", password: "" });
          }, 2000);
        }
      } else {
        setError(data.msg || "Something went wrong.");
      }
    } catch (err) {
      setError("Cannot connect to server. If using Render, the AI engine may be waking up—please wait 30 seconds.");
    }
  };

  const inputStyle = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      color: "#f8fafc",
      fontFamily: "'Inter', sans-serif",
      "& fieldset": { borderColor: "#1e293b" },
      "&:hover fieldset": { borderColor: "#3b82f6" },
      "&.Mui-focused fieldset": { borderColor: "#2563eb" },
    },
    "& .MuiInputLabel-root": { color: "#94a3b8" },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#000000" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container maxWidth="sm">
          <Card sx={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: 5 }}>
            <CardContent sx={{ p: 5 }}>
              <Fade in={showSuccess} unmountOnExit><Alert severity="success" sx={{ mb: 3 }}>Account created! Log in now.</Alert></Fade>
              {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
              <Typography variant="h4" fontWeight="800" textAlign="center" color="white" mb={4}>
                {isLogin ? "Welcome Back" : "Create Account"}
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                {!isLogin && <TextField fullWidth label="Full Name" name="name" required value={formData.name} onChange={handleInputChange} sx={inputStyle} />}
                <TextField fullWidth label="Email Address" type="email" name="email" required value={formData.email} onChange={handleInputChange} sx={inputStyle} />
                <TextField fullWidth label="Password" type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleInputChange}
                  InputProps={{ endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: "#94a3b8" }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )}} sx={inputStyle} />
                <Button type="submit" fullWidth variant="contained" sx={{ py: 1.5, borderRadius: "50px", bgcolor: "#2563eb", fontWeight: "bold" }}>
                  {isLogin ? "Sign In" : "Sign Up"}
                </Button>
              </Box>
              <Typography textAlign="center" sx={{ mt: 3, color: "#94a3b8" }}>
                {isLogin ? "New here? " : "Member? "}
                <Link component="button" onClick={() => setIsLogin(!isLogin)} sx={{ color: "#3b82f6", fontWeight: "700" }}>
                  {isLogin ? "Create account" : "Sign in instead"}
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}