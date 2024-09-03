"use client"
import { Radio, Input } from '@material-tailwind/react';
import React, { Fragment } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';

export default function CreateLead() {
    const {register,handleSubmit,watch,control} = useForm()
    const selectedPlots = watch('plots');
    

    const options = [
        {
          label:'Mwasonga',
          options:[
            {value:"plot_1_mwasonga",
            label:"Plot 1 Mwasonga (400sqm)"},
            {value:"plot_2_mwasonga (616sqm)",
              label:"Plot 2 Mwasonga (616sqm)"},
              {value:"plot_3_mwasonga (616sqm)",
                label:"Plot 3 Mwasonga (616sqm)"},  
  
          ]
        },
        {
          label:'Buyuni',
          options:[
            {value:"plot_1_buyuni",
            label:"Plot 1 Buyuni (616sqm)"},
            {value:"plot_2_buyuni (748sqm)",
              label:"Plot 2 Buyuni (400sqm)"},
              {value:"plot_3_buyuni (512sqm)",
                label:"Plot 3 Buyuni (748sqm)"},  
  
          ]
        }
      ]

    const customStyles = {
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? 'black' : 'gray', 
          boxShadow: state.isFocused ? '0 0 0 0.7px black' : 'none',  
          '&:hover': {
            borderColor: state.isFocused ? 'black' : 'grey',  
          },
        }),
      };
      
      
      const monthsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((item) => ({
        label: `${item} month${item === 1 ? "":"s"}`,
        value: item,
      }));
      
      const submitData:SubmitHandler<FieldValues> = (data)=>{
        console.log(data)
      }

  return (
    <form onSubmit={handleSubmit(submitData)}>
            <div className='w-full flex justify-center gap-2'>
              <span className='text-[#ff8427] text-xl font-helveticaBold md:text-3xl p-2 '>ADD NEW LEAD</span>
            </div>
            <div className='grid gap-2 md:grid-cols-2 grid-cols-1 border-gray-700 border-[0.9px] p-2'>
              <Input label='First name' />
              <Input label='Middle name' />
              <Input label='Last name' />
              <Input  label='Phonenumber' />
              <Input  label='Instagram' />
              <Input  label='Facebook' />
              <Select 
              styles={customStyles}
              placeholder="Source of contact..."  options={[{label:'Whatsapp',value:'whatsapp'},{label:"Instagram",value:"instagram"},{label:"Door to door",value:"Door to door"},{label:"Walk in",value:"Walk in"}]} />
             
             <Controller
              control={control}
              name='plots'
              render={({field})=>( <Select 
              {...field}
              styles={customStyles}
              placeholder="Select plot..." isMulti options={options} />

            )}
              />

              </div>
              {
                selectedPlots?.length > 0 &&
                selectedPlots.map((item,index:number)=>
                    <Fragment key={index}>
               <span className='border-gray-700 border-b-[0.9px] w-full p-2'>{item.label}</span>
               <div className='grid gap-2 md:grid-cols-2 grid-cols-1 border-gray-700 border-[0.9px] p-2 my-2'> 
               <Controller
              control={control}
              name={`sales[${index}].payment_method`}
              render={({field})=>

                  <Select 
                  {...field}
                  styles={customStyles}
                  placeholder="Payment method..."  options={[{label:"Cash",value:"cash"},{label:"Installment",value:"installment"},{label:"Flat rate",value:"flat_rate"}]} />
                }

              />
               <Input label='Agreed Rate' type='number'  />
               <Select 
              styles={customStyles}
              placeholder="Number of months..."  options={monthsOptions} />
              <Input  label='Paid amount' />
              
                              <div>
                <span className='text-xs'>Visited site</span>
              
              <div> 
              <Radio  color='green' {...register(`sales[${index}].status`)} value={"visited site"}   label={<div className='text-500-green'>Yes</div>}  />
              <Radio  color='red' {...register(`sales[${index}].status`)} value={"scheduled visit site"} label={<div className='text-500-red'>No</div>} defaultChecked />
              <Radio  color='purple' {...register(`sales[${index}].status`)} label={<div className='text-500-red'>Scheduled</div>}  />
              </div>
              </div>
              
              <Input  label='Site visitation day' {...register(`sales[${index}].scheduled_site_visit`)} type='date' />
              </div>
              </Fragment>
              )
              }
            <button type='submit' className='bg-[#17255a] text-[#ff8427] p-2'>Add new lead</button>
        </form>
  )
}

