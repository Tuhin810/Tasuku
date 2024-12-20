import TodoList from "../../components/main/homeComponents/todoList/TodoList";
import VideoList from "../../components/main/homeComponents/videoList/VideoList";

const Home = () => {
  return (
    <div className="h-screen px-5 overflow-hidden">
      <div className="md:flex items-start mt-4 ">
        <TodoList />
        <VideoList />
      </div>
    </div>
  );
};

export default Home;
