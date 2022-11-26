import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "react-bootstrap/Form";
import CustomButton from "./Components/Button";
import axios from 'axios';
import List from './Components/List';
function App() {
  const [listData, setList] = useState([]);
  const [todo, setTodo] = useState({
    Name: '',
    description: '',
    status: false
  });

  const [error, setError] = useState({
    Name: false,
    description: false
  });

  const getData = async () => {
    try {
      const data = await axios.get('http://localhost:4000/todo');
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    (async () => {
      const data = await getData();
      setList(data);
    })();

  }, [listData]);

  const onChangeName = (e) => {
    setError((prev) => ({
      ...prev,
      Name: false
    }))

    setTodo((prev) => ({
      ...prev,
      Name: e.target.value
    }));

  }

  const onChangeDes = (e) => {

    setError((prev) => ({
      ...prev,
      description: false
    }))

    setTodo((prev) => ({
      ...prev,
      description: e.target.value
    }));

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (todo.Name == "" && todo.description == "") {
      return setError({
        description: true,
        Name: true
      })
    }
    else if (todo.Name == "") {
      return setError((prev) => ({
        ...prev,
        Name: true
      }))
    }
    else if (todo.description == "") {
      return setError((prev) => ({
        ...prev,
        description: true
      }))
    }
    else {
      try {
        const data = await axios.post('http://localhost:4000/todo', todo);
        console.log(data);
        setTodo({
          Name: '',
          description: '',
          status: false
        })
      } catch (error) {
        console.log('error', error);
      }
    }
  }
  return (
    <div className="container border todo-container">
      <div className="row">
        <h1 className="text-center ">My Todo's</h1>
        <div className="container-form rounded">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 mt-3">
              <Form.Group className="mt-4" controlId="formBasicEmail">
                <Form.Control type="name" placeholder="Enter email" onChange={onChangeName} />
                {error.Name && <Form.Text className="text-muted">
                  Name is Required
                </Form.Text>}
              </Form.Group>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 mt-3">
              <Form.Group controlId="formBasicEmail">

                <Form.Control className="mt-4" type="description" placeholder="Enter email" onChange={onChangeDes} />
                {error.description && <Form.Text className="text-muted">
                  Description is Required
                </Form.Text>}
              </Form.Group>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 text-center mt-3">
              <CustomButton size='lg' variant='warning' className="mt-4 text-center" onClick={onSubmit}> Add Todo</CustomButton>
            </div>
          </div>
        </div>
      </div>
      <div className="todo-list-container">
        {
          listData.map((item, index)=>{
            return <List item = {item} />
          })
        }
      </div>
      <br />
    </div>
  );
}

export default App;
