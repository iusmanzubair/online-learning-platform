import { LogIn } from "lucide-react";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between my-6">
      <ul className="flex items-center gap-4">
        <a href="/">Home</a>
        <a href="/courses">Courses</a>
      </ul>
      {token ? (
        <button className="py-2 px-4 bg-black text-white rounded-lg" onClick={handleLogout}>Logout</button>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <a
            className="flex items-center gap-1 py-2 px-4 bg-black text-white rounded-lg"
            href="/student-login"
          >
            Student
            <LogIn className="w-5 h-5" />
          </a>
          <a
            className="flex items-center gap-1 py-2 px-4 bg-black text-white rounded-lg"
            href="/instructor-login"
          >
            Instructor
            <LogIn className="w-5 h-5" />
          </a>
        </div>
      )}
    </nav>
  );
};
