import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const cat = useLocation().search;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
        setCurrentPage(1);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);


  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    const yOffset = 0;
    const element = document.getElementById("your-content-container"); 
    if (element) {
      yOffset = element.getBoundingClientRect().top + window.pageYOffset;
    }

    setCurrentPage(pageNumber);

    window.scrollTo({ top: yOffset, behavior: "smooth" });
  };

  return (
    <div className="home">
      <div className="posts">
        <div className="post-container">
          {posts
            .slice(
              (currentPage - 1) * postsPerPage,
              currentPage * postsPerPage
            )
            .map((post) => (
              <div className="post" key={post.id}>
                <p className="cata" hidden>{post.cat}</p> 
                <div className="img">
                  <Link className="link" to={`/post/${post.id}`}>
                    <img src={`../upload/${post.img}`} alt="" />
                  </Link>
                </div>
                <div className="content">
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <p className="desc">{getText(post.desc.substring(0, 55))}</p>
                  <div className="button-container">
                    <h4>Price</h4> <p>{post.price}</p>
                    <h4 className="padding">Contact</h4> <p>{post.contact}</p>
                  </div>
                  <div className="readmore">
                    <center>
                      <Link className="link" to={`/post/${post.id}`}>
                        <button to={`/post/${post.id}`}>Read More</button>
                      </Link>
                    </center>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="page-numbers">
        {pageNumbers.map((pageNumber) => (
          <span
            key={pageNumber}
            className={currentPage === pageNumber ? "active" : "actives"+pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;
