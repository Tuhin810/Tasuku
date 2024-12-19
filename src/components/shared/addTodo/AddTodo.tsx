import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import { TodoContext } from "../../../context/todoProvider";

const AddTodo = () => {
  const { addTodo } = useContext(TodoContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    links: "",
    calendarDate: "",
    images: [] as File[],
  });

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(e.target.files)],
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo({
      id: uuidv4(),
      title: formData.title,
      details: formData.details,
      links: formData.links.split(",").map((link) => link.trim()),
      calendarDate: new Date(formData.calendarDate),
      images: formData.images,
      complete: false,
      bookmark: false,
    });
    setFormData({
      title: "",
      details: "",
      links: "",
      calendarDate: "",
      images: [],
    });
    toggleDrawer();
  };

  return (
    <div>
      <button onClick={toggleDrawer} className="btn btn-neutral ">
        Add Todo
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
          isDrawerOpen ? "block" : "hidden"
        }`}
        onClick={toggleDrawer}
      ></div>
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-gray-800 shadow-lg z-50 transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Add New Todo</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Details</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Upload Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 left-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Links (comma-separated URLs)
              </label>
              <input
                type="text"
                name="links"
                value={formData.links}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Calendar Date
              </label>
              <input
                type="date"
                name="calendarDate"
                value={formData.calendarDate}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={toggleDrawer}
                className="btn btn-ghost mr-2"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Todo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
