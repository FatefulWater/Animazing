import { Box, InputBase, Divider, Typography, IconButton } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <Box height="250px" width="100%" textAlign="center" sx={{background: "linear-gradient(90deg, rgb(255, 255, 43) 20%, rgb(81, 241, 66) 60%)"}}>
      <IconButton>
        <MarkEmailReadOutlinedIcon fontSize="large" />
      </IconButton>
      <Typography variant="h3">Subscribe To Our Newsletter</Typography>
      <Box
        p="2px 4px"
        m=" auto"
        display="flex"
        alignItems="center"
        width="75%"
        backgroundColor="#F2F2F2"
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Typography sx={{ p: "10px", ":hover": { cursor: "pointer" } }}>
          Subscribe
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;