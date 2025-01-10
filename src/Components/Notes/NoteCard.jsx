import React from "react";
import {
  Box,
  Typography,
  IconButton,
  ButtonBase,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotesIcon from "@mui/icons-material/Notes";
import FolderIcon from "@mui/icons-material/Folder";
import { useState } from "react";
const NotesCard = ({
  note,
  isSelected,
  isFav,
  folderName,
  onNoteClick,
  updateNote,
  onDeletePerm,
  onOpenMoveDialog,
}) => {
  const truncatedTitle =
    note.title.length > 15 ? `${note.title.slice(0, 12)}...` : note.title;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handlers for the "More Options" menu
  const handleMoreOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Move note to trash
  const handleTrash = () => {
    updateNote(note.id, { folderFolderType: "trash", fav: false });
    handleClose();
  };
  const handleRecoverNote = () => {
    updateNote(note.id, { folderFolderType: "all", fav: false });
  };
  const toggleFav = () => {
    updateNote(note.id, { fav: !note.fav });
  };

  const handleMoveNote = () => {
    onOpenMoveDialog(note);
    handleClose();
  };

  const handleDeletePerm = () => {
    handleClose();
    onDeletePerm(note.id);
  };

  return (
    <Box
      sx={{
        padding: "12px",
        border: "1px solid #ddd",
        backgroundColor: isSelected ? "#e0f7fa" : "#f9f9f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {isFav && <FavoriteIcon sx={{ color: "grey", marginLeft: "10px" }} />}
      {/* Note Button */}
      <ButtonBase
        onClick={onNoteClick}
        sx={{
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        {/* Content container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              margin: 0,
              fontWeight: "bold",
              pointerEvents: "none",
              textAlign: "center",
            }}
          >
            {truncatedTitle}
          </Typography>

          {/* Icon and Folder Name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {folderName === "all" ? (
              <NotesIcon sx={{ fontSize: "16px", color: "grey" }} />
            ) : folderName === "reminders" ? (
              <NotificationsIcon sx={{ fontSize: "16px", color: "grey" }} />
            ) : (
              <FolderIcon sx={{ fontSize: "16px", color: "grey" }} />
            )}
            <Typography
              variant="caption"
              sx={{
                color: "#666",
                textAlign: "center",
                lineHeight: "1",
              }}
            >
              {folderName}
            </Typography>
          </Box>
        </Box>
      </ButtonBase>
      {/* More Options Button */}
      <IconButton
        sx={{
          marginLeft: "auto",
          zIndex: 2,
        }}
        onClick={handleMoreOptionsClick}
      >
        <MoreHorizIcon />
      </IconButton>

      {/* More Options Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {isFav ? (
          <MenuItem onClick={toggleFav}>Unfavourite Note</MenuItem>
        ) : (
          <MenuItem onClick={toggleFav}>Favourite Note</MenuItem>
        )}
        <MenuItem onClick={handleMoveNote}>Move Note</MenuItem>

        {note.folderFolderType === "trash" ? (
          [
            <MenuItem key="delete-permanently" onClick={handleDeletePerm}>
              Delete Permanently
            </MenuItem>,
            <MenuItem key="recover-note" onClick={handleRecoverNote}>
              Recover note
            </MenuItem>,
          ]
        ) : (
          <MenuItem onClick={handleTrash}>Trash Note</MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default NotesCard;
