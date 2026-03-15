import * as React from "react";
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Box, Divider } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from "react-router-dom";
import useBlogCalls from "../../hooks/useBlogCalls";
import { useSelector } from "react-redux";

export default function BlogCard({ blog }) {
  // DÜZELTME: Büyük harfli "Comments" verisini de parçalıyoruz
  const { id, title, createdAt, content, image, likes = [], countOfVisitors = 0, Comments = [], comments = [] } = blog;
  const navigate = useNavigate();
  const { toggleLike } = useBlogCalls();
  
  const { userId } = useSelector((state) => state.auth); 
  const isLiked = likes?.includes(userId);

  const formatDate = (dateString) => {
    if (!dateString) return "No Date";
    const date = new Date(dateString);
    return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  // DÜZELTME: Postgres'ten gelen "Comments" dizisini kullanıyoruz
  const commentCount = Comments?.length || comments?.length || 0;

  return (
    <Card
      id={id}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%", 
        borderRadius: 3,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardMedia
        sx={{ height: 220, objectFit: "cover" }} 
        image={image || "https://source.unsplash.com/random/800x600"}
        component="img"
        title={title}
      />
      
      <CardContent sx={{ flexGrow: 1, px: 3, pt: 3, pb: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold", lineHeight: 1.2, mb: 2 }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3, 
            overflow: "hidden",
            mb: 2
          }}
        >
          {content}
        </Typography>
        <Typography variant="caption" color="text.disabled" fontWeight="500">
          {formatDate(createdAt)}
        </Typography>
      </CardContent>

      <Divider sx={{ mx: 3 }} />

      <CardActions sx={{ display: "flex", justifyContent: "space-between", px: 3, py: 2, mt: "auto" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{ display: "flex", gap: 0.5, alignItems: "center", cursor: "pointer", transition: "0.2s", "&:hover": { color: "primary.main" }, "&:active": { transform: "scale(0.9)" } }}
            onClick={() => toggleLike(id, userId)}
          >
            <FavoriteIcon sx={{ color: isLiked ? "error.main" : "action.disabled", fontSize: "1.3rem" }} />
            <Typography variant="body2" fontWeight="500">{likes?.length || 0}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", color: "text.secondary" }}>
            <CommentIcon sx={{ fontSize: "1.3rem" }} />
            {/* Yorum sayısını güncelledik */}
            <Typography variant="body2" fontWeight="500">{commentCount}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", color: "text.secondary" }}>
            <RemoveRedEyeIcon sx={{ fontSize: "1.3rem" }} />
            <Typography variant="body2" fontWeight="500">{countOfVisitors || 0}</Typography>
          </Box>
        </Box>
        <Button 
          variant="contained" 
          size="small" 
          disableElevation
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
          onClick={() => navigate(`/detail/${id}`, { state: { blog } })}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}