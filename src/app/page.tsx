"use client";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// Font Inter từ Next.js
const inter = Inter({ subsets: ["latin"] });

// Định nghĩa type cho Task
interface Task {
  name: string;
  points: number;
}

// Danh sách công việc cố định
const predefinedTasks: Task[] = [
  { name: "Play Sports", points: 1 },
  { name: "Wash Dishes", points: 1 },
  { name: "Team Meeting", points: 2 },
];

export default function Home() {
  // State với type rõ ràng
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Hàm xử lý khi thêm task
  const handleAddTask = (): void => {
    if (selectedTask) {
      const task = predefinedTasks.find((t) => t.name === selectedTask);
      if (task) {
        setTasks((prevTasks) => [...prevTasks, task]);
        setSelectedTask(""); // Reset dropdown
      }
    }
  };

  return (
    <div
      className={`${inter.className} min-h-screen bg-gray-100 p-8 flex flex-col items-center`}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">AI Photo Reward</h1>
      <div className="w-full max-w-2xl space-y-8">
        {/* Form chọn task */}
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <Select value={selectedTask} onValueChange={setSelectedTask}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a task" />
              </SelectTrigger>
              <SelectContent>
                {predefinedTasks.map((task) => (
                  <SelectItem key={task.name} value={task.name}>
                    {task.name} (+{task.points} pts)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddTask} className="shrink-0">
              Add Task
            </Button>
          </div>
        </div>

        {/* Bảng hiển thị danh sách task */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Task Name</TableHead>
              <TableHead className="text-left">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.points}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-gray-500">
                  No tasks added yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
