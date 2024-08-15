"use client"
import Image from "next/image";
import {usePathname} from 'next/navigation';
import { RiBuilding2Line } from "react-icons/ri";
import { TbDeviceImacSearch } from "react-icons/tb";
import { MdDomainVerification } from "react-icons/md";
import { TbFlagCancel } from "react-icons/tb";
import { IoTelescopeOutline } from "react-icons/io5";
import {projects} from '../../../../constants/projects'
import {CustomDataTable} from '../../../../components/datatable/CustomDataTable'
import {Chip} from '@material-tailwind/react'
import moment from 'moment'

export default function Projects() {



  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Location',
      selector: row => row.location,
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
              value={row.status?"sold out":"ongoing"}
              color={
                row.status
                    ? "green"
                    :
                       "amber"

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
      <main className="flex   flex-col items-center">
        <CustomDataTable searchAttr={'name'} componentData={projects} componentColumns={columns}  />

      </main>
  );
}
