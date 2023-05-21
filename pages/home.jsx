import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../src/main";
import toast from "react-hot-toast";
import TodoItem from "../components/todoItem";
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/tasks/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/tasks/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (e) {
        toast.error(e.response.data.message);
    }
  };
  const handleDelete = async (id) => {
    try {
        const { data } = await axios.delete(
          `${server}/tasks/${id}`,
          {
            withCredentials: true,
          }
        );
        toast.success(data.message);
        setRefresh((prev) => !prev);
      } catch (e) {
          toast.error(e.response.data.message);
      }
  };

  useEffect(() => {
    axios
      .get(`${server}/tasks/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

    if(!isAuthenticated) return <Navigate to={'/login'} />;
  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
