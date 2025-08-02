import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "./button";
import Input from "./input";

interface TodoItemProps {
  id: string;
  title: string;
  body: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newTitle: string, newBody: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, body, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(body);

  const handleUpdate = () => {
    if (!newTitle.trim()) return;
    onUpdate(id, newTitle, newBody);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-gradient-to-r from-pink-500 to-yellow-500 p-4 rounded-lg shadow mb-4 text-white"
    >
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Edit title"
          />
          <Input
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            placeholder="Edit description"
          />
          <div className="flex justify-end gap-2">
            <Button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600">
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)} className="bg-gray-400 hover:bg-gray-500">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-700">{body}</p>
          <div className="flex justify-end mt-4 gap-2">
            <Button onClick={() => setIsEditing(true)} className="bg-yellow-500 hover:bg-yellow-600">
              Edit
            </Button>
            <Button onClick={() => onDelete(id)} className="bg-red-500 hover:bg-red-600">
              Delete
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TodoItem;
