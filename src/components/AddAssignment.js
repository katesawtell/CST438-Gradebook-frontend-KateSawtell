import React, { useState } from 'react';
import { SERVER_URL } from '../constants'; 

function AddAssignment(props) {
  const [assignment, setAssignment] = useState({
  name: '',
  dueDate: '',
  course:'',
  courseId: 0,
  });

  const saveAssignment = (e) => {
    setMessage('');
    console.log("Assignment.save");
    // Handle the submission, e.g., send the assignment data to an API or update a state variable.
      try {
        fetch(`${SERVER_URL}/assignment` ,
        {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(assignment)
        } )
        // Handle the response as needed (e.g., show a success message, redirect, etc.)
        console.log('Assignment added with ID:', response.data);
        alert('Assignment added successfully.');

        // Reset the form after a successful submission
        setAssignment({
        assignmentName: '',
        dueDate: '',
        courseTitle: '',
        courseId: 0,
      });
      } catch (error) {
      // Handle errors (e.g., show an error message to the user)
      console.error('Error adding assignment:', error);
      alert('Error adding assignment: ' + error.message);
      }
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
      <h3>Add New Assignment</h3>
      <button>
      <Link to={`/ListAssignment/`} >Home Page</Link>
      </button>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
        type="text"
        name="assignmentName"
        value={assignment.assignmentName}
        onChange={onChangeInput}
        />
      </div>
      <div>
        <label>Due Date:</label>
        <input
        type="date"
        name="dueDate"
        value={assignment.dueDate}
        onChange={onChangeInput}
        />
      </div>
      <div>
        <label>Course:</label>
        <textarea
        type="text"
        name="courseTitle"
        value={assignment.courseTitle}
        onChange={onChangeInput}
        />
      </div>
        <button id="add" type="button" margin="auto" onClick={saveAssignment}>Add Assignments</button>
    </form>
    </div>
    );
}


export default AddAssignment;

