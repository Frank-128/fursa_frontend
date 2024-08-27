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

  const TABLE_ROWS = [
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "John Michael",
      email: "john@creative-tim.com",
      job: "Manager",
      org: "Organization",
      online: true,
      date: "23/04/18",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      job: "Programator",
      org: "Developer",
      online: false,
      date: "23/04/18",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      job: "Executive",
      org: "Projects",
      online: false,
      date: "19/09/17",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      job: "Programator",
      org: "Developer",
      online: true,
      date: "24/12/08",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
      name: "Richard Gran",
      email: "richard@creative-tim.com",
      job: "Manager",
      org: "Executive",
      online: false,
      date: "04/10/21",
    },
  ];

  export default function Staff() {
    const [open,setOpen]=useState(false)
    return (
        <Card className="h-full w-full rounded-none">
          <CardHeader floated={false} shadow={false} className="rounded-none space-y-2  ">
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
                <Link href='/staff/create' className="flex font-helvetica items-center gap-3 bg-[#17255a] text-gray-200 p-2 rounded" >
                  <IoMdPersonAdd strokeWidth={2} className="h-4 w-4" /> Add member
                </Link>
              </div>
            </div>
            <div className="flex flex-col h-48 md:h-fit md:items-center  md:justify-between  md:flex-row  ">
              <Tabs value="all" className="w-full md:w-max md:h-24 ">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                      <Tab className={'font-helvetica z-0'} key={value} value={value}>
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
          <CardBody className="overflow-scroll py-0  px-0">
            <table className="w-full min-w-max table-auto text-left">
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
              {TABLE_ROWS.map(
                  ({ img, name, email, job, org, online, date }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                    return (
                        <tr key={name}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Avatar src={img} alt={name} size="sm" />
                              <div className="flex flex-col">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-helvetica"
                                >
                                  {name}
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-helvetica opacity-70"
                                >
                                  {email}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-helvetica"
                              >
                                {job}
                              </Typography>
                              <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-helvetica opacity-70"
                              >
                                {org}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                  variant="ghost"
                                  size="sm"
                                  className={'font-helvetica'}
                                  value={online ? "online" : "offline"}
                                  color={online ? "green" : "blue-gray"}
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-helvetica"
                            >
                              {date}
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
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button className={'font-helvetica'} variant="outlined" size="sm">
                Previous
              </Button>
              <Button className={'font-helvetica'} variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
    );
  }

