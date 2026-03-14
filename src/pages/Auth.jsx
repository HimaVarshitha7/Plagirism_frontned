import React, { useState } from "react";
import { 
  Box, Typography, Card, CardContent, TextField, 
  Button, Container, InputAdornment, IconButton, Link, Alert, Fade 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

    // --- UPDATED TO LIVE RENDER URL ---
    const endpoint = isLogin 
      ? "https://plagirism-backend.onrender.com/login" 
      : "https://plagirism-backend.onrender.com/register";

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
      // Free tier servers take ~30s to wake up if they haven't been used recently
      setError("Cannot connect to server. The AI engine is waking up, please try again in 30 seconds.");
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
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #0f172a inset !important",
      WebkitTextFillColor: "#ffffff !important",
    },
    "& .MuiInputLabel-root": { 
      color: "#94a3b8",
      fontFamily: "'Poppins', sans-serif" 
    },
  };

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100vh", 
      overflow: "hidden", 
      backgroundColor: "#000000",
      fontFamily: "'Inter', 'Poppins', sans-serif" 
    }}>
      <Header />
      
      <Box component="main" sx={{ 
        flexGrow: 1, 
        overflowY: "auto", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        py: 4,
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-track": { background: "#000" },
        "&::-webkit-scrollbar-thumb": { background: "#1e293b", borderRadius: "10px" }
      }}>
        <Container maxWidth="sm">
          <Card sx={{ 
            backgroundColor: "#0f172a", 
            border: "1px solid #1e293b", 
            borderRadius: 5, 
            boxShadow: "0px 20px 50px rgba(0,0,0,0.9)" 
          }}>
            <CardContent sx={{ p: { xs: 4, md: 7 } }}>
              <Fade in={showSuccess} unmountOnExit>
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2, bgcolor: "#064e3b", color: "#6ee7b7" }}>
                  Account created! Redirecting to login...
                </Alert>
              </Fade>

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2, bgcolor: "#450a0a", color: "#fca5a5", border: "1px solid #7f1d1d" }}>
                  {error}
                </Alert>
              )}

              <Typography variant="h4" fontWeight="800" textAlign="center" sx={{ 
                mb: 1.5, 
                color: "#ffffff",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "-0.02em" 
              }}>
                {isLogin ? "Welcome Back" : "Create Account"}
              </Typography>
              <Typography variant="body1" textAlign="center" sx={{ 
                color: "#94a3b8", 
                mb: 5,
                fontWeight: 400 
              }}>
                {isLogin ? "Access your plagiarism reports" : "Join the community today"}
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                {!isLogin && (
                  <TextField fullWidth label="Full Name" name="name" required
                    value={formData.name} onChange={handleInputChange} sx={inputStyle}
                  />
                )}
                <TextField fullWidth label="Email Address" type="email" name="email" required
                  value={formData.email} onChange={handleInputChange} sx={inputStyle}
                />
                <TextField fullWidth label="Password" type={showPassword ? "text" : "password"} name="password" required
                  value={formData.password} onChange={handleInputChange}
                  InputProps={{ endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: "#94a3b8" }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )}}
                  sx={{ ...inputStyle, mb: 5 }}
                />
                <Button type="submit" fullWidth variant="contained" 
                  sx={{ 
                    py: 1.8, 
                    borderRadius: "50px", 
                    backgroundColor: "#2563eb", 
                    fontWeight: "800", 
                    fontSize: "1rem",
                    textTransform: "none",
                    fontFamily: "'Poppins', sans-serif",
                    boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
                    "&:hover": { backgroundColor: "#1d4ed8" } 
                  }}>
                  {isLogin ? "Sign In" : "Sign Up"}
                </Button>
              </Box>

              <Typography variant="body2" textAlign="center" sx={{ mt: 4, color: "#94a3b8" }}>
                {isLogin ? "Don't have an account? " : "Already a member? "}
                <Link component="button" type="button" onClick={() => setIsLogin(!isLogin)} 
                  sx={{ 
                    color: "#3b82f6", 
                    fontWeight: "700", 
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" }
                  }}>
                  {isLogin ? "Create one" : "Sign in instead"}
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