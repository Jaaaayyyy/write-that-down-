import {
  ListItem,
  ListItemButton,
  Box,
  Typography,
  ListItemIcon,
} from "@mui/material";

const SidebarFolderButton = ({ icon, label }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Content on the left */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body1">{label}</Typography>
        </Box>

        {/* Count on the right */}
        <Box sx={{ marginLeft: "100px" }}>
          {icon && <ListItemIcon sx={{ minWidth: 0 }}>{icon}</ListItemIcon>}
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarFolderButton;
