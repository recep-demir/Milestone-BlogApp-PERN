import React, { useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { Container, Grid, Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import BlogCard from "../components/blog/BlogCard";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const { getBlogs } = useBlogCalls();
  const { blogs } = useSelector((state) => state.blog);

  // Pagination durumunu URL'den okuyoruz
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const blogsPerPage = 6;
  const totalPages = Math.ceil((blogs?.length || 0) / blogsPerPage);
  
  const currentBlogs = blogs?.slice(
    (page - 1) * blogsPerPage, 
    page * blogsPerPage
  );

  useEffect(() => {
    getBlogs();
  }, []);

  // Sayfa değiştiğinde URL'yi günceller
  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
    window.scrollTo({ top: 0, behavior: "smooth" }); // Sayfa değişince yumuşakça yukarı kaydır
  };

  return (
    <Container>
      <Grid container spacing={3} mt={2}>
        {currentBlogs?.map((blog) => (
          <Grid item xs={12} md={6} lg={4} key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}
      />
      <br />
    </Container>
  );
};

export default Dashboard;