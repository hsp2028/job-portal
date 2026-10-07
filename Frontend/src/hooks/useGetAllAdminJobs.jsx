import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setAllAdminJobs, setAllJobs } from "../redux/jobSlice";

export default function useGetAllAdminJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, []);
}
