import React from "react";
import {nanoid} from "nanoid"

function App() {

  const [tarea, setTarea] = React.useState('')
  const [listaTareas, setListaTareas] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState(null)
  const [error, setError] = React.useState(false)

  const agregarTarea = ((e)=> {
    e.preventDefault()

    if(!tarea.trim()) {
      console.log('campo vacio')
      setError(true)
      return
    }

    console.log('tarea agregada')

    setListaTareas([
      ...listaTareas, {
        nombreTarea: tarea,
        id: nanoid(5)
      }
    ])

    setTarea('')
    setError(false)

  })

  const eliminarTarea = ((id)=>{
    const arrayFiltrado = listaTareas.filter(item => item.id !== id)
    setListaTareas(arrayFiltrado)
  })

  const habilitarModoEdicion = ((item)=>{
    setId(item.id)
    setTarea(item.nombreTarea)
    setModoEdicion(true)
  })

  const editarTarea = ((e)=>{
    e.preventDefault()

    if(!tarea.trim()) {
      console.log('campo vacio')
      setError(true)
      return
    }

    const arrayEditado = listaTareas.map(item => item.id === id ? {id: id, nombreTarea: tarea} : item)
    setListaTareas(arrayEditado)

    setTarea('')
    setId('')
    setModoEdicion(false)
    setError(false)

  })

  return (
    <div className="App">
      <div className="container mt-3">
        <h1 className="text-center">CRUD</h1>
        <hr />
        <div className="row">
          <div className="col-8">
            <h2 className="text-center">Lista de tareas</h2>
            <ul className="list-group">
              {
                listaTareas.length > 0 ? (
                  listaTareas.map(item => (
                    <li key={item.id} className="list-group-item">
                      {item.nombreTarea}
                      <button onClick={()=>habilitarModoEdicion(item)} className="btn btn-warning btn-sm float-end">Editar</button>
                      <button onClick={()=>eliminarTarea(item.id)} className="btn btn-danger btn-sm float-end mx-2">Eliminar</button>
                    </li>
                  ))
                ) : (
                  <span className="text-center">No hay tareas ingresadas</span>
                )
              }
            </ul>
          </div>
          <div className="col-4">
            <h2 className="text-center">
              {
                modoEdicion ? 'Formulario de edicion' : 'Formulario de tareas'
              }
            </h2>
            <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
              {
                error ? (
                  <span className="text-danger">Campo vacio</span>
                ) : null
              }
              <input onChange={(e)=>setTarea(e.target.value)} value={tarea} className="form-control" placeholder="Ingrese tarea" type="text" />
              {
                modoEdicion ? (
                  <button type="submit" className="btn btn-warning mt-2 w-100">Editar</button>
                ) : (
                  <button type="submit" className="btn btn-primary mt-2 w-100">
                    Ingresar
                  </button>
                )
              }
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
