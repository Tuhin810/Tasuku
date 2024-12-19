import Navbar from "../../components/shared/navbar/Navbar";
import TodoList from "../../components/main/homeComponents/todoList/TodoList";
import VideoList from "../../components/main/homeComponents/videoList/VideoList";

const Home = () => {
  return (
    <div className="h-screen px-5 ">
      <Navbar />
      <div className="md:flex items-start mt-4">
        <TodoList />
        <VideoList />
      </div>
    </div>
  );
};

export default Home;
