"use client"
import React, { useEffect, useState } from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Spinner,
  Checkbox,
} from "@material-tailwind/react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { globalStore } from "@/context/store";

 
export function AddRole({open,setOpen}:{open:boolean,setOpen:(open:boolean)=>void}) {
    const [permissions,setPermissions] = useState<{id:number,
        name:string,
        codename: string,
        content_type:string }[] | null>(null)
    const token = globalStore(state=>state.token)
    const [name,setName] = useState('');
    const [perms,setPerms] = useState<string[]>([])
    const [loading,setLoading] = useState(false)

    const allPermissions= async()=>{
        setLoading(true)
        try{
            const res = await axios.get('http://localhost:8000/user/permissions',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
             })

             setPermissions(res.data)

        }catch
            (err){
                console.log(err)
            }finally{
                setName('')
                setPerms([])
                setOpen(false)
                setLoading(false)
            }
        
    }


    const handleAddRole = async ()=>{
        try{

           const res = await axios.post('http://localhost:8000/user/roles/',{name,permissions_data:perms},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            handleOpen()
            console.log(res.data)
        }
        catch (err){
            console.log(err)
        }
    }

  const handleOpen = () => setOpen(!open);

  useEffect(()=>{
    allPermissions()
  },[])
 
  console.log(perms)

  return (
    <>
      
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add Role
          </Typography>
          
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <MdClose className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Role name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. Accountant"
              name="name"
              onChange={(e)=>setName(e.target.value)}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
              <div className="text-gray-800">Set permissions for the role {name}</div>
          <div className="h-[30vh] overflow-y-scroll  border-[0.7px] border-gray-400">
          {
              permissions === null ? <Spinner /> :     permissions.map((item,index)=>(
                        <div key={index}>
                            <Checkbox value={item.codename} onChange={(e)=>{
                                setPerms((prev)=>{
                                    if(prev.includes(e.target.value)){
                                        return prev.filter((item)=>item !== e.target.value)
                                    }
                                    return [...prev,e.target.value]
                                })
                            }} label={item.name} color={'green'} />
                        </div>
                    ))

                }
          </div>
       
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto bg-red-400"  onClick={handleOpen}>
            clear all
          </Button>
          <Button className="ml-auto bg-blue-400" onClick={handleOpen}>
            Select All
          </Button>
          <Button disabled={loading} className="ml-auto bg-green-400" onClick={handleAddRole}>
            Add Role
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}