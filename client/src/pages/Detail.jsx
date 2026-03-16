import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, CardMedia, Avatar, TextField, Button, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";

const Detail = () => {
  const location = useLocation();
  const initialBlog = location.state?.blog; // Dashboard'dan gelen statik/eski veri
  
  const { comments, blogs } = useSelector(state => state.blog);
  // getSingleBlog fonksiyonunu içeri alıyoruz
  const { addComment, getCommentsByID, getSingleBlog } = useBlogCalls(); 
  const [Content, setContent] = useState("");

  // REDUX'TAN GÜNCEL VERİYİ BULUYORUZ (Sayaç ve like'ların anında değişmesi için)
  const activeBlog = blogs?.find(b => b.id === initialBlog?.id) || initialBlog;

  useEffect(() => {
    if (activeBlog?.id) {
      getCommentsByID(activeBlog.id); // Yorumları getir
      getSingleBlog(activeBlog.id);   // BACKEND SAYACINI ARTIR!
    }
  }, [activeBlog?.id]);

  const blogComments = comments.filter((comment) => comment.blogId === activeBlog?.id);

  const handleAddComment = () => {
    if (Content.trim()) {
      addComment(activeBlog.id, Content);
      setContent("");
      getCommentsByID(activeBlog.id);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <CardMedia component="img" height="300" image={activeBlog.image} alt={activeBlog.title} sx={{ borderRadius: 2, objectFit: "cover" }} />
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>
          <PersonIcon />
        </Avatar>
        <Typography variant="body1" sx={{ fontWeight: "bold", mr: 2, textTransform: "capitalize" }}>
          {activeBlog.User?.username || "Anonymous"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(activeBlog.createdAt).toLocaleString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
        {activeBlog.title}
      </Typography>

      <Typography variant="body1" sx={{ mt: 2 }}>
        {activeBlog.content}
      </Typography>

      <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <FavoriteIcon sx={{ color: activeBlog.likes?.length > 0 ? "error.main" : "inherit" }} />
          <Typography>{activeBlog.likes?.length || 0}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <CommentIcon />
          <Typography>{activeBlog.Comments?.length || activeBlog.comments?.length || blogComments.length || 0}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <RemoveRedEyeIcon />
          {/* İŞTE GÜNCEL ZİYARETÇİ SAYISI BURAYA YANSIYACAK */}
          <Typography fontWeight="bold">{activeBlog.countOfVisitors || 0}</Typography>
        </Box>
      </Box>

      <TextField 
        label="Write a comment..." 
        fullWidth 
        multiline 
        rows={3}
        value={Content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mt: 3 }} 
      />

      <Button variant="contained" onClick={handleAddComment} sx={{ mt: 2 }}>
        Add Comment
      </Button>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Comments</Typography>
        {blogComments.map((comment) => (
          <Box key={comment.id} sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
              {comment.User?.username || comment.userId?.username || "Anonymous"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(comment.createdAt).toLocaleString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {comment.comment}
            </Typography>
          </Box>
        ))}
      </Box>
      <br />
    </Container>
  );
};

export default Detail;