import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import checkbox from "@assets/checkbox.svg";

interface ICheckboxListProps {
  isChecked: boolean; // Тип для isChecked
  onCheckboxChange: () => void; // Тип для onCheckboxChange
}

const CheckboxList: React.FC<ICheckboxListProps> = ({
  isChecked,
  onCheckboxChange,
}) => {
  return (
    <div className="">
      <Checkbox.Root
        className=" flex pt-1 justify-center w-[26px] h-[26px] rounded-[2px] hover:bg-purple transition-colors duration-200 ease-in-out border border-purple"
        checked={isChecked}
        onCheckedChange={onCheckboxChange}
        style={{
          backgroundColor: isChecked ? "#6C63FF" : "#fff",
        }}>
        <Checkbox.Indicator className="">
          <img src={checkbox} alt="" />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  );
};

export default CheckboxList;
