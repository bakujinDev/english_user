import { forwardRef } from "react";

export const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className="customInput" onClick={onClick} ref={ref}>
    {value}
  </button>
));

export const CustomHeader = ({
  date,
  decreaseYear,
  increaseYear,
  prevYearButtonDisabled,
  nextYearButtonDisabled,
}) => (
  <div className="customHeader">
    <button onClick={decreaseYear} disabled={prevYearButtonDisabled}>
      {"<"}
    </button>
    {new Date(date).getFullYear()}
    <button onClick={increaseYear} disabled={nextYearButtonDisabled}>
      {">"}
    </button>
  </div>
);
