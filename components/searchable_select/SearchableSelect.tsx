import Select from 'react-select';

export default function SearchableSelect({}) {
    const options = [
        { value: 'plot1', label: 'Plot 1' },
        { value: 'plot2', label: 'Plot 2' },
        { value: 'plot3', label: 'Plot 3' }
    ]

    return (<Select
        // value={value}
        isMulti
        // styles={styles}
        // isClearable={value.some((v) => !v.isFixed)}
        name="colors"
        className="basic-multi-select  w-full"
        classNamePrefix="select"
        options={options}
    />)
}
