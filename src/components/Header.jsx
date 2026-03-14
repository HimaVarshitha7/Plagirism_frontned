import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, Stack } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
// Icons
import { 
  AutoAwesome, 
  History, 
  AccountCircle, 
  Logout, 
  Dashboard, 
  Home, 
  Login 
} from "@mui/icons-material";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home fontSize="small" /> },
    { name: "Dashboard", path: "/dashboard", icon: <Dashboard fontSize="small" /> },
    { name: "History", path: "/history", icon: <History fontSize="small" /> },
    { name: "Profile", path: "/profile", icon: <AccountCircle fontSize="small" /> },
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: "#1e293b", // Slate 800: Strong contrast against black body
        backgroundImage: "none",
        borderBottom: "3px solid #3b82f6", // Thicker blue border for clear definition
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
        zIndex: 1100
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: "75px", justifyContent: "space-between" }}>
          
          {/* Logo Section */}
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 1 }}>
            <AutoAwesome sx={{ color: "#3b82f6", fontSize: "2rem" }} />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: "900", 
                color: "#fff",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "0.5px"
              }}
            >
              SEMANTIC<span style={{ color: "#3b82f6" }}>AI</span>
            </Typography>
          </Box>

          {/* Navigation Menu */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {isLoggedIn ? (
              <Stack direction="row" spacing={1} alignItems="center">
                {navLinks.map((link) => (
                  <Button 
                    key={link.name}
                    component={Link} 
                    to={link.path} 
                    startIcon={link.icon} // Added Icons here
                    sx={{ 
                      color: location.pathname === link.path ? "#3b82f6" : "#cbd5e1", 
                      textTransform: "none", 
                      fontWeight: "600", 
                      px: 2,
                      borderRadius: "8px",
                      transition: "0.3s",
                      "&:hover": { color: "#fff", bgcolor: "rgba(59, 130, 246, 0.15)" } 
                    }}
                  >
                    {link.name}
                  </Button>
                ))}
                
                <Button 
                  onClick={handleLogout} 
                  variant="outlined"
                  startIcon={<Logout />} // Logout Icon
                  sx={{ 
                    color: "#f87171", 
                    borderColor: "rgba(248, 113, 113, 0.4)", 
                    textTransform: "none",
                    fontWeight: "700",
                    borderRadius: "8px",
                    ml: 1,
                    "&:hover": { borderColor: "#f87171", bgcolor: "rgba(248, 113, 113, 0.1)" }
                  }}
                >
                  Logout
                </Button>
              </Stack>
            ) : (
              <Button 
                variant="contained" 
                component={Link} 
                to="/auth" 
                startIcon={<Login />} // Login Icon
                sx={{ 
                  backgroundColor: "#3b82f6", 
                  borderRadius: "10px", 
                  textTransform: "none", 
                  fontWeight: "700",
                  px: 3,
                  "&:hover": { backgroundColor: "#2563eb" }
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}