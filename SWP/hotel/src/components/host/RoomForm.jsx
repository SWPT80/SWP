import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const FileInput = styled("input")({
  display: "none",
});

export default function RoomForm({ formData, onChange, onSubmit, onCancel, title ,errors }) {
  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 900,
        mx: "auto",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              name="roomId"
              label="Room ID"
              value={formData.roomId}
              onChange={onChange}
              error={!!errors?.roomId}
  helperText={errors?.roomId}
               // không cho sửa roomId
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              name="roomType"
              label="Room Type"
              value={formData.roomType}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              name="roomCapacity"
              label="Capacity"
              value={formData.roomCapacity}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              name="roomPrice"
              label="Price"
              value={formData.roomPrice}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              name="rating"
              label="Rating"
              value={formData.rating}
              onChange={onChange}
              inputProps={{ step: 0.1, min: 0, max: 5 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={onChange}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Images preview (if available) */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Room Images:
            </Typography>
            {formData.roomImages?.length > 0 ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {formData.roomImages.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`room-${index}`}
                    width={80}
                    height={60}
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                  />
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">No images</Typography>
            )}
          </Grid>

          {/* Upload new file (optional) */}
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderStyle: "dashed",
                textAlign: "center",
                color: "gray",
              }}
            >
              <label htmlFor="file-upload">
                <FileInput
                  id="file-upload"
                  type="file"
                  onChange={(e) =>
                    onChange({
                      target: {
                        name: "file",
                        value: e.target.files[0],
                      },
                    })
                  }
                />
                <Button variant="outlined" component="span">
                  Upload Image
                </Button>
              </label>
              {formData.file && (
                <Typography mt={1}>Selected: {formData.file.name}</Typography>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
              Submit
            </Button>
            <Button variant="outlined" color="error" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
