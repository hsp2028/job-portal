import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '@base-ui/react'
import { Label } from '../ui/label'
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';
import { toast } from '../ui/toast';

export default function CompanyCreate() {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
    const registerCompany = async() =>{
        try {
            const res = await axios.post(
              `${COMPANY_API_END_POINT}/register`,
              { companyName },
              {
                headers: {
                  "Content-type": "application/json",
                },
                withCredentials: true,
              },
            );
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.add({
                    type:"success",
                    description:res.data.message
                })
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change this
            later!
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2 w-full p-2"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e)=>setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button variant='outline' onClick={()=>navigate("/admin/companies")}>Cancel</Button>
          <Button onClick={registerCompany}>Continue</Button>                         
        </div>
      </div>
    </div>
  );
}
