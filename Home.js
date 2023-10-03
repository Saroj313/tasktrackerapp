import { useState,useEffect } from "react";
import "./Home.css";
import axios from 'axios';

function Home() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [table, setTable] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      // If in edit mode, update the existing item
      const updatedTable = [...table];
      updatedTable[editIndex] = input;
      setTable(updatedTable);
      setEdit(false);
      setEditIndex(null);
    } else {
      // If not in edit mode, add a new item
      setTable([...table, input]);
    }

    setInput({
      title: "",
      description: "",
      status: "",
    });
  };

  const handleDelete = (index) => {
    const filteredData = table.filter((_, i) => i !== index);
    setTable(filteredData);
  };

  const handleEdit = (index) => {
    const editData = table[index];
    setInput({ ...editData });
    setEdit(true);
    setEditIndex(index);
  };

   // Fetch tasks from the server
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTable(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1 id="Crud">Task Tracker App</h1>
        <div className="Action">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="title">Title</label><br />
              <input
                placeholder="title"
                name="title"
                value={input.title}
                onChange={handleChange}
                style={{ width: '90%', padding: '10px', height: '30px' ,marginTop:'10px'}}
              />
            </div>
            <div>
              <label className="description">Description</label><br />
              <textarea
                placeholder="description"
                name="description"
                value={input.description}
                onChange={handleChange}
                style={{ width: '90%', padding: '10px', height: '60px',marginTop:'10px' }}
              />
            </div>
            <div>
              <label className="status">Task Status ("InProgress" OR "Completed")</label><br />
              <input
                placeholder="status"
                name="status"
                value={input.status}
                onChange={handleChange}
                style={{ width: '90%', padding: '10px', height: '30px',marginTop:'10px' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button className='Button'type="submit" style={{ width: '150px', padding: '15px', fontSize: '16px',background:'skyblue',borderRadius:'6px' }}>
                {edit ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ paddingRight: '120px' }}>Title</th>
                <th style={{ paddingRight: '120px' }}>Description</th>
                <th style={{ paddingRight: '120px' }}>Status</th>
                <th style={{ paddingRight: '120px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {table.map((item, i) => (
                <tr key={i}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>
                    <button onClick={() => handleEdit(i)}
                     style={{
                      background: 'green',
                      color: 'white',
                      padding: '10px',
                      margin: '5px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    >Edit</button>
                    <button onClick={() => handleDelete(i)}
                     style={{
                      background: 'red',
                      color: 'white',
                      padding: '10px',
                      margin: '15px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    >Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
