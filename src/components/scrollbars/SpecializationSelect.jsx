import Select from "react-select"

const SpecializationSelect = ({label,name,list,value,onChange,required,allowMultiple,labelClass,selectClass}) => {
  const options = list.map(item =>({
    value :item.specialization_id, label : item.title }));
  return (
    <div className='mt-4 '>
        {label && (<label className={labelClass ? labelClass : 'font-semibold'}>{label}{required && (<span className='text-red-600'>*</span>)}</label>)}
        <br />
        <Select 
        name={name} 
        value={value}
        onChange={onChange}
        isMulti={allowMultiple}
        className={selectClass ? selectClass:('w-full mt-2')}
        options={options}
        />
    </div>
  )
}

export default SpecializationSelect;