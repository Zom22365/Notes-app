import React, { useState } from "react";
import Icon from "../remove.png";

const Sidebar = () => {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")));
  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState({
    write: "1",
    preview: "0",
  });
  const [note, setNote] = useState({
    title: notes[0].title,
    body: notes[0].body,
  });

  const taskCurrent = (e) => {
    notes.splice(current, 1, note);
    setNotes(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
    setCurrent(e.target.id);
    setNote(notes[e.target.id]);
  };

  const titles = notes.map((note, index) => {
    if (note.title === "") {
      return (
        <>
          <div
            className={`note ${Number(current) === index ? "active" : ""} `}
            id={index}
            onClick={taskCurrent}
          >
            Note {`${index + 1}`}
          </div>
        </>
      );
    }
    return (
      <>
        <div
          className={`note ${Number(current) === index ? "active" : ""} `}
          id={index}
          onClick={taskCurrent}
        >
          {note.title}
        </div>
      </>
    );
  });

  const addTask = () => {
    const task = {
      title: "",
      body: "",
    };
    notes.push(task);
    setCurrent(notes.length - 1);
    setNote(notes[notes.length - 1]);
    setNotes(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleClick = (e) => {
    for (let i in active) {
      active[i] = "0";
    }
    setActive({
      ...active,
      [e.target.id]: "1",
    });
  };

  return (
    <div className="page">
      <div className="sidebar">
        <div className="sidebar__header">
          Notes{" "}
          <button className="sidebar__add" onClick={addTask}>
            +
          </button>
        </div>
        <div className="sidebar__notes">{titles}</div>
      </div>

      <div className="main">
        <header className="header">
          <button
            onClick={handleClick}
            id="write"
            className={`btn__status ${
              active.write === "1" ? "btn__active" : ""
            } `}
          >
            Write
          </button>
          <button
            onClick={handleClick}
            id="preview"
            className={`btn__status ${
              active.preview === "1" ? "btn__active" : ""
            } `}
          >
            Preview
          </button>
        </header>

        <div className="block__editor">
          <h2 className="editor__title">
            Title:
            <input
              className="input__title"
              type="text"
              name="title"
              placeholder="Enter"
              value={note.title}
              onChange={handleChange}
            />
          </h2>
          <textarea
            className="textarea__content"
            name="body"
            value={note.body}
            placeholder="Enter"
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
