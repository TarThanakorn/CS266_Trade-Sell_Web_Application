import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import Modal from "react-modal";
import swal from 'sweetalert2';


const Single = () => {
  const [post, setPost] = useState({});
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the post! type \"DELETE\" to delete.",
      icon: "warning",
      input: "text",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Deny`,
      confirmButtonColor: "#d33",
      denyButtonColor: "#808080",
    })
    .then(async (result) => {
      if(result.value === "DELETE"){
        try {
          let res;
          res = await axios.delete(`/posts/${postId}`);
          swal.fire({
            title: "Success", 
            text: "Your post has been deleted!", 
            icon: "success"},
          ).then(function(){ 
            navigate("/");
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
    
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <div className="single">
      <div className="content">
        <img
          onClick={openImageModal}
          src={`../upload/${post?.img}`}
          alt=""
        />
        <Modal
          isOpen={isImageModalOpen}
          onRequestClose={closeImageModal}
          contentLabel="Image Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
            },
          }}
        >
          <img
            src={`../upload/${post?.img}`}
            alt=""
            onClick={closeImageModal}
            className="currentPic"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal>
        <div className="user">
          {post.userImg && (
            <img src={`../upload/${post?.userImg}`} alt="" />
          )}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser && (currentUser.username === post.username || currentUser.isAdmin) && (
            <div className="edit">
              {currentUser && (currentUser.username === post.username) && 
              <Link className="editPost" to={`/write?edit=${postId}`} state={post}>
                <img src={Edit} alt="" />
              </Link>}
              <img className="deletePost" onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <div className="info">
          <h4 className="price">Price: {post.price}</h4> | <h4 className="contact">Contact: {post.contact}</h4> 
        </div>
        <h3>{post.title}</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
