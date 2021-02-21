import React, { useState } from "react";
import {initial, isEmpty} from 'lodash';
import shortid from 'shortid';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const addTask = (e) => {
    e.preventDefault();
    if(isEmpty(task)){
      console.log("Task empty");
      return;
    }
    console.log("Ok");

    const newTask = {
      id: shortid.generate(),
      name: task,
    }

    setTasks([...tasks, newTask]);

    setTask("");
  }
  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center">Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-lg-8 border border-dark order-2 order-lg-1">
          <h4 className="text-center my-3">Lista de tareas</h4>
          <ul className="list-group">
            {
              tasks.map((task)=>(
                <li className="list-group-item" key={task.id}>
                  <span>{task.name}</span>
                  <button className="btn btn-danger btn-sm float-right mx-2">
                    Eliminar
                  </button>
                  <button className="btn btn-warning btn-sm float-right">
                    Editar
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-lg-4 border border-dark order-1 order-lg-2">
          <h4 className="text-center my-3">Formulario</h4>
          <form onSubmit={addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea"
              onChange={(text) =>setTask(text.target.value)}
              value={task}
            ></input>
            <button type="submit" className="btn btn-dark btn-block my-3">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
