// src/pages/TodoApp.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import Card from "../components/card";
import Button from "../components/button";
import Input from "../components/input";
import TodoItem from "../components/TodoItem";
import { motion, AnimatePresence } from "framer-motion";

interface Todo {
  _id: string;
  title: string;
  body: string;
}

const TodoApp: React.FC = () => {
  const { email } = useUser();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = "https://backend-2-bnn9.onrender.com/api/v2";

  const fetchTodos = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/gettask`, {
        params: { email },
      });
      setTodos(res.data.list || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, [email]);

  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post(`${API_BASE}/addtask`, {
        email,
        title,
        body,
      });
      setTodos((prev) => [...prev, res.data.list]);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTodo = async (id: string, newTitle: string, newBody: string) => {
    try {
      const res = await axios.put(`${API_BASE}/updatetask/${id}`, {
        title: newTitle,
        body: newBody,
        email,
      });
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? res.data.list : todo))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/deletetask/${id}`, { data: { email } });
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <Card className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <motion.h1
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Todo App
          </motion.h1>
          <Link to="/dashboard">
            <Button className="bg-green-500 hover:bg-green-600">Dashboard</Button>
          </Link>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Task Description"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button onClick={addTodo} className="w-full">
            Add Task
          </Button>
        </div>

        <div className="mt-8">
          {loading ? (
            <p className="text-gray-500">Loading tasks...</p>
          ) : (
            <AnimatePresence>
              {todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  id={todo._id}
                  title={todo.title}
                  body={todo.body}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TodoApp;
