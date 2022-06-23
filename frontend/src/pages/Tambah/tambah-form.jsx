import React from "react";

const TambahForm = ({
  label,
  className,
  name,
  id,
  type,
  value,
  onChange,
  defaultChecked,
}) => {
  let result;

  if (type === "checkbox") {
    result = (
      <>
        <input
          className={className}
          name={name}
          id={id}
          type={type}
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
        <label>{label}</label>
      </>
    );
  } else {
    result = (
      <>
        <label>{label}</label>
        <input
          className={className}
          name={name}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
        />
      </>
    );
  }
  
  return result;
};

export default TambahForm;
