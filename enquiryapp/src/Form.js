import { React, useReducer, useState } from "react";//useReducer-> For Fetching Form Data(Same Like Redux), useState( For Validations,Errors, SuccessMessages Handling)

import axios from "axios";//Used this for consuming the API


//Reducer that accepts State and Action and Updates Accordingly
const reducer = (state, action) => {
    switch (action.type) {
        case "FNAME":
            return { ...state, firstName: action.payload };
        case "LNAME":
            return { ...state, lastName: action.payload };
        case "EMAIL":
            if (!action.payload.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
                return { ...state, email: action.payload, emailError: "Invalid Email Id" };
            }
            else {
                return { ...state, email: action.payload, emailError: "" };
            }

        case "MESSAGE":
            return { ...state, message: action.payload };
        default:
            return state;
    }

}

//initial State Data
const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    emailError: ""

}
//functional Component Start
const Form = () => {

    const [state, disptach] = useReducer(reducer, initialState);// For accessing the form fields
    const [isError, setError] = useState(false);//For Setting the Form Error State
    const [response, setResponse] = useState("");//For Updating the Error/Success Response
    return (
        <div>
            <form style={{
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                width: "400px",
                marginTop: '20px',
                padding: '5px',
                border: '1px solid black'
            }}
                onSubmit={(e) => {
                    e.preventDefault();//Prevent the page reload
                    //check if all fields have data and valid email exists
                    if (state.firstName !== "" && state.lastName !== "" && state.email !== "" && state.message !=="" && state.emailError === "") {
                        //formating the form post request data;
                        let post_data = {
                            firstName: state.firstName,
                            lastName: state.lastName,
                            email: state.email,
                            message: state.message,
                        }

                        axios({
                            // Endpoint URL To be consumed
                            url: "http://localhost:1002/api/v1/contactUs",
                            method: "POST",
                            data: post_data,
                        })

                            // Handle the response from backend here
                            .then((res) => {
                                if (res.data.success === true) {
                                    setError(false);//set error to false
                                    setResponse(res.data.message);//set success data response
                                }
                                else {
                                    setError(true);//set error to true
                                    setResponse(res.data.message);//set failed data response
                                }
                            })

                            // Catch errors if any
                            .catch((err) => {
                                setError(true);//set error to true
                                setResponse("Something went wrong contact SolidCAD Support Team!!");//set the failed data response
                            });
                    }
                    else {
                        setError(true);//set error to true
                        setResponse("FirstName, LastName, Email and Message are requied cannot be blank")//set the failed data response
                    }
                }}

            >
                <img style={{ margin: "auto" }} alt="SolidCAD" src="https://www.solidcad.ca/wp-content/themes/solidcad/img/solidcad.png" />
                <h4>SolidCAD Variant Product Enquiry Form</h4>
                <label htmlFor="fname">First Name</label>
                <input maxLength="25" id="fname" required="true" onChange={(e) => { disptach({ type: "FNAME", payload: e.target.value }) }} type="text" name="fname" />
                <label htmlFor="fname">Last Name</label>
                <input maxLength="25" id="lname" required="true" onChange={(e) => { disptach({ type: "LNAME", payload: e.target.value }) }} type="text" name="lname" />
                <label htmlFor="email">Email</label>
                <input maxLength="50" id="emailId" required="true" variant="outlined"
                    onChange={(e) => { disptach({ type: "EMAIL", payload: e.target.value }) }} type="text" name="email" />
                <span id="emailError" style={{
                    fontWeight: 'bold',
                    fontSize: '10px',
                    color: 'red',
                }}>{state.emailError}</span>
                <label htmlFor="message">Message</label>
                <textarea required="true" maxLength="500" id="message" onChange={(e) => { disptach({ type: "MESSAGE", payload: e.target.value }) }} name="message" rows={5} cols={5} />
                <br />
                <button type="submit" id="formSubmit">Submit</button>
                <p>
                    <span id="response" style={{
                        fontWeight: 'bold',
                        color: isError === true ? 'red' : 'green',
                    }}>{response}</span>
                </p>
            </form>
        </div>

    )
}

export default Form;