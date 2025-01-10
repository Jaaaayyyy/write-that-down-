import { Box } from "@mui/material";

const NoteEditor = ({ localEditingNote, setLocalEditingNote, handleBlur }) => {
  return (
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
        value={`${localEditingNote?.title ?? ""}\n${localEditingNote?.content ?? ""}`}
        onChange={(e) => {
          const value = e.target.value;
          const [title, ...contentLines] = value.split("\n");
          const content = contentLines.join("\n");
          setLocalEditingNote({ ...localEditingNote, title, content });
        }}
        onBlur={handleBlur}
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
  );
};

export default NoteEditor;
