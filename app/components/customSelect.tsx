interface Props {
  selectOptions: {
    value: string,
    text: string
  }[],
  label: string,
  onSelect: (selectedOpt: string) => void
}

const CustomSelect: React.FC<Props> = ({label, selectOptions, onSelect}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  }

  return (
    <>
      <div className="px-4 py-2">
        <span className="font-medium">{label}</span>
        <select onChange={handleSelectChange} className="bg-gray-50 border ml-4 w-[180px] border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
          {
            selectOptions.map((item, id) => {
              return (
                <option value={item.value} key={id}>{item.text}</option>
              )
            })
          }
        </select>
      </div>
    </>
  )
}

export default CustomSelect