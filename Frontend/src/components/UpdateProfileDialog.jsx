import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants";
import { toast } from "./ui/toast";
import { Input } from "./ui/input.jsx";
import { setUser } from "../redux/authSlice.js";

export default function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({});
  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    if (!open) return;
    setInput({
      fullname: user?.fullname ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      bio: user?.profile?.bio ?? "",
      skills: user?.profile?.skills?.join(", ") ?? "",
      resumeFile: null,
      profilePhotoFile: null,
    });
  }, [open, user]);

  useEffect(() => {
    if (!input.profilePhotoFile) {
      setPhotoPreview(user?.profile?.profilePhoto ?? "");
      return;
    }

    const previewUrl = URL.createObjectURL(input.profilePhotoFile);
    setPhotoPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [input.profilePhotoFile, user?.profile?.profilePhoto]);

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput((current) => ({ ...current, [e.target.name]: e.target.value }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput((current) => ({ ...current, [e.target.name]: file ?? null }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.resumeFile) {
      formData.append("file", input.resumeFile);
    }
    if (input.profilePhotoFile) {
      formData.append("profilePhoto", input.profilePhotoFile);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setOpen(false);
        toast.add({
          type: "success",
          description: res.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast.add({
        type: "error",
        description: error.response?.data?.message ?? "Profile update failed",
        priority: "high",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-h-[90dvh] overflow-y-auto sm:max-w-md"
          // onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="profilePhoto" className="text-right">
                  Profile photo
                </Label>
                <div className="col-span-3 flex items-center gap-3">
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                  <Input
                    id="profilePhoto"
                    name="profilePhotoFile"
                    type="file"
                    accept="image/*"
                    onChange={fileChangeHandler}
                    className="min-w-0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullname" className="text-right">
                  Name
                </Label>
                <Input
                  autoComplete="true"
                  id="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  name="fullname"
                  className="p-2  border border-black rounded-2xl outline-none transition-all duration-200  focus:border-[#7209b7] focus:shadow-lg col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  autoComplete="true"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  name="email"
                  className="p-2  border border-black rounded-2xl outline-none transition-all duration-200  focus:border-[#7209b7] focus:shadow-lg col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  name="phoneNumber"
                  className="p-2  border border-black rounded-2xl outline-none transition-all duration-200  focus:border-[#7209b7] focus:shadow-lg col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  type="text"
                  value={input.bio}
                  onChange={changeEventHandler}
                  name="bio"
                  className="p-2  border border-black rounded-2xl outline-none transition-all duration-200  focus:border-[#7209b7] focus:shadow-lg col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  type="text"
                  value={input.skills}
                  onChange={changeEventHandler}
                  name="skills"
                  className="p-2  border border-black rounded-2xl outline-none transition-all duration-200  focus:border-[#7209b7] focus:shadow-lg col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="resumeFile"
                  onChange={fileChangeHandler}
                  type="file"
                  accept="application/pdf"
                  className="p-2  border border-black rounded-2xl outline-none transition-all duration-200  focus:border-[#7209b7] focus:shadow-lg col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-5 cursor-pointer">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
