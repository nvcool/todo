import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";

interface NewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (text: string) => void;
  onEditNote: (text: string) => void;
  currentNote: { text: string; index: number } | null;
}

const NewNoteModal: React.FC<NewNoteModalProps> = ({
  isOpen,
  onClose,
  onAddNote,
  onEditNote,
  currentNote,
}) => {
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (currentNote) {
      setNoteText(currentNote.text);
    } else {
      setNoteText("");
    }
  }, [currentNote]);

  const handleApply = () => {
    if (currentNote) {
      onEditNote(noteText);
    } else {
      onAddNote(noteText);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black bg-opacity-70" />
        <Dialog.Content className="fixed bg-white top-[118px] left-1/2 py-[18px] px-[30px] -translate-x-1/2 h-[289px] mx-auto rounded-[16px]">
          <Dialog.Title className="uppercase text-2xl font-medium text-center mb-[25px]">
            New Note
          </Dialog.Title>
          <input
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиш
            placeholder="Input your note..."
            className="text-purple rounded-[5px] border border-purple py-[10px] px-4 w-[440px] focus:outline-none focus:ring-2 transition duration-200 ease-in-out"
            type="text"
          />
          <button
            onClick={handleApply}
            className="uppercase py-[10px] px-[22px] rounded-[5px] bg-purple hover:bg-darkPurple text-white absolute bottom-[18px] right-[30px] transition duration-200 ease-in-out">
            <span>apply</span>
          </button>
          <Dialog.Close asChild>
            <button className="text-purple rounded-[5px] border border-purple uppercase py-[10px] px-[22px] hover:bg-purple hover:bg-opacity-20 absolute left-[30px] bottom-[18px] transition duration-200 ease-in-out">
              <span>cancel</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewNoteModal;
