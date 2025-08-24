import { SquareCheck, Trash2 } from "lucide-react";

const tasks = [
  { id: 1, tasksValue: "Wake up early", completed: true },
  { id: 2, tasksValue: "Exercise", completed: false },
  { id: 3, tasksValue: "Study React", completed: false },
];

export default function App() {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "white",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />

      <div className="relative z-10">
        <header
          className="max-w-2xl mx-auto mt-4 rounded-2xl px-6 py-7 shadow-xl [clip-path:polygon(0_0,40%_0,40%_10px,60%_10px,60%_0,100%_0,100%_100%,0_100%)]"
          style={{
            backgroundImage: `linear-gradient(180deg, #f2d3d9 0%, #f4e8df 100%)`,
            opacity: 0.9,
            mixBlendMode: "multiply",
          }}
        >
          <h2 className="text-center text-4xl font-bold uppercase text-gray-900">
            Todolist
          </h2>
        </header>

        <div
          className="max-w-2xl mx-auto mt-4 rounded-2xl px-6 py-7 shadow-xl"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 70% 20%, rgba(168, 85, 247, 0.5), transparent 90%),
              radial-gradient(ellipse 65% 55% at 60% 65%, rgba(251, 191, 36, 0.35), transparent 90%),
              radial-gradient(ellipse 60% 50% at 50% 50%, rgba(56, 189, 248, 0.35), transparent 90%),
              linear-gradient(180deg, #fdf2d5 0%, #f3e8df 100%)
            `,
          }}
        >
          <ul className="flex flex-col gap-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-2 rounded bg-white shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <SquareCheck
                    className={
                      task.completed ? "text-green-500" : "text-gray-400"
                    }
                  />
                  <span>{task.tasksValue}</span>
                </div>
                <Trash2 className="text-red-500 cursor-pointer" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
