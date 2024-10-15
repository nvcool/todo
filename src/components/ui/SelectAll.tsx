import React from "react";
import * as Select from "@radix-ui/react-select";
import selectArrow from "@assets/select-arrow.svg";

// Определяем типы для элементов
type ItemValues = "all" | "complete" | "incomplete";
const items: Record<string, ItemValues> = {
  All: "all",
  Complete: "complete",
  Incomplete: "incomplete",
};

const SelectAll: React.FC = () => {
  const [value, setValue] = React.useState<string>("all"); // Устанавливаем значение как string
  const [open, setOpen] = React.useState(false); // Состояние для отслеживания открытия

  return (
    <Select.Root value={value} onValueChange={setValue} onOpenChange={setOpen}>
      <Select.Trigger className="flex w-36 justify-between items-center bg-purple p-[10px] rounded-[5px] text-white uppercase outline-none ">
        <Select.Value aria-label={value}>
          {Object.keys(items).find(
            (key) => items[key as keyof typeof items] === value
          ) || "Select an option"}
        </Select.Value>
        <img
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
          src={selectArrow}
          alt=""
        />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="border border-purple text-purple rounded-[5px]"
          position="popper">
          <Select.Viewport className="grid w-36 ">
            {Object.entries(items).map(([label, value]) => (
              <Select.Item
                key={value}
                value={value}
                className=" outline-none cursor-pointer hover:bg-purple hover:bg-opacity-20 py-1 px-[6px]">
                <span>{label}</span>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectAll;
