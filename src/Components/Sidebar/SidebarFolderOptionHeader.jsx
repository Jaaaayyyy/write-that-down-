import { ListItem, Box, Typography, IconButton } from "@mui/material";

const SidebarFolderOptionHeader = ({ icon, label, onAlternateClick, id }) => {
  return (
    <ListItem disablePadding id={id}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Label on the left */}
        <Typography variant="body1" sx={{ ml: "20px", alignItems: "center" }}>
          {label}
        </Typography>

        {/* Icon as a button on the right */}
        {icon && (
          <IconButton onClick={onAlternateClick} sx={{ marginLeft: "auto" }}>
            {icon}
          </IconButton>
        )}
      </Box>
    </ListItem>
  );
};

export default SidebarFolderOptionHeader;
