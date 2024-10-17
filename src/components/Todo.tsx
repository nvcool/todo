import React, { useState, useEffect } from "react";
import lupa from "@assets/lupa.svg";
import SelectAll from "./ui/SelectAll";
import detective from "@assets/detective.png";
import moon from "@assets/moon.svg";
import NewNoteModal from "./NewNoteModal";
import CheckboxList from "./ui/CheckboxList";
import EditIcon from "./ui/EditIcon";
import DeleteIcon from "./ui/DeleteIcon";
import plus from "@assets/plus.svg";

export const Todo: React.FC = () => {
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<{
    text: string;
    index: number;
  } | null>(null);
  const [notes, setNotes] = useState<string[]>(() => {
    // Загружаем заметки из localStorage
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    // Сохраняем заметки в localStorage при каждом изменении
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("checkedStates", JSON.stringify(checkedStates));
  }, [notes, checkedStates]);

  const [filter, setFilter] = useState<"all" | "complete" | "incomplete">(
    "all"
  ); // Состояние фильтра

  const handleCheckboxChange = (index: number) => {
    const newStates = [...checkedStates];
    newStates[index] = !newStates[index];
    setCheckedStates(newStates);
  };

  const handleAddNote = (text: string) => {
    setNotes((prev) => [...prev, text]); // Добавляем новую заметку
    setCheckedStates((prev) => [...prev, false]); // Добавляем состояние для нового чекбокса
  };

  const handleEditNote = (text: string) => {
    if (currentNote) {
      setNotes((prev) => {
        const newNotes = [...prev];
        newNotes[currentNote.index] = text;
        return newNotes;
      });
    }
  };

  const handleDeleteNote = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index)); // Удаляем заметку
    setCheckedStates((prev) => prev.filter((_, i) => i !== index)); // Удаляем состояние чекбокса
  };

  const handleFilterChange = (newFilter: "all" | "complete" | "incomplete") => {
    setFilter(newFilter);
  };

  // Фильтруем заметки в зависимости от состояния фильтра
  const filteredNotes = notes.filter((note, index) => {
    if (filter === "complete") return checkedStates[index];
    if (filter === "incomplete") return !checkedStates[index];
    return true; // "all"
  });

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkTheme");
    return savedTheme === "true"; // возвращает true или false
  });
  useEffect(() => {
    localStorage.setItem("isDarkTheme", isDarkTheme.toString());
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme"; // Применяем классы к body
  }, [isDarkTheme]);

  return (
    <div className={`${isDarkTheme ? "bg-black" : "#FFFFFF"}`}>
      <div className="pt-10 flex flex-col justify-center items-center container relative mx-auto">
        <h1 className="uppercase font-medium text-2xl mb-[18px]">todo list</h1>
        <div className="flex gap-4 mb-[30px]">
          <div className="relative">
            <input
              placeholder="Search note..."
              className="text-purple rounded-[5px] border border-purple py-[10px] px-4 w-[563px] focus:outline-none focus:ring-2 transition duration-200 ease-in-out"
              type="text"
            />
            <img className="absolute right-4 top-[10px]" src={lupa} alt="" />
          </div>
          <SelectAll onChange={handleFilterChange} />
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="bg-purple hover:bg-darkPurple p-2 rounded-[5px] transition duration-200 ease-in-out">
            <img src={moon} alt="" />
          </button>
        </div>
        {filteredNotes.length === 0 ? ( // Проверяем, есть ли заметки
          <div className="grid gap-5 justify-items-center relative">
            <img src={detective} alt="" />
            <span className="text-black text-xl">Empty...</span>
          </div>
        ) : (
          <ul>
            {filteredNotes.map((note) => {
              const originalIndex = notes.indexOf(note); // Получаем оригинальный индекс заметки
              return (
                <li
                  key={originalIndex}
                  className="flex border-b border-b-purple border-opacity-50 py-2 items-center pb-5">
                  <CheckboxList
                    isChecked={checkedStates[originalIndex]} // Используйте оригинальный индекс
                    onCheckboxChange={() => handleCheckboxChange(originalIndex)} // И здесь
                  />
                  <span
                    className={`uppercase font-medium w-[420px] ml-4 mr-2 transition duration-200 ${
                      checkedStates[originalIndex]
                        ? "line-through opacity-60"
                        : "text-black"
                    }`}>
                    {note}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="text-grey hover:text-purple focus:text-purple"
                      onClick={() => {
                        setCurrentNote({ text: note, index: originalIndex });
                        setIsModalOpen(true);
                      }}>
                      <EditIcon />
                    </button>
                    <button
                      className="text-grey hover:text-red focus:text-red"
                      onClick={() => handleDeleteNote(originalIndex)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <button
          className="bg-purple hover:bg-darkPurple p-2 rounded-[50%] transition duration-200 ease-in-out fixed right-[28%]
          bottom-[5%]"
          onClick={() => {
            setCurrentNote(null); // Сбросить текущее состояние заметки
            setIsModalOpen(true); // Открыть модалку
          }}>
          <img src={plus} alt="Add Note" />
        </button>
        <NewNoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddNote={handleAddNote}
          onEditNote={handleEditNote}
          currentNote={currentNote}
        />
      </div>
    </div>
  );
};
