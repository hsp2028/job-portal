import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../../redux/jobSlice';

export default function AdminJobs() {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setSearchJobByText(input))
  },[input])
    const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" onChange={(e)=> setInput(e.target.value)} placeholder="Filter by name, role" />
          <Button onClick={()=>navigate("/admin/jobs/create")} className='cursor-pointer'>New Jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}
