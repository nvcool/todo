import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import checkbox from "@assets/checkbox.svg";

interface ICheckboxListProps {
  isChecked: boolean; // Тип для isChecked
  onCheckboxChange: () => void; // Тип для onCheckboxChange
  isDarkTheme: boolean; // Новый пропс для темной темы
}

const CheckboxList: React.FC<ICheckboxListProps> = ({
  isChecked,
  onCheckboxChange,
  isDarkTheme,
}) => {
  return (
    <div className="">
      <Checkbox.Root
        className="flex pt-1 justify-center w-[26px] h-[26px] rounded-[2px] transition-colors duration-200 ease-in-out border border-purple"
        checked={isChecked}
        onCheckedChange={onCheckboxChange}
        style={{
          backgroundColor: isChecked
            ? "#6C63FF"
            : isDarkTheme
            ? "#252525"
            : "#fff", // Темный фон для чекбокса
        }}>
        <Checkbox.Indicator className="">
          <img src={checkbox} alt="" />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  );
};

export default CheckboxList;
