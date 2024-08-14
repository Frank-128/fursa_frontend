'use client'
import React from 'react';
// import styled from 'styled-components';
import { faker } from '@faker-js/faker';
import DataTable from 'react-data-table-component';
import {Input} from '@material-tailwind/react'


const createUser = () => ({
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    bio: faker.lorem.sentence(),
    image: faker.image.avatar(),
});

const createUsers = (numUsers = 5) => new Array(numUsers).fill(undefined).map(createUser);

const fakeUsers = createUsers(2000);




const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <div className={'flex border-gray-800 rounded border-[2px]'}>
        <input
            type={'text'}
           label={"Search"}
            value={filterText}
            onChange={onFilter}
            placeholder={'search for project here'}
           className={'border-none p-2 outline-none'}
        />
        <button className={'bg-red-800/60 p-2 text-gray-100'} onClick={onClear}>
           clear
        </button>
    </div>
);

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Address',
        selector: row => row.address,
        sortable: true,
    },
];

export const CustomDataTable = ({componentData,componentColumns}) => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = componentData.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            columns={componentColumns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            // subHeader
            // subHeaderComponent={subHeaderComponentMemo}
            selectableRows
            persistTableHead
        />
    );


};


