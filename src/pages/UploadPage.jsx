import React, { useState } from "react";
import { 
  Box, Typography, Button, Container, TextField, 
  Paper, ToggleButton, ToggleButtonGroup, Fade, CircularProgress, Alert 
} from "@mui/material";
import { CloudUpload, TextFields } from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Upload() {
  const navigate = useNavigate();
  const [uploadMode, setUploadMode] = useState("text"); 
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleModeChange = (event, newMode) => { if (newMode !== null) setUploadMode(newMode); };

  const handleUpload = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("userToken");
    
    if (!token) {
      navigate("/auth", { state: { message: "Please login to analyze documents." } });
      return;
    }

    const cleanToken = token.startsWith('"') ? JSON.parse(token) : token;
    const formData = new FormData();

    if (uploadMode === "text") {
      if (!text.trim()) { setError("Please enter some text."); setLoading(false); return; }
      formData.append("text", text);
    } else {
      if (!file) { setError("Please select a PDF file first."); setLoading(false); return; }
      formData.append("file", file);
    }

    try {
      // --- UPDATED TO RENDER URL ---
      
      const response = await fetch(`${API_BASE_URL}/history`, {
    method: "POST",
    headers: { 
        "Authorization": `Bearer ${cleanToken.trim()}`,},body:formData
});
      const data = await response.json();

      if (response.ok) {
        navigate("/results", { 
          state: { 
            score: data.percentage, 
            text: data.extracted_text, 
            analysis: data.analysis,
            ai_insight: data.ai_insight 
          } 
        });
      } else if (response.status === 401) {
        localStorage.removeItem("userToken");
        navigate("/auth", { state: { message: "Session expired. Please login again." } });
      } else {
        setError(data.msg || "Analysis failed.");
      }
    } catch (err) {
      setError("Server connection failed. Your AI model is still waking up on Render, please wait 1 minute and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", backgroundColor: "#000000", fontFamily: "'Inter', sans-serif" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, overflowY: "auto", py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="800" textAlign="center" sx={{ background: "linear-gradient(90deg, #ffffff, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", mb: 1 }}>
            Upload Assignment
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ color: "#94a3b8", mb: 5 }}>
            Our Semantic AI will cross-reference your work against our secure database.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: "12px", bgcolor: "#1a0505", color: "#fca5a5" }}>{error}</Alert>}

          <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
            <ToggleButtonGroup value={uploadMode} exclusive onChange={handleModeChange} sx={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "15px", p: 0.5 }}>
              <ToggleButton value="text" disabled={loading} sx={{ px: 4, color: "#94a3b8", "&.Mui-selected": { bgcolor: "#2563eb", color: "white" } }}>
                <TextFields sx={{ mr: 1 }} /> Paste Text
              </ToggleButton>
              <ToggleButton value="file" disabled={loading} sx={{ px: 4, color: "#94a3b8", "&.Mui-selected": { bgcolor: "#2563eb", color: "white" } }}>
                <CloudUpload sx={{ mr: 1 }} /> Upload PDF
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ minHeight: "350px" }}>
            {uploadMode === "text" ? (
              <Fade in={uploadMode === "text"}>
                <TextField multiline rows={12} fullWidth placeholder="Enter your text here..." value={text} onChange={(e) => setText(e.target.value)} disabled={loading} sx={{ backgroundColor: "#0f172a", borderRadius: "16px", "& .MuiOutlinedInput-root": { color: "#f8fafc", "& fieldset": { borderColor: "#1e293b" }, "&:hover fieldset": { borderColor: "#3b82f6" } } }} />
              </Fade>
            ) : (
              <Fade in={uploadMode === "file"}>
                <Paper component="label" sx={{ p: 8, textAlign: "center", backgroundColor: "#0f172a", border: "2px dashed #3b82f6", borderRadius: "20px", cursor: "pointer", display: "block", "&:hover": { bgcolor: "rgba(59, 130, 246, 0.05)" } }}>
                  <input type="file" hidden disabled={loading} onChange={(e) => setFile(e.target.files[0])} accept=".pdf" />
                  <CloudUpload sx={{ fontSize: 70, color: "#3b82f6", mb: 2 }} />
                  <Typography variant="h6" sx={{ color: "#ffffff" }}>{file ? file.name : "Click to select PDF"}</Typography>
                </Paper>
              </Fade>
            )}
          </Box>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button variant="contained" disabled={loading} onClick={handleUpload} sx={{ backgroundColor: "#2563eb", px: 10, py: 2, borderRadius: "50px", fontWeight: "800", fontSize: "1.1rem" }}>
              {loading ? <CircularProgress size={28} sx={{ color: "white" }} /> : "Analyze Plagiarism"}
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}