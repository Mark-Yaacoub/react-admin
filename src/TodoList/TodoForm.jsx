import React, { useState } from "react";
import { Box, Button, TextField, Grid } from "@mui/material";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    if (value) {
      // add todo
      addTodo(value);
      // clear form after submission
      setValue("");
    }
  };
  return (
    <Box m="20px">
      <Grid item xs={12} md={6}>
        <form onSubmit={handleSubmit} className="TodoForm">
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Add Task"
            placeholder="What is the task today?"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name="todo-input"
            sx={{ gridColumn: "span 1" }}
          />
          <Button type="submit" color="secondary" variant="contained">
            Add Task
          </Button>
        </form>
      </Grid>
    </Box>
  );
};
