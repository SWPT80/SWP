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
  Alert
} from "@mui/material";
import { styled } from "@mui/system";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

const FileInput = styled("input")({
  display: "none",
});

export default function RoomForm({ formData, onChange, onSubmit, onCancel, title, errors }) {
  useEffect(() => {
    if (!formData || Object.keys(formData).length === 0) {
      setError("Không có dữ liệu biểu mẫu phòng để hiển thị.");
    } else {
      setError(null);
    }
  }, [formData]);

  const [error, setError] = useState(null);

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
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              name="roomId"
              label="ID Phòng"
              value={formData.roomId}
              onChange={onChange}
              error={!!errors?.roomId}
              helperText={errors?.roomId}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              name="roomType"
              label="Loại phòng"
              value={formData.roomType}
              onChange={onChange}
              error={!!errors?.roomType}
              helperText={errors?.roomType}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              name="roomCapacity"
              label="Sức chứa"
              value={formData.roomCapacity}
              onChange={onChange}
              error={!!errors?.roomCapacity}
              helperText={errors?.roomCapacity}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              name="roomPrice"
              label="Giá phòng"
              value={formData.roomPrice}
              onChange={onChange}
              error={!!errors?.roomPrice}
              helperText={errors?.roomPrice}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              name="rating"
              label="Đánh giá"
              value={formData.rating}
              onChange={onChange}
              inputProps={{ step: 0.1, min: 0, max: 5 }}
              error={!!errors?.rating}
              helperText={errors?.rating}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required error={!!errors?.status}>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Trạng thái"
                onChange={onChange}
              >
                <MenuItem value={true}>Hoạt động</MenuItem>
                <MenuItem value={false}>Không hoạt động</MenuItem>
              </Select>
              {errors?.status && (
                <Typography color="error" variant="caption">{errors.status}</Typography>
              )}
            </FormControl>
          </Grid>

          {/* Xem trước hình ảnh */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Hình ảnh phòng:
            </Typography>
            {formData.roomImages?.length > 0 ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {formData.roomImages.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`hình ảnh phòng-${index}`}
                    width={80}
                    height={60}
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                  />
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">Không có hình ảnh</Typography>
            )}
          </Grid>

          {/* Tải lên hình ảnh mới */}
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
                  Tải lên hình ảnh
                </Button>
              </label>
              {formData.file && (
                <Typography mt={1}>Đã chọn: {formData.file.name}</Typography>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
              Gửi
            </Button>
            <Button variant="outlined" color="error" onClick={onCancel}>
              Hủy
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}