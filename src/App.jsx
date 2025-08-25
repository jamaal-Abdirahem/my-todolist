import { SquareCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([
    { id: "1", text: "Learn about useState", completed: true },
    { id: "2", text: "Build a To-Do List App", completed: false },
    { id: "3", text: "Share my progress", completed: false },
  ]);

  // ✅ Add new todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;
    const newTodo = {
      id: Date.now().toString(),
      text: inputText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputText("");
  };

  // ✅ Toggle complete
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ✅ Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ✅ Handle drag end
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(todos);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    setTodos(reordered);
  };
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "white",
          backgroundImage: `
       linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
       linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
       radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
     `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      />

      <div className="relative z-10">
        <header className="max-w-2xl mx-auto mt-4 rounded-2xl px-6 py-7 shadow-xl bg-gradient-to-b from-pink-200 to-amber-100 opacity-90 [clip-path:polygon(0_0,40%_0,40%_10px,60%_10px,60%_0,100%_0,100%_100%,0_100%)]">
          <h2 className="text-center text-4xl font-bold font-Orbitron uppercase text-gray-900">
            Todolist
          </h2>
        </header>

        {/* Form */}
        <div
          className="max-w-2xl mx-auto mt-4 rounded-md px-6 py-7 shadow-xl"
          style={{
            backgroundImage: `linear-gradient(180deg, #f2d3f8 0%, #f4e8df 100%)`,
            opacity: 1,
            mixBlendMode: "multiply",
          }}
        >
          <form
            onSubmit={handleAddTodo}
            className="flex items-center justify-between gap-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="EXAMPLE | WAKE UP"
              className="flex-1 text-lg text-gray-700 px-5 py-2 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-2 rounded-lg font-semibold text-white shadow-md hover:scale-105 hover:shadow-lg active:scale-95 transition-transform duration-200 cursor-pointer"
            >
              ADD
            </button>
          </form>
        </div>

        {/* Todo List with Drag & Drop */}
        <div className="max-w-2xl mx-auto mt-4 rounded-2xl px-6 py-7 shadow-xl bg-gradient-to-b from-yellow-100 to-pink-100">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col gap-3"
                >
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm"
                        >
                          <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => toggleTodo(todo.id)}
                          >
                            <SquareCheck
                              className={
                                todo.completed
                                  ? "text-green-500"
                                  : "text-gray-400"
                              }
                            />
                            <span
                              className={
                                todo.completed
                                  ? "line-through text-gray-500"
                                  : "text-gray-800"
                              }
                            >
                              {todo.text}
                            </span>
                          </div>
                          <Trash2
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
