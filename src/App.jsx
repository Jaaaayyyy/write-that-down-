import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Components/Sidebar/SideBar";
import NoteList from "./Components/Notes/NoteDisplayList";
import { Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CreateFolderDialog from "./Components/Dialog/CreateFolderDialog";
import MoveFolderDialog from "./Components/Dialog/MoveFolderDialog";
import { GlobalStyles } from "@mui/material";
import { Typography } from "@mui/material";
import DeleteNoteDialog from "./Components/Dialog/DeleteNoteDialog";
import DeleteFolderDialog from "./Components/Dialog/DeleteFolderDialog";

function LandingPage() {
  const [notes, setNotes] = useState([]); // Notes state
  const [customFolders, setCustomFolders] = useState([]); // Custom folders state
  const [selectedFolderType, setSelectedFolderType] = useState("all"); // Default to all
  const [previousFolderType, setPreviousFolderType] = useState("all");
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] =
    useState(false); // Dialog state for Create folder
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false); // Dialog state for move folder
  const [isConfirmDeletenoteOpen, setIsConfirmDeletenoteOpen] = useState(false); // Dialog state for Delete Note
  const [isDeleteFolderDialogOpen, setIsDeleteFolderDialogOpen] =
    useState(false); // Dialog state for Delete Folder
  const [noteListTitle, setNoteListTitle] = useState("All Notes");
  const [editingNote, setEditingNote] = useState(null); // Track the current editing note
  const [noteToMove, setNoteToMove] = useState(null); // Track the note being moved
  const [noteToDelete, setNoteToDelete] = useState(null); // Track the note being moved
  const [localEditingNote, setLocalEditingNote] = useState(null); // Temporary state for edits

  const allNotesButtonRef = useRef(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const storedFolders = JSON.parse(localStorage.getItem("folders")) || [];
    setNotes(storedNotes);
    setCustomFolders(storedFolders);
  }, []);

  const saveNote = (updatedNote) => {
    setNotes(updatedNote);
    localStorage.setItem("notes", JSON.stringify(updatedNote));
  };

  const handleUpdateNote = (noteId, updates) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        if (updates.fav === false && note.folderFolderType === "favourites") {
          return { ...note, ...updates, folderFolderType: "all" };
        }
        return { ...note, ...updates };
      }
      return note;
    });
    saveNote(updatedNotes);
  };

  const handleAddFolder = (folderName) => {
    const trimmedName = folderName.trim().toLowerCase();
    const reservedNames = ["all notes", "favourites", "trash", "reminders"];

    if (!trimmedName || reservedNames.includes(trimmedName)) {
      console.error("Invalid or reserved folder name.");
      return;
    }

    const folderExists = customFolders.some(
      (folder) => folder.name.trim().toLowerCase() === trimmedName,
    );

    if (folderExists) {
      console.error(`Folder name "${folderName}" already exists.`);
      return;
    }

    const newFolder = { id: uuidv4(), name: folderName };
    const updatedFolders = [...customFolders, newFolder];
    setCustomFolders(updatedFolders);
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
  };

  const handleOpenMoveDialog = (note) => {
    setNoteToMove(note);
    setIsMoveDialogOpen(true);
  };

  const handleCloseMoveDialog = () => {
    setIsMoveDialogOpen(false);
    setNoteToMove(null);
  };

  const handleMoveNote = (folderFolderType) => {
    if (noteToMove) {
      handleUpdateNote(noteToMove.id, { folderFolderType });
      handleCloseMoveDialog();
    }
  };

  const handleOpenCreateFolderDialog = () => {
    setPreviousFolderType(selectedFolderType);
    setIsCreateFolderDialogOpen(true);
  };

  const handleCloseCreateFolderDialog = () => {
    setIsCreateFolderDialogOpen(false);
    setSelectedFolderType(previousFolderType);
  };

  const handleSelectFolderType = (folderType) => {
    if (folderType !== "new_note") {
      setPreviousFolderType(selectedFolderType);
      if (previousFolderType !== folderType) {
        setEditingNote(null);
        setLocalEditingNote(null);
      }
    } else {
      return;
    }
    setSelectedFolderType(folderType);
    setNoteListTitle(
      folderType === "all"
        ? "All Notes"
        : folderType === "favourites"
          ? "Favourites"
          : folderType === "trash"
            ? "Trash"
            : folderType === "reminders"
              ? "Reminders"
              : customFolders.find((folder) => folder.name === folderType)
                  ?.name || "Unknown Folder",
    );
  };

  const handleCreateNewNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "",
      content: "",
      folderFolderType: selectedFolderType,
      createdAt: new Date().toISOString(),
      fav: selectedFolderType === "favourites",
      unsaved: true,
    };
    setEditingNote(newNote);
    setLocalEditingNote(newNote);
    // Add temporarily to notes
    setNotes((prevNotes) => [...prevNotes, newNote]);
    // Automatically select (click) the new note
    handleNoteClick(newNote);
  };

  const filteredNotes = notes.filter((note) => {
    if (selectedFolderType === "all") return note.folderFolderType !== "trash";
    if (selectedFolderType === "favourites")
      return note.fav && note.folderFolderType !== "trash";
    return note.folderFolderType === selectedFolderType;
  });

  const handleNoteClick = (note) => {
    setEditingNote(note);
    setLocalEditingNote({ ...note });
    setTimeout(() => {
      // There is only one textarea anyways... cheap way to resolve my issue
      const textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(
          textarea.value.length,
          textarea.value.length,
        );
      }
    }, 0);
  };

  const handleOnBlurNotePad = () => {
    if (!localEditingNote) return;
    // Use the first 13 characters from the content as the title
    const cleanContent = localEditingNote.content.trim();
    const titleLine =
      localEditingNote.title.trim() || cleanContent.substring(0, 13).trim();
    const cleanedContent = cleanContent.trim();

    // If the note is empty, remove it
    if (titleLine === "" && cleanedContent === "") {
      const updatedNotes = notes.filter((note) => note.id !== editingNote.id);
      setNotes(updatedNotes);
      setEditingNote(null);
      setLocalEditingNote(null);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    } else {
      // Remove the unsaved flag and save the note
      const updatedNotes = notes.map((note) =>
        note.id === editingNote.id
          ? {
              ...localEditingNote,
              title: titleLine,
              content: cleanedContent,
              unsaved: false,
            }
          : note,
      );
      saveNote(updatedNotes);
      setEditingNote({
        ...localEditingNote,
        title: titleLine,
        content: cleanedContent,
      });
    }
  };

  // HANDLERS FOR DELETING NOTE.
  const handleOpenDeleteNoteDialog = (noteId) => {
    setNoteToDelete(noteId);
    setIsConfirmDeletenoteOpen(true);
  };

  const handleCloseDeleteNoteDialog = () => {
    setNoteToDelete(null);
    setIsConfirmDeletenoteOpen(false);
  };

  const handleDeletePermanently = () => {
    const updatedNotes = notes.filter((note) => note.id !== noteToDelete);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    handleCloseDeleteNoteDialog();
  };

  // For Deleting the entire folder
  // const handleDeleteFolder = (folderName) => {
  //   // Move all notes in the folder to trash
  //   notes.forEach((note) => {
  //     if (note.folderFolderType === folderName) {
  //       handleUpdateNote(note.id, { folderFolderType: "trash" });
  //     }
  //   });

  //   // Remove the folder from custom folders
  //   const updatedFolders = customFolders.filter((folder) => folder.name !== folderName);

  //   // Update state and localStorage for folders
  //   setCustomFolders(updatedFolders);
  //   localStorage.setItem("folders", JSON.stringify(updatedFolders));

  //   // Once folder deleted, re-click on All Notes
  //   if (selectedFolderType === folderName) {
  //     setSelectedFolderType("all");
  //     setNoteListTitle("All Notes");

  //     if (allNotesButtonRef.current) {
  //       allNotesButtonRef.current.click();
  //     }
  //   }
  // };
  const handleDeleteFolder = (folderName) => {
    // Batch update notes to move all notes in the folder to trash
    const updatedNotes = notes.map((note) => {
      if (note.folderFolderType === folderName) {
        return { ...note, folderFolderType: "trash" }; // Update folderFolderType to "trash"
      }
      return note;
    });

    // Save the updated notes to state and localStorage
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    // Remove the folder from custom folders
    const updatedFolders = customFolders.filter(
      (folder) => folder.name !== folderName,
    );
    setCustomFolders(updatedFolders);
    localStorage.setItem("folders", JSON.stringify(updatedFolders));

    // Once folder deleted, re-click on All Notes
    if (selectedFolderType === folderName) {
      setSelectedFolderType("all");
      setNoteListTitle("All Notes");

      if (allNotesButtonRef.current) {
        allNotesButtonRef.current.click();
      }
    }
  };

  const handleOpenDeleteFolderDialog = () => {
    setIsDeleteFolderDialogOpen(true);
  };
  const handleCloseDeleteFolderDialog = () => {
    setIsDeleteFolderDialogOpen(false);
  };

  const deleteFolderConfirm = () => {
    handleDeleteFolder(selectedFolderType);
    handleCloseDeleteFolderDialog();
    setSelectedFolderType("all"); // Reset folderType to "all" after deletion
  };

  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar
          onSelectFolderType={handleSelectFolderType}
          selectedFolderType={selectedFolderType}
          onAddFolder={handleAddFolder}
          customFolders={customFolders}
          onOpenDialog={handleOpenCreateFolderDialog}
          onCreateNewNote={handleCreateNewNote}
          notes={notes}
          deleteFolderClick={handleOpenDeleteFolderDialog}
          allNotesButtonRef={allNotesButtonRef}
        />
        <Box sx={{ borderRight: "1px solid black", width: "20vw" }}>
          {filteredNotes.length > 0 ? (
            <NoteList
              notes={filteredNotes}
              selectedNoteId={editingNote?.id}
              onNoteClick={handleNoteClick}
              noteListTitle={noteListTitle}
              customFolderNames={customFolders}
              updateNote={handleUpdateNote}
              onOpenMoveDialog={handleOpenMoveDialog}
              onDeletePerm={handleOpenDeleteNoteDialog}
            />
          ) : (
            <p>No notes available. Click "New Note" to create one!</p>
          )}
        </Box>
        <Box
          sx={{
            width: "60vw",
            height: "100vh",
            padding: "16px",
            border: "1px solid #ddd",
          }}
        >
          {editingNote ? (
            <Box
              sx={{
                width: "100%",
                minHeight: "100vh",
                outline: "none",
                padding: "16px",
                fontFamily: "Arial, sans-serif",
                fontSize: "1rem",
                lineHeight: "1.5",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              <textarea
                value={localEditingNote?.content ?? ""}
                onChange={(e) => {
                  const content = e.target.value;

                  // Update the localEditingNote state
                  setLocalEditingNote((prevNote) => ({
                    ...prevNote,
                    // Derive title from the first 13 characters
                    title: content.substring(0, 13).trim(),
                    content,
                  }));
                }}
                onBlur={handleOnBlurNotePad}
                style={{
                  height: "100vh",
                  width: "100%",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  padding: "16px",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  background: "transparent",
                  color: "#333",
                }}
              />
            </Box>
          ) : (
            <Typography>Select a note to edit or create new note.</Typography>
          )}
        </Box>
        <DeleteNoteDialog
          open={isConfirmDeletenoteOpen}
          onClose={handleCloseDeleteNoteDialog}
          onDeleteNote={handleDeletePermanently}
        />
        <DeleteFolderDialog
          open={isDeleteFolderDialogOpen}
          onClose={handleCloseDeleteFolderDialog}
          onDeleteFolder={deleteFolderConfirm}
        />

        <CreateFolderDialog
          open={isCreateFolderDialogOpen}
          onClose={handleCloseCreateFolderDialog}
          onCreateFolder={handleAddFolder}
        />
        <MoveFolderDialog
          open={isMoveDialogOpen}
          onClose={handleCloseMoveDialog}
          folders={customFolders}
          onMoveNote={handleMoveNote}
        />
      </Box>
    </>
  );
}

export default LandingPage;
