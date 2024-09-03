'use client'
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoMdPersonAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
  import Link from "next/link";
import { AddRole } from "@/components/add_role/AddRole";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { globalStore } from "@/context/store";
import api from "@/axiosInstance";

  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Internal",
      value: "internal",
    },
    {
      label: "External",
      value: "external",
    },
  ];

  const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];

  

  export default function Staff() {
    const [open,setOpen]=useState(false)
    const [pageNo,setPageNo] = useState(1)
    const [internal,setInternal] = useState("all")

    const token = globalStore(state=>state.token)

    const getStaff = async ()=>{ 
        
      
        
      const {data} = await api.get('user/staff/?page='+pageNo,{
      headers:{
          Authorization:`Bearer ${token}`
      }

     
  })
  return data

}

const { data, error, isLoading } = useQuery({
  queryKey: ['getStaffs',pageNo], 
  queryFn: getStaff,        
  refetchOnWindowFocus: true,
});
    
    return (
        <Card className="h-fit w-full rounded-none">
          <CardHeader floated={false} shadow={false} className="rounded-none space-y-2 p-2 ">
            <div className="flex items-center justify-between gap-8">
              <div className="flex-row flex gap-x-4">
                <Typography className={'font-helvetica font-bold'}  color="blue-gray">
                  Staff list
                </Typography>
                <Typography onClick={()=>setOpen(true)} className={'font-helvetica cursor-pointer  hover:underline text-blue-500'} >
                  + role
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link href='/human_resource/staff/create' className="flex font-helvetica items-center gap-3 bg-[#17255a] text-gray-200 p-2 rounded" >
                  <IoMdPersonAdd strokeWidth={2} className="h-4 w-4" /> Add member
                </Link>
              </div>
            </div>
            <div className="flex flex-col  md:h-fit md:items-center gap-y-2 md:justify-between  md:flex-row  ">
              <Tabs value="all" className="w-full md:w-max md:h-24 ">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                      <Tab className={'font-helvetica z-0'} onClick={()=>setInternal(value)} key={value} value={value}>
                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                      </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <div className="w-full flex md:items-start md:h-24 md:w-72 ">
                <Input
                    label="Search"
                    icon={<HiMagnifyingGlass className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll h-[45vh] py-0  px-0">
            <table className="w-full min-w-max   table-auto text-left">
              <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                    <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-helvetica leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                ))}
              </tr>
              </thead>
              <tbody>
              
              {data?.results?.filter((item:any) =>{
                if (internal === "all") return true;
                if (internal === "internal") return item.is_internal_employee;
                return !item.is_internal_employee;
              }
            ).map(
                  ({ profile_image, staff_id,first_name,last_name, email,date_joined }:{profile_image:string,staff_id:string,first_name:string,last_name:string,email:string,date_joined:string,created_at:string}, index:number) => {
                    const isLast = index === data?.results.length - 1;
                    const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                    return (
                        <tr key={index}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Avatar src={'http://localhost:8000/'+profile_image} alt={first_name} size="sm" />
                              <Link href={'/human_resource/staff/profile/'+staff_id} className="flex flex-col">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-helvetica"
                                >
                                  {first_name+" "+last_name}
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-helvetica opacity-70"
                                >
                                  {email}
                                </Typography>
                              </Link>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-helvetica"
                              >
                                {"Job"}
                              </Typography>
                              <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-helvetica opacity-70"
                              >
                                {"Organisation"}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                  variant="ghost"
                                  size="sm"
                                  className={'font-helvetica'}
                                  value={index % 2 == 0 ? "online" : "offline"}
                                  color={index % 2 == 0 ? "green" : "blue-gray"}
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-helvetica"
                            >
                              {date_joined}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Tooltip content="Edit User">
                              <IconButton variant="text">
                                <MdEdit className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                    );
                  },
              )}
              </tbody>
            </table>
            <AddRole open={open} setOpen={setOpen} />
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography className={'font-helvetica'} variant="small" color="blue-gray" >
              Page {pageNo} of {Math.ceil(data?.count/10)}
            </Typography>
            <div className="flex gap-2">
              <Button disabled={pageNo === 1 } onClick={()=>setPageNo(pageNo-1)} className={'font-helvetica'} variant="outlined" size="sm">
                Previous
              </Button>
              <Button disabled={Math.ceil(data?.count/10) === pageNo } onClick={()=>setPageNo(pageNo+1)} className={'font-helvetica'} variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
    );
  }

