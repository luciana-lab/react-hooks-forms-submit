import React, { useState } from "react";

function Form() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Henry");

  // We don't have a server to send our data to, but to demonstrate submission, we could modify our Form component to list out submissions, storing them in state:
  const [submittedData, setSubmittedData] = useState([])

  // add state for holding error messages
  const [errors, setErrors] = useState([])

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault() // prevent the browser to refresh the page 

    // validating inputs. First Name is required
    if (firstName.length > 0) {
      // putting together the current form data into an object using the values stored in state.
      const formData = {
        firstName: firstName,
        lastName: lastName
      }

      // A form, when submitted should send the form data somewhere
      // think of sendFormDataSomewhere() as the code that handles sending our data off
      // This function might be defined in the same form component, or can be passed down as a prop.
      // props.sendFormDataSomewhere(formData)
      const dataArray = [...submittedData, formData]
      setSubmittedData(dataArray)

      // if we want to clear the input fields, all we need to do is set state! 
      setFirstName("")
      setLastName("")
      setErrors([])
    } else {
      setErrors(["First name is required!"])
    }
  }

  const listOfSubmissions = submittedData.map((data, index) => {
    return (
      <div key={index}>
        {data.firstName} {data.lastName}
      </div>
    )
  })

  // whenever the form is submitted (by pressing the Enter or Return key in an input field, or clicking a Submit button), a callback function will be called, handleSubmit
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleFirstNameChange} value={firstName} />
        <input type="text" onChange={handleLastNameChange} value={lastName} />
        <button type="submit">Submit</button>
      </form>
      {/* consitionally render error messages */}
      {errors.length > 0 ? errors.map((error, index) => (
        <p key={index} style={{ color: "red" }}>{error}</p>
      )) : null}
      <h3>Submissions</h3>
      {listOfSubmissions}
    </div>
  )
}

export default Form;
