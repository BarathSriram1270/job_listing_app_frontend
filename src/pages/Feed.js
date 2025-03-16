import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

// Replace localhost with your deployed Railway backend URL
const BACKEND_URL = "https://joblistingappbackend-production.up.railway.app";

const Feed = () => {
  const [query, setQuery] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/posts/${query}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching filtered posts:", error);
      }
    };

    const fetchInitialPosts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/allPosts`);
        console.log(response);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching all posts:", error);
      }
    };

    if (query.length === 0) fetchInitialPosts();
    if (query.length > 2) fetchPosts();
  }, [query]);

  console.log(post);

  return (
    <Grid container spacing={2} sx={{ margin: "2%" }}>
      <Grid item xs={12} sx={12} md={12} lg={12}>
        <Button sx={{ margin: "1% 2%" }} variant="outlined">
          <Link to="/">Home</Link>
        </Button>
        <Box>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search..."
            sx={{ width: "75%", padding: "2% auto" }}
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </Grid>
      {post.length > 0 ? (
        post.map((p) => (
          <Grid key={p.id} item xs={12} md={6} lg={4}>
            <Card sx={{ padding: "3%", overflow: "hidden", width: "84%" }}>
              <Typography
                variant="h5"
                sx={{ fontSize: "2rem", fontWeight: "600" }}
              >
                {p.profile}
              </Typography>
              <Typography sx={{ color: "#585858", marginTop: "2%" }} variant="body1">
                Description: {p.desc}
              </Typography>
              <br />
              <Typography variant="h6">
                Years of Experience: {p.exp} years
              </Typography>
              <Typography gutterBottom variant="body1">
                Skills:
              </Typography>
              {p.techs.map((s, i) => (
                <Typography variant="body2" gutterBottom key={i}>
                  {s}
                  {i !== p.techs.length - 1 ? " • " : ""}
                </Typography>
              ))}
            </Card>
          </Grid>
        ))
      ) : (
        <Typography sx={{ margin: "2%", fontSize: "1.2rem" }}>
          No posts found.
        </Typography>
      )}
    </Grid>
  );
};

export default Feed;