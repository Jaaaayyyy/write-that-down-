import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const MoveFolderDialog = ({ open, onClose, folders, onMoveNote }) => {
  const [selectedFolder, setSelectedFolder] = useState("");

  const handleChange = (event) => {
    setSelectedFolder(event.target.value);
  };

  const handleMove = () => {
    onMoveNote(selectedFolder);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.5rem",
        }}
      >
        Move to:
      </DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <InputLabel>Folder</InputLabel>
            <Select
              value={selectedFolder}
              onChange={handleChange}
              label="Folder"
              inputProps={{
                name: "folder",
                id: "folder",
              }}
            >
              <MenuItem value="all">All Notes</MenuItem>
              <MenuItem value="reminders">Reminders</MenuItem>
              {folders.map((folder) => (
                <MenuItem key={folder.id} value={folder.name}>
                  {folder.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleMove}
          variant="contained"
          color="primary"
          // Disable move button if no folder is selected
          disabled={!selectedFolder}
        >
          Move
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoveFolderDialog;
