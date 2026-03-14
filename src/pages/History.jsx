import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Chip, Container, CircularProgress, Alert 
} from "@mui/material";
import { Visibility, Description, History as HistoryIcon } from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function History() {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("Please login to view your history.");
        setLoading(false);
        return;
      }

      const cleanToken = token.startsWith('"') ? JSON.parse(token) : token;

      try {
        const response = await fetch(`${API_BASE_URL}/history`, {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${cleanToken.trim()}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();
        if (response.ok) {
          const processedData = data.map(item => ({
            ...item,
            status: item.score > 70 ? "High" : item.score > 30 ? "Moderate" : "Low"
          }));
          setHistoryData(processedData);
        } else {
          setError(data.msg || "Failed to load history.");
        }
      } catch (err) {
        setError("Cannot connect to server. The AI engine might be waking up—please try again in a minute.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getStatusColor = (status) => {
    if (status === "High") return "#f87171"; 
    if (status === "Moderate") return "#60a5fa"; 
    return "#34d399"; 
  };

  if (loading) return (
    <Box sx={{ bgcolor: "#000", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress sx={{ color: "#2563eb" }} />
      </Box>
      <Footer />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#000000" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, py: 8, px: 2 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, gap: 1.5 }}>
              <HistoryIcon sx={{ color: "#60a5fa", fontSize: "2rem" }} />
              <Typography variant="h3" fontWeight="800" sx={{ 
                background: "linear-gradient(90deg, #ffffff, #60a5fa)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent",
                fontFamily: "'Poppins', sans-serif"
              }}>
                Scan History
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: "#94a3b8" }}>Review and revisit your previous semantic analysis reports.</Typography>
            {error && <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>{error}</Alert>}
          </Box>

          <TableContainer component={Paper} sx={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: 5, boxShadow: "0px 10px 30px rgba(0,0,0,0.5)", mb: 4 }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ backgroundColor: "#1e293b" }}>
                <TableRow>
                  <TableCell sx={{ color: "#60a5fa", fontWeight: "700" }}>Document Preview</TableCell>
                  <TableCell sx={{ color: "#60a5fa", fontWeight: "700" }}>Analysis Date</TableCell>
                  <TableCell sx={{ color: "#60a5fa", fontWeight: "700" }}>Plagiarism Score</TableCell>
                  <TableCell sx={{ color: "#60a5fa", fontWeight: "700" }}>Risk Level</TableCell>
                  <TableCell align="right" sx={{ color: "#60a5fa", fontWeight: "700" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ color: "#94a3b8", textAlign: "center", py: 10 }}>No history found yet.</TableCell>
                  </TableRow>
                ) : (
                  historyData.map((row) => (
                    <TableRow key={row.id} sx={{ "&:hover": { backgroundColor: "rgba(59, 130, 246, 0.03)" }, transition: "0.2s" }}>
                      <TableCell sx={{ color: "#f8fafc" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Description sx={{ mr: 1.5, color: "#3b82f6" }} />
                          {row.full_text ? `${row.full_text.substring(0, 35)}...` : "Unnamed Document"}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: "#94a3b8" }}>{row.date}</TableCell>
                      <TableCell sx={{ color: "#ffffff", fontWeight: "700" }}>
                        <Typography variant="body1" sx={{ fontWeight: "800", color: getStatusColor(row.status) }}>{row.score}%</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={row.status} size="small" sx={{ border: `1px solid ${getStatusColor(row.status)}`, color: getStatusColor(row.status), fontWeight: "800", bgcolor: "transparent" }} />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => navigate("/results", { state: row })} sx={{ color: "#3b82f6" }}>
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}