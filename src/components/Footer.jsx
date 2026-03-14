import React from "react";
import { Box, Typography, Container, IconButton, Stack } from "@mui/material";
import { GitHub, Twitter, LinkedIn, AutoAwesome, Email } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0f172a", // Slate 900
        color: "#94a3b8",
        py: 2.5,
        mt: 'auto',
        borderTop: "3px solid #3b82f6", // Matching Blue Border
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: 2 
        }}>
          {/* Logo Area */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AutoAwesome sx={{ color: "#3b82f6", fontSize: "1.2rem" }} />
            <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 800 }}>
              SEMANTIC AI
            </Typography>
          </Box>

          {/* Copyright Area */}
          <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
            © 2026 Semantic AI Detection System. All rights reserved.
          </Typography>

          {/* Social Icons Area */}
          <Stack direction="row" spacing={2}>
            <IconButton size="small" sx={{ color: "#94a3b8", "&:hover": { color: "#3b82f6" } }}>
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#94a3b8", "&:hover": { color: "#3b82f6" } }}>
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#94a3b8", "&:hover": { color: "#3b82f6" } }}>
              <LinkedIn fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#94a3b8", "&:hover": { color: "#3b82f6" } }}>
              <Email fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}