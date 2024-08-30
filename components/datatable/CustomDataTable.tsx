'use client'
import React from 'react';
// import { faker } from '@faker-js/faker';
import DataTable from 'react-data-table-component';


interface FilterComponentProps{
    filterText:string;
    onFilter:(e:any)=>void;
    onClear:()=>void;
}

interface CustomDataTableProps{
    componentData:any[];
    componentColumns:any[];
    searchAttr:string;
}


//
// const createUser = () => ({
//     id: faker.string.uuid(),
//     name: faker.internet.userName(),
//     email: faker.internet.email(),
//     address: faker.location.streetAddress(),
//     bio: faker.lorem.sentence(),
//     image: faker.image.avatar(),
// });
//
// const createUsers = (numUsers = 5) => new Array(numUsers).fill(undefined).map(createUser);
// const fakeUsers = createUsers(2000);

const FilterComponent = ({ filterText, onFilter }:FilterComponentProps) => (
    <div className={'w-full border-b-[0.93px] m-0 py-2 justify-end flex border-gray-500'}>
        <div className={'flex gap-1'}>
            <input
                type={'text'}
                value={filterText}
                onChange={onFilter}
                placeholder={'search for project here'}
                className={' p-2 outline-none border-gray-400 rounded border-[1px]'}
            />
            {/*<button className={'bg-red-800/60 p-2 text-gray-100 rounded text-xs'} onClick={onClear}>*/}
            {/*    clear*/}
            {/*</button>*/}
        </div>
    </div>
);







export const CustomDataTable = ({componentData, componentColumns, searchAttr}:CustomDataTableProps) => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = componentData?.filter(
        item => item[searchAttr] && item[searchAttr].toLowerCase().includes(filterText.toLowerCase()),
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
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            selectableRows
            persistTableHead
        />
    );


};


