import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Fade,
  CircularProgress,
  Alert
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

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) setUploadMode(newMode);
  };

  const handleUpload = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("userToken");

    if (!token) {
      navigate("/auth", {
        state: { message: "Please login to analyze documents." }
      });
      return;
    }

    const cleanToken = token.startsWith('"') ? JSON.parse(token) : token;

    const formData = new FormData();

    if (uploadMode === "text") {
      if (!text.trim()) {
        setError("Please enter some text.");
        setLoading(false);
        return;
      }
      formData.append("text", text);
    } else {
      if (!file) {
        setError("Please select a PDF file first.");
        setLoading(false);
        return;
      }
      formData.append("file", file);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cleanToken.trim()}`
        },
        body: formData
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
        navigate("/auth", {
          state: { message: "Session expired. Please login again." }
        });
      } else {
        setError(data.msg || "Analysis failed.");
      }

    } catch (err) {
      console.error(err);
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Header />

      <Container maxWidth="md" sx={{ py: 6 }}>

        <Typography variant="h3" textAlign="center" sx={{ mb: 4 }}>
          Upload Assignment
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <ToggleButtonGroup
          value={uploadMode}
          exclusive
          onChange={handleModeChange}
          sx={{ mb: 4 }}
        >
          <ToggleButton value="text">
            <TextFields sx={{ mr: 1 }} /> Paste Text
          </ToggleButton>

          <ToggleButton value="file">
            <CloudUpload sx={{ mr: 1 }} /> Upload PDF
          </ToggleButton>
        </ToggleButtonGroup>

        {uploadMode === "text" ? (
          <TextField
            multiline
            rows={10}
            fullWidth
            placeholder="Paste text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <Paper
            component="label"
            sx={{
              p: 6,
              textAlign: "center",
              border: "2px dashed #3b82f6"
            }}
          >
            <input
              type="file"
              hidden
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Typography>
              {file ? file.name : "Click to upload PDF"}
            </Typography>
          </Paper>
        )}

        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? <CircularProgress size={25} /> : "Analyze Plagiarism"}
          </Button>
        </Box>

      </Container>

      <Footer />
    </Box>
  );
}