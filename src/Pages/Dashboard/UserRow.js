import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const UserRow = ({ user,refetch }) => {
  const {email,role} = user;
  const navigate = useNavigate();
  const makeAdmin = () => {
    fetch(`http://localhost:5000/user/admin/${email}`, {
      method: "PUT",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) =>{
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem('accessToken');
          navigate("/");
        }
        return res.json();
      })
      .then((data) => {
        refetch();
        toast.success(`Successfully made an admin`);
      });
  };
  return (
    <tr>
      <th>1</th>
      <td>{user.email}</td>
      <td>
          {role !== 'admin' && <button onClick={makeAdmin} className="btn btn-xs">
          Make Admin </button>}
      </td>
      <td>
        <button className="btn btn-xs">Remove User</button>
      </td>
    </tr>
  );
};

export default UserRow;
