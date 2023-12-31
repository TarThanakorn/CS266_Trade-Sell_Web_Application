import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import swal from 'sweetalert2';


const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    phone: "",
    img: null,
    birthday: "",
    file: ""
  });
  const state = useLocation().state;
  const [file, setFile] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setUserData({ ...userData, file: imageFile });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    var img = await upload();
    try {
      if(img === undefined && userData.img !== undefined){
        img = userData.img;
      }
      let res;
      res = await axios.put(`/users/${currentUser?.id}`, { userData,img });
      swal.fire({
        title: "Success", 
        text: "Your profile has been updated!", 
        confirmButtonColor: "#3085d6",
        icon: "success"},
      ).then(function(){ 
        navigate("/")
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users/${currentUser?.id}`);
        if(res.data.birthday !== null){
          const dbDate = new Date(res.data.birthday);
          const localOffset = dbDate.getTimezoneOffset() * 60000; // in milliseconds
          const localDate = new Date(dbDate.getTime() - localOffset);
          setUserData({ ...res.data, birthday: localDate.toISOString().split('T')[0] });
        }else{
          setUserData(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [currentUser?.id]);

  return (
    <div className="profile">
      {currentUser?.id === Number(window.location.pathname.match(/\/profile\/(\d+)/)[1]) ? (
        <div className="space">
          <div className="card">
            <div className="profile-info">
              <div className="form-group">
                <div className="upload-section">
                  <div className="profile-image-container">
                    <p className="profile-picture-text">Profile Picture</p>
                    <img
                      className="profile-image"
                      src={
                        userData.file 
                          ? URL.createObjectURL(userData.file)
                          : userData.img
                            ? `http://localhost:3000/upload/${userData?.img}`
                            : "https://media.discordapp.net/attachments/1141394595645771956/1180194075291422780/707608-200.png?ex=657c8862&is=656a1362&hm=dc34d1ab3da494d09bb2f6c2d59cf37b3f2965583de967cf3c5688ee0deec69b&=&format=webp&quality=lossless&width=319&height=319"
                      }
                      alt="Profile"
                    />
                  </div>
                  <input
                    type="file"
                    id="file"
                    name=""
                    accept="image/*"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      handleImageChange(e);
                    }}
                  />
                </div>
                <h2 className="account-details-text">Account Details</h2>
                <form>
                  <div className="name-group">
                    <div className="form-group">
                      <label htmlFor="fname">First Name</label>
                      <input
                        type="text"
                        id="fname"
                        name="fname"
                        value={userData.fname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lname">Last Name</label>
                      <input
                        type="text"
                        id="lname"
                        name="lname"
                        value={userData.lname}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="contact-group">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        maxLength="10"
                        value={userData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="birthday">Birthdate</label>
                    <input
                      type="date"
                      id="birthday"
                      name="birthday"
                      value={userData.birthday?.slice(0, 10)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" onClick={handleClick}>
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space">
          <div className="card2">
            <h1>No Permission</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
