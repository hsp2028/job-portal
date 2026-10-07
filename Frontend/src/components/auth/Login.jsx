import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../ui/toast.jsx";
import { USER_API_END_POINT } from "../../utils/constants.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice.js";
import store  from "../../redux/store.js";
import { Loader2 } from "lucide-react";
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const chageFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.add({
          type: "success",
          description: res.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast.add({
        type: "error",
        description: error.response.data.message,
        priority: "high",
      });
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
          <h1 className="font-bold text-3xl text-center mb-5">Login</h1>
          <div className="p-2">
            <Label className="my-2">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="abcd@gmail.com"
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
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-5 cursor-pointer">
              Login
            </Button>
          )}
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-800">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
