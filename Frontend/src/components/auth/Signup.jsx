import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constants.js";
import { toast } from "../ui/toast.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice.js";
import store from "../../redux/store.js";
import { Loader2 } from "lucide-react";
const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const { loading } = useSelector((sotre) => sotre.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const chageFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.add({
          type: "success",
          description: res.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      // toast.add({
      //   type: "error",
      //   description: error.response.data.message,
      //   priority: "high",
      // });
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-3xl text-center mb-5">Signup</h1>
          <div className="p-2">
            <Label className="my-2">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Your name"
            />
          </div>
          <div className="p-2">
            <Label className="my-2">Email</Label>
            <Input
              type="text"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="abcd@gmail.com"
            />
          </div>
          <div className="p-2">
            <Label className="my-2">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+91 123456789"
            />
          </div>
          <div className="p-2">
            <Label className="my-2">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Your Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={chageFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-5 cursor-pointer">
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account?
            <Link to="/login" className="text-blue-800">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
