import {
  ListItem,
  ListItemButton,
  Box,
  Typography,
  ListItemIcon,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { forwardRef, useState } from "react";

const SidebarButton = forwardRef(
  (
    {
      icon,
      label,
      count = 0,
      isCreateNewNote,
      onSBBClick,
      isSelected,
      id,
      isCustomFolder,
      deleteFolderClick,
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleHover = () => {
      if (isCustomFolder) {
        setIsHovered(true);
      }
    };

    const handleLeave = () => {
      setIsHovered(false);
    };

    const handleMoreOptionsClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDeleteFolder = () => {
      deleteFolderClick();
      handleClose();
    };

    return (
      <ListItem disablePadding>
        <ListItemButton
          ref={ref} // Attach the ref here
          id={id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: isCreateNewNote ? "60px" : "48px",
            cursor: "pointer",
            backgroundColor: isSelected ? "rgba(0, 0, 0, 0.1)" : "transparent",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
            borderLeft: isSelected
              ? "4px solid #1976d2"
              : "4px solid transparent",
          }}
          onClick={onSBBClick}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          {/* Icon and Label */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {icon && <ListItemIcon sx={{ minWidth: 0 }}>{icon}</ListItemIcon>}
            <Typography variant="body1">{label}</Typography>
          </Box>

          {/* Count or More Options Button */}
          {!isCreateNewNote && (
            <Box sx={{ marginLeft: "100px", position: "relative" }}>
              {isHovered && isCustomFolder ? (
                <>
                  <IconButton
                    sx={{ marginLeft: "15px", zIndex: 2 }}
                    onClick={handleMoreOptionsClick}
                  >
                    <MoreHorizIcon />
                  </IconButton>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    sx={{
                      "& .MuiPaper-root": {
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #ddd",
                        minWidth: "200px",
                      },
                      "& .MuiMenuItem-root": {
                        fontSize: "0.875rem",
                        padding: "8px 16px",
                      },
                    }}
                  >
                    <MenuItem onClick={handleDeleteFolder}>
                      Delete Folder
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "#666",
                  }}
                >
                  {count}
                </Typography>
              )}
            </Box>
          )}
        </ListItemButton>
      </ListItem>
    );
  },
);

export default SidebarButton;
