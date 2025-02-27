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
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

// Định nghĩa type cho Task
interface Task {
  name: string;
  points: number;
}

// Định nghĩa type cho Result (sẽ mở rộng sau khi có AI)
interface Result {
  message: string;
}

// Danh sách công việc cố định
const predefinedTasks: Task[] = [
  { name: "Play soccer", points: 1 },
  { name: "Play badminton", points: 1 },
  { name: "Wash Dishes", points: 1 },
];

export default function Home() {
  // State cho task selection
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // State cho photo upload
  const [photo, setPhoto] = useState<string | null>(null);

  // State cho result
  const [result, setResult] = useState<Result | null>(null);

  // Hàm xử lý thêm task
  const handleAddTask = (): void => {
    if (selectedTask) {
      const task = predefinedTasks.find((t) => t.name === selectedTask);
      if (task) {
        setTasks((prevTasks) => [...prevTasks, task]);
        setSelectedTask("");
      }
    }
  };

  // Hàm xử lý upload ảnh
  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setPhoto(photoURL);
      setResult({ message: "Processing..." });
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

        {/* Upload ảnh */}
        <div className="space-y-4">
          <label
            htmlFor="photo-upload"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Photo Proof
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {photo && (
            <div className="mt-4">
              <Image
                src={photo}
                alt="Uploaded photo preview"
                width={300}
                height={300}
                className="rounded-md object-cover"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Result</h2>
          <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
            {result ? (
              <p className="text-gray-700">{result.message}</p>
            ) : (
              <p className="text-gray-500">Upload a photo to see the result</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
