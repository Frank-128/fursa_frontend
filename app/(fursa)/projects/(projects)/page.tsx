"use client"
import {projects} from '@/constants/projects'
import {CustomDataTable} from '@/components/datatable/CustomDataTable'
import {Chip} from '@material-tailwind/react'
import moment from 'moment'
import {TableColumn} from 'react-data-table-component';


interface DataRow{
  name:string;
  location:string;
  size:string;
  number_of_plots:number;
  status:boolean;
  created_at:string;

}

export default function Projects() {



  const columns : TableColumn<DataRow>[] = [
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
