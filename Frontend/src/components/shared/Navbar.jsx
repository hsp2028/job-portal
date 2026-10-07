import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover.jsx";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../ui/avatar.jsx";

import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store.js";
import { toast } from "../ui/toast.jsx";
import { USER_API_END_POINT } from "../../utils/constants.js";
import axios from "axios";
import { setUser } from "../../redux/authSlice.js";

export default function () {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.add({
          type: "sucess",
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
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ul className="flex font-medium items-center gap-5 mr-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                    className="grayscale"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 ">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                      className="grayscale"
                    />
                  </Avatar>
                  <div>
                    <h1 className="font-medium">{user?.fullname}</h1>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center m-2 gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link" className="cursor-pointer">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center m-2 gap-2 cursor-pointer">
                    <LogOut />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="cursor-pointer"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}
