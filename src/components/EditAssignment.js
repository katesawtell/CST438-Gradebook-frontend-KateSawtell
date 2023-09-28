import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants'; 

function EditAssignment(props) {
  const [assignment, setAssignment] = useState({
    name: '',
    dueDate: '',
  });
  const [message, setMessage] = useState('');
  const assignmentId = props.match.params.id; 

  useEffect(() => {
    fetchAssignment();
  }, [assignmentId]); // Fetch assignment when the assignmentId changes

  const fetchAssignment = () => {
    setMessage('');
    console.log("fetchAssignment " + assignmentId);
    fetch(`${SERVER_URL}/assignment/${assignmentId}`)
      .then((response) => response.json())
      .then((data) => {
        setAssignment(data);
      })
      .catch((err) => {
        setMessage("Exception. " + err);
        console.error("fetch assignment error " + err);
      });
  };

  // Function to delete the assignment
  const deleteAssignment = () => {
    setMessage('');
    console.log("Assignment.delete");
    fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          // Redirect to a different page or perform any other action after successful deletion.
          setMessage("Assignment deleted.");
        } else {
          setMessage("Delete error. " + res.status);
          console.error('Delete Assignment error =' + res.status);
        }
      })
      .catch((err) => {
        setMessage("Exception. " + err);
        console.error('Delete assignment exception =' + err);
      });
  };

  // Function to save the assignment
  const saveAssignment = () => {
    setMessage('');
    console.log("Assignment.save");
    fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignment),
    })
      .then((res) => {
        if (res.ok) {
          fetchAssignment(); // Fetch the updated assignment data
          setMessage("Assignment saved.");
        } else {
          setMessage("Save error. " + res.status);
          console.error('Save Assignment error =' + res.status);
        }
      })
      .catch((err) => {
        setMessage("Exception. " + err);
        console.error('Save assignment exception =' + err);
      });
  };

  const onChangeInput = (e) => {
    setMessage('');
    const { name, value } = e.target;
    setAssignment({
      ...assignment,
      [name]: value,
    });
  };

  return (
    <div>
      <h3>Edit Assignment</h3>
      <button>
      <Link to={`/`} >Home Page</Link>
      </button>
      <div margin="auto">
        <h4 id="gmessage">{message}&nbsp;</h4>
        <table className="Center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="name"
                  value={assignment.name}
                  type="text"
                  onChange={onChangeInput}
                />
              </td>
              <td>
                <input
                  name="dueDate"
                  value={assignment.dueDate}
                  type="date"
                  onChange={onChangeInput}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <button type="button" onClick={saveAssignment}>
          Save Assignment
        </button>
        <button type="button" onClick={deleteAssignment}>
          Delete Assignment
        </button>
      </div>
    </div>
  );
}

export default EditAssignment;

