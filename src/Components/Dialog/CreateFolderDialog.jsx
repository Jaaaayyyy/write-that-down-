import Dialog from "@mui/material/Dialog";
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";

const CreateFolderDialog = ({ open, onClose, onCreateFolder }) => {
  const [folderName, setFolderName] = useState("");

  // Reset folderName when the dialog closes
  useEffect(() => {
    if (!open) {
      setFolderName("");
    }
  }, [open]);

  const handleCreate = () => {
    if (folderName.trim() !== "") {
      onCreateFolder(folderName.trim());
      setFolderName("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.5rem" }}
      >
        Create New Folder
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            autoFocus
            required
            id="folder-name"
            label="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={handleCreate}
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1, fontWeight: "bold" }}
        >
          Create
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          sx={{ px: 4, py: 1, fontWeight: "bold" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFolderDialog;
