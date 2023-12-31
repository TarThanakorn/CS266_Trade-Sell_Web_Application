import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import uploads from "../img/upload.png";
import swal from 'sweetalert2';


const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(state?.desc || "");
  const [cat, setCat] = useState(state?.cat || "");
  const [price, setPrice] = useState(state?.price || "");
  const [contact, setContact] = useState(state?.contact || "");

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    if(title !== "" && file !== "" && cat !== "" && price !== "" && contact !== ""){
      try {
        state
          ? await axios.put(`/posts/${state.GameID}`, {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
              price,
              contact,
          })
          : await axios.post(`/posts/`, {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
              price,
              contact,
          });
      } catch (err) {
        console.log(err);
      }
      await swal.fire({
        title: "Success", 
        text: "Your item has been posted!", 
        confirmButtonColor: "#3085d6",
        icon: "success"},
      ).then(function(){ 
        navigate("/");
      });
    }else{
      swal.fire({
        title: "Warning", 
        text: "Input box cannot empty!", 
        confirmButtonColor: "#3085d6",
        icon: "warning"},
      )
    }
  };

  return (
    <div>
      <div className="add">
        <div className="content">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
              required
            />
          </div>
        </div>
        <div className="menu">
        <div className="item">
            <h1>Upload Image </h1>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files[0]); 
                setFilename(e.target.files[0].name);
              }}
              required
            />
            <label className="drop-container" id="dropcontainer" htmlFor="file"><img className="upload_btn" src={uploads} alt="" />
              {filename? (<p>{filename}</p>) : (<p>Upload (.png, .jpeg)</p>)}
            </label>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "music"}
                name="cat"
                value="music"
                id="music"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="music">Music</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "electronic"}
                name="cat"
                value="electronic"
                id="electronic"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="electronic">Electronic</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "health"}
                name="cat"
                value="health"
                id="health"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="health">Health & Beauty</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "furniture"}
                name="cat"
                value="furniture"
                id="furniture"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="furniture">Furniture</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "clothing"}
                name="cat"
                value="clothing"
                id="clothing"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="clothing">Clothing</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "other"}
                name="cat"
                value="other"
                id="other"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>
        </div>
        <div className="menu">
        <div className="items">
              <h1>Price</h1>
              <input
                className="price"
                type="text"
                value={price}
                pattern="(\d{0,7}(\.\d{0,2})?)?"
                placeholder="฿"
                onChange={(e) => {
                  const inputValueRegex = /^(\d{0,7}(\.\d{0,2})?)?$/;
                  if (inputValueRegex.test(e.target.value)) {
                    setPrice(e.target.value);
                  }
                }}
                required
              />
              <h1>Contact</h1>
              <input
               className="contact"
                type="text"
                value={contact}
                placeholder="081-234-XXXX"
                onChange={(e) => {
                  const enteredValue = e.target.value.replace(/[^\d]/g, '');
                  let formattedValue = '';
              
                  if (enteredValue.length > 0) {
                    formattedValue += enteredValue.substring(0, 3);
                    if (enteredValue.length > 3) {
                      formattedValue += '-' + enteredValue.substring(3, 6);
                    }
                    if (enteredValue.length > 6) {
                      formattedValue += '-' + enteredValue.substring(6, 10);
                    }
                  }
                  setContact(formattedValue);
                }}
                required
              />
              <span className="last"></span>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="buttons button" onClick={handleClick} to="/">SELL</button>
      </div>
    </div>
  );
};

export default Write;
