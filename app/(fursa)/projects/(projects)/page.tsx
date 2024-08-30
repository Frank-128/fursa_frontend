"use client"
import {projects} from '@/constants/projects'
import {CustomDataTable} from '@/components/datatable/CustomDataTable'
import {Chip} from '@material-tailwind/react'
import moment from 'moment'
import {TableColumn} from 'react-data-table-component';
import Link from "next/link";
import { globalStore } from '@/context/store'
import api from '@/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import Spinner from '@/components/spinner/Spinner'


interface DataRow{
  id:number;
  name:string;
  address:{
    ward_name:string,
    district_name:string,
    region_name:string
  };
  size:string;
  number_of_plots:number;
  status:string;
  created_at:string;

}

export default function Projects() {


  const token = globalStore(state=>state.token)

  const getProjects = async ()=>{ 
      
    
      
    const {data} = await api.get('project/',{
    headers:{
        Authorization:`Bearer ${token}`
    }

   
})
return data

}

const { data, error, isLoading } = useQuery({
queryKey: ['getProjects'], 
queryFn: getProjects,        
refetchOnWindowFocus: true,
});



  const columns : TableColumn<DataRow>[] = [
    {
      name: 'Project Name',
      selector: row => row.name,
      cell:row=>(
          <Link className={'text-[#17225a] '} href={'/projects/details/'+row.id}>
            {row.name}
          </Link>
      ),
      sortable: true,
    },
    {
      name: 'Location',
      selector: row => row.address.ward_name + ", "+ row.address.district_name+" "+row.address.region_name,
      sortable: true,
    },
    {
      name: 'Size',
      selector: row => row.size,
      sortable: true,
    },
    {
      name: 'Plots',
      selector: row => row.number_of_plots,
      sortable: true,
    },
    {
      name: 'Status',
      cell: row => (
          <Chip
              size="sm"
              variant="ghost"
              value={row.status}
              color={
                row.status === "Pending"
                    ? "orange"
                    : row.status === "Available" ? 
                      "light-blue":
                       "green"

              }
          />

      ),
    },
    {
      name: 'Created At',
      selector: row => moment(row.created_at).format('MM-D-YYYY'),
      sortable: true,
    },
  ]


  return (
      <main className="flex   p-4  flex-col items-center">
       {
        isLoading ? <Spinner />   :
        <CustomDataTable searchAttr={'name'} componentData={data} componentColumns={columns}  />
       }

      </main>
  );
}
