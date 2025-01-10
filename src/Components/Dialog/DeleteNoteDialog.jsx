import Dialog from "@mui/material/Dialog";
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";

const DeleteNoteDialog = ({ open, onClose, onDeleteNote }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.5rem" }}
      >
        Are you sure you wish to delete this note?
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
          {/* <TextField
            autoFocus
            required
            id="folder-name"
            label="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          /> */}
          {/* Maybe add note content here? Not sure yet. */}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onDeleteNote}
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1, fontWeight: "bold" }}
        >
          Delete
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

export default DeleteNoteDialog;
