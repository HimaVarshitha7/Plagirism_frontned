import React, { useRef } from "react";
import { Box, Typography, Button, Card, CardContent, Container, Grid, Divider } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Psychology, AutoGraph, Storage, Security } from "@mui/icons-material";

export default function Home() {
  const navigate = useNavigate();
  const techSectionRef = useRef(null); // Learn More click chesthe ikkadiki scroll avvadaniki

  const handleGetStarted = () => {
    const isLoggedIn = localStorage.getItem("userToken");
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  const scrollToLearnMore = () => {
    techSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    { title: "Semantic Analysis", desc: "Detect plagiarism based on context and deep meaning.", icon: "🧠" },
    { title: "AI Detection", desc: "Neural networks trained to identify machine-generated content.", icon: "🤖" },
    { title: "Detailed Reports", desc: "Interactive similarity scores and highlights in seconds.", icon: "📊" },
    { title: "Neural Integrity", desc: "Cross-references global databases to uncover hidden rewriting.", icon: "🛡️" }
  ];

  const techDetails = [
    {
      title: "Semantic Embedding",
      icon: <Psychology sx={{ fontSize: 40, color: "#60a5fa" }} />,
      desc: "We use Sentence-Transformers (all-MiniLM-L6-v2) to convert text into high-dimensional vectors. This allows us to find meaning even if synonyms are used."
    },
    {
      title: "Cosine Similarity",
      icon: <AutoGraph sx={{ fontSize: 40, color: "#3b82f6" }} />,
      desc: "Our engine calculates the mathematical distance between document vectors to provide a precision-based percentage score of content overlap."
    },
    {
      title: "Local Vault Check",
      icon: <Storage sx={{ fontSize: 40, color: "#2563eb" }} />,
      desc: "Every scan is cross-referenced against your institution's history in MongoDB to prevent 'internal plagiarism' or sharing within batches."
    },
    {
      title: "Gemini Synthesis",
      icon: <Security sx={{ fontSize: 40, color: "#93c5fd" }} />,
      desc: "Google Gemini 1.5 Flash generates a detailed semantic explanation for every scan, helping you understand the 'how' and 'why' behind the score."
    }
  ];

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100vh", 
      overflow: "hidden", 
      backgroundColor: "#000000",
      fontFamily: "'Inter', sans-serif"
    }}>
      <Header />
      
      {/* Scrollable middle section */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        overflowY: "auto", 
        display: "flex", 
        flexDirection: "column",
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-track": { background: "#000" },
        "&::-webkit-scrollbar-thumb": { background: "#1e293b", borderRadius: "10px" }
      }}>
        
        {/* --- HERO SECTION --- */}
        <Box sx={{ 
          py: { xs: 8, md: 14 }, 
          minHeight: "45vh", 
          position: 'relative', 
          background: "radial-gradient(circle at center, #0a192f 0%, #000000 80%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0 
        }}>
          <Container maxWidth="lg" sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Typography variant="h3" fontWeight="800" mb={2} sx={{ 
              background: "linear-gradient(90deg, #ffffff 0%, #60a5fa 100%)",
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent",
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '2.5rem', md: '4rem' },
              letterSpacing: "-0.01em"
            }}>
              Smart AI Semantic Plagiarism Detection
            </Typography>
            <Typography variant="body1" mb={5} sx={{ color: "#94a3b8", px: { md: 12 }, fontSize: "1.1rem", lineHeight: 1.6 }}>
              Beyond simple matching. Our neural networks understand context and meaning to protect your original work.
            </Typography>
            <Box sx={{ display: "flex", gap: 2.5, justifyContent: "center" }}>
              <Button variant="contained" onClick={handleGetStarted} sx={{ backgroundColor: "#2563eb", px: 5, py: 1.6, borderRadius: "50px", fontWeight: "800", textTransform: "none", fontSize: "1rem" }}>Get Started</Button>
              <Button variant="outlined" onClick={scrollToLearnMore} sx={{ color: "white", borderColor: "#1e293b", px: 5, py: 1.6, borderRadius: "50px", fontWeight: '800', textTransform: "none", fontSize: "1rem" }}>Learn More</Button>
            </Box>
          </Container>
        </Box>

        {/* Feature Cards Section */}
        <Container maxWidth="lg" sx={{ py: 6, mb: 4, flexShrink: 0 }}>
          <Grid container spacing={4} justifyContent="center">
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} md={5.8} key={i}> 
                <Card sx={{ 
                  backgroundColor: "#0f172a", 
                  border: "1px solid #1e293b", 
                  borderRadius: 6, 
                  minHeight: "240px", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    borderColor: "#3b82f6",
                    boxShadow: "0px 15px 30px rgba(0,0,0,0.6)"
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h3" mb={1} sx={{ fontSize: "3rem" }}>{f.icon}</Typography>
                    <Typography variant="h5" fontWeight="800" sx={{ color: "#ffffff", fontFamily: "'Poppins', sans-serif", fontSize: "1.4rem", mb: 1 }}>{f.title}</Typography>
                    <Typography variant="body2" sx={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif", lineHeight: 1.6, px: 3 }}>{f.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Divider sx={{ borderColor: "#1e293b", my: 4, mx: "10%" }} />

        {/* --- NEW TECHNICAL DETAILS SECTION --- */}
        <Box ref={techSectionRef} sx={{ py: 10, backgroundColor: "#000" }}>
          <Container maxWidth="lg">
            <Typography variant="h3" fontWeight="900" sx={{ 
              color: "#fff", mb: 3, textAlign: "center", fontFamily: "'Poppins', sans-serif",
              background: "linear-gradient(90deg, #fff, #60a5fa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>
              Technology Behind the Shield
            </Typography>
            <Typography variant="body1" sx={{ color: "#94a3b8", textAlign: "center", mb: 8, px: { md: 20 } }}>
              Our system combines semantic search with modern large language models to ensure that integrity is measured by intent, not just keywords.
            </Typography>

            <Grid container spacing={4}>
              {techDetails.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box sx={{ 
                    p: 4, bgcolor: "rgba(15, 23, 42, 0.5)", border: "1px solid #1e293b", 
                    borderRadius: 4, height: "100%", transition: "0.3s",
                    "&:hover": { borderColor: "#3b82f6", bgcolor: "rgba(15, 23, 42, 0.8)" }
                  }}>
                    <Box sx={{ mb: 2 }}>{item.icon}</Box>
                    <Typography variant="h5" fontWeight="700" sx={{ color: "#fff", mb: 2, fontFamily: "'Poppins', sans-serif" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.8 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
      
      <Footer />
    </Box>
  );
}