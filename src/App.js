import React, { useState, useEffect } from "react";
import { isEmpty, size } from 'lodash';
import { addDocument, getCollection, updateDocument, deleteDocument } from "./actions";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] =  useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  useEffect(()=>{
    (async() => {
      const result = await getCollection("tasks");
      if(result.statusResponse){
        setTasks(result.data);
      }
    })()
  }, []);

  const validForm = () => {
    let isValid = true;
    setError(null);
    if(isEmpty(task)){
      setError("Debes ingresar una tarea");
      isValid = false;
    }
    return isValid;
  }

  //Agregar tarea
  const addTask = async (e) => {
    e.preventDefault();

    if(!validForm()){
      return;
    }
    
    const result = await addDocument("tasks", {name: task });
    if(!result.statusResponse){
      setError(result.error);
      return;
    }

    setTasks([...tasks, {id: result.data.id, name: task}]);
    setTask("");

  }

  //Eliminar tareas
  const deleteTask = async(id) => {
    const result = await deleteDocument("tasks", id);
    if(!result.statusResponse){
      setError(result.error);
      return;
    }
    const filteredtask = tasks.filter(task => task.id !== id);
    setTasks(filteredtask);
  }

  
  //Editar tareas
  const editTask = (theTask) =>{
    setTask(theTask.name);
    setEditMode(true);
    setId(theTask.id);
  }

  const saveTask = async(e) => {
    e.preventDefault();
    if(isEmpty(task)){
      console.log("Task empty");
      return;
    }

    const result = await updateDocument("tasks", id, {name: task});
    if(!result.statusResponse){
      setError = result.error;
      return;
    }

    const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item);
    setTasks(editedTasks);
    setEditMode(false);
    setTask("");
    setId("");

  }

  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center">Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-lg-8 border border-dark order-2 order-lg-1">
          <h4 className="text-center my-3">Lista de tareas</h4>
          {
          size(tasks)==0 ? (
            <li className="list-group-item">Aún no hay tareas</li>
          ) : (
            <ul className="list-group">
            {
              tasks.map((task)=>(
                <li className="list-group-item" key={task.id}>
                  <span>{task.name}</span>
                  <button 
                  className="btn btn-danger btn-sm float-right mx-2"
                  onClick = {() => deleteTask(task.id)}
                  >
                    Eliminar
                  </button>
                  <button 
                  className="btn btn-warning btn-sm float-right"
                  onClick = {() => editTask(task)}
                  >
                    Editar
                  </button>
                </li>
              ))
            }
          </ul>
          )
          
          }
        </div>
        <div className="col-lg-4 border border-dark order-1 order-lg-2">
          <h4 className="text-center my-3">{editMode ? "Modificar tarea" : "Agregar tarea"}</h4>
          <form onSubmit={ editMode ? saveTask : addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea"
              onChange={(text) =>setTask(text.target.value)}
              value={task}
            >
            </input>
            {
              error && <span className="text-danger my-2">{error}</span>
            }
            <button 
            type="submit" 
            className={editMode ? "btn btn-success btn-block my-3" :"btn btn-dark btn-block my-3"}
            >
              {editMode ? "Guardar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
