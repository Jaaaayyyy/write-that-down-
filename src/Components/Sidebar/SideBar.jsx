import React, { useState } from "react";
import { Drawer, List, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import SidebarButton from "./SidebarButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotesIcon from "@mui/icons-material/Notes";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AddIcon from "@mui/icons-material/Add";
import SidebarFolderOptionHeader from "./SidebarFolderOptionHeader";
import FolderIcon from "@mui/icons-material/Folder";

const Sidebar = ({
  onSelectFolderType,
  onOpenDialog,
  customFolders,
  onCreateNewNote,
  notes,
  deleteFolderClick,
  allNotesButtonRef,
}) => {
  const [selectedFolderType, setSelectedFolderType] = useState("all");
  const handleButtonClick = (folderType) => {
    if (folderType === "new_note") {
      onCreateNewNote();
    } else {
      setSelectedFolderType(folderType);
    }
    onSelectFolderType(folderType);
  };
  const filterCountByCat = (folderType) => {
    const filteredCount = notes.filter((note) => {
      if (folderType === "all") {
        return note.folderFolderType !== "trash";
      } else if (folderType === "favourites") {
        return note.fav === true;
      } else if (folderType === "trash") {
        return note.folderFolderType === "trash";
      } else {
        return note.folderFolderType === folderType;
      }
    });
    return filteredCount.length;
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: "20vw",
        "& .MuiDrawer-paper": {
          width: "20vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // boxSizing: "border-box",
          borderRight: "1px solid black",
        },
        padding: 0,
        margin: 0,
      }}
    >
      <List>
        <Box>
          <SidebarButton
            icon={<NoteAltIcon />}
            label="New Note"
            isCreateNewNote={true}
            onSBBClick={() => handleButtonClick("new_note")}
            isSelected={false}
          />
          <SidebarButton
            icon={<NotesIcon />}
            label="All Notes"
            onSBBClick={() => handleButtonClick("all")}
            isSelected={selectedFolderType === "all"}
            count={filterCountByCat("all")}
            ref={allNotesButtonRef}
          />
          <SidebarButton
            icon={<FavoriteIcon />}
            label="Favourites"
            onSBBClick={() => handleButtonClick("favourites")}
            isSelected={selectedFolderType === "favourites"}
            count={filterCountByCat("favourites")}
          />
          <SidebarButton
            icon={<NotificationsIcon />}
            label="Reminders"
            onSBBClick={() => handleButtonClick("reminders")}
            isSelected={selectedFolderType === "reminders"}
            count={filterCountByCat("reminders")}
          />
          <SidebarButton
            icon={<DeleteIcon />}
            label="Trash"
            onSBBClick={() => handleButtonClick("trash")}
            isSelected={selectedFolderType === "trash"}
            count={filterCountByCat("trash")}
          />
          <Box sx={{ mt: "100px" }}>
            <SidebarFolderOptionHeader
              icon={<AddIcon />}
              label="My folders"
              onAlternateClick={onOpenDialog}
            />
            {customFolders.map((folder) => (
              <SidebarButton
                key={folder.id}
                icon={<FolderIcon />}
                label={folder.name}
                onSBBClick={() => handleButtonClick(folder.name)}
                isSelected={selectedFolderType === folder.name}
                isCustomFolder={true}
                count={filterCountByCat(folder.name)}
                deleteFolderClick={deleteFolderClick}
              />
            ))}
          </Box>
        </Box>
      </List>
    </Drawer>
  );
};

export default Sidebar;
