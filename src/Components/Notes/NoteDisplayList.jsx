import React from "react";
import NotesCard from "./NoteCard";
import { Box, Typography } from "@mui/material";
const NoteList = ({
  notes,
  onEditNote,
  noteListTitle,
  customFolderNames,
  onNoteClick,
  updateNote,
  onOpenMoveDialog,
  selectedNoteId,
  onDeletePerm,
}) => {
  return (
    <Box sx={{}}>
      <Typography sx={{ textAlign: "center", marginTop: "8px" }} variant="h6">
        {noteListTitle}
      </Typography>
      <Box sx={{ marginTop: "2vh" }}>
        {notes.map((note) => (
          <NotesCard
            key={note.id}
            note={note}
            onEditNote={onEditNote}
            onNoteClick={() => onNoteClick(note)}
            customFolderNames={customFolderNames}
            isFav={note.fav}
            folderName={note.folderFolderType}
            updateNote={updateNote}
            onOpenMoveDialog={onOpenMoveDialog}
            isSelected={selectedNoteId === note.id}
            onDeletePerm={onDeletePerm}
          />
        ))}
      </Box>
    </Box>
  );
};

export default NoteList;
