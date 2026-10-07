import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice';

export default function Companies() {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])
    const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" onChange={(e)=> setInput(e.target.value)} placeholder="Filter by name" />
          <Button onClick={()=>navigate("/admin/companies/create")} className='cursor-pointer'>New Company</Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}
