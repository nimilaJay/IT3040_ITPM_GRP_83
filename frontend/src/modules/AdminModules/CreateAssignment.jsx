import React, { Component } from "react";
import axios from "axios";
import "./CreateAssignment.css";
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify"; // Imports for toastify
import "react-toastify/dist/ReactToastify.css"; // Imports for toastify

export default class CreateAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment_name: "",
      client_no: "",
      execid: "",
      place_of_engagement: "",
      distance: "",
      date_of_allocation: "",
      deadline: "",
      emp_no: "",
      staff: [],
      redirectToReferrer: false
    };
  }
  //retrieve details
  componentDidMount() {
    this.retrievePosts();
  }
  //retrieve function
  retrievePosts() {
    axios.get("http://localhost:5000/staff/ass").then(res => {
      if (res.data.success) {
        this.setState({
          staff: res.data.staff
        });
        console.log(this.state.staff);
      }
    });
  }
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };
  //staff status check function
  onCheck = name => {
    console.log(name);
    axios.get(`http://localhost:5000/checkassigned/${name}`).then(res => {
      if (res.data.success) {
        alert("Employee is Assigned to " + res.data.l + " Assignment/s!");
      }
    });
  };
  //validation for fields
  validate = () => {
    let empnoError = "";
    let nameError = "";
    let clientError = "";
    let execidError = "";

    if (!this.state.assignment_name) {
      nameError = "*";
    }

    if (!this.state.client_no) {
      clientError = "*";
    }

    if (!this.state.execid) {
      execidError = "*";
    }

    if (!this.state.emp_no) {
      empnoError = "*";
    }

    if (clientError || nameError || empnoError || execidError) {
      this.setState({
        clientError,
        nameError,
        empnoError,
        execidError
      });
      toast.warn("Invalid Form Data. Please Check All the Fields!!!");
      return false;
    }
    return true;
  };
  //insert function of assignment
  onSubmit = e => {
    e.preventDefault();

    const {
      assignment_name,
      client_no,
      execid,
      place_of_engagement,
      distance,
      date_of_allocation,
      deadline,
      emp_no
    } = this.state;

    console.log(emp_no);
    const data = {
      assignment_name: assignment_name,
      client_no: client_no,
      execid: execid,
      place_of_engagement: place_of_engagement,
      distance: distance,
      date_of_allocation: date_of_allocation,
      deadline: deadline,
      emp_no: emp_no,
      progress: "Assigned"
    };
    const isValid = this.validate();
    if (isValid) {
      axios.get(`http://localhost:5000/staff/check/${emp_no}`).then(res => {
        if (res.data.success) {
          if (res.data.staffs.length !== 0) {
            axios
              .post("http://localhost:5000/assignments/save/", data)
              .then(res => {
                if (res.data.success) {
                  this.setState({
                    assignment_name: assignment_name,
                    client_no: client_no,
                    execid: execid,
                    place_of_engagement: place_of_engagement,
                    distance: distance,
                    date_of_allocation: date_of_allocation,
                    deadline: deadline,
                    emp_no: "",
                    redirectToReferrer: true
                  });
                  alert(
                    "Employee added to assignment, Enter employee numbers to add more employees!"
                  );
                }
              });
          } else {
            toast.warn("Invalid Employee Number, Please enter again!");
          }
        }
      });
    }
  };
  //demo button
  demo = e => {
    e.preventDefault();
    this.setState({
      assignment_name: "Assignment6",
      client_no: "CL005",
      execid: "DOO2",
      place_of_engagement: "Kandy",
      distance: "70",
      date_of_allocation: "2021-10-10",
      deadline: "2021-10-15"
    });
  };
  //search filter
  filterData(staff, searchKey) {
    console.log(searchKey);
    const result = staff.filter(staff =>
      staff.name.toLowerCase().includes(searchKey)
    );
    this.setState({ staff: result });
  }
  //search function
  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/staff/ass").then(res => {
      if (res.data.success) {
        this.filterData(res.data.staff, searchKey);
      }
    });
  };
  render() {
    return (
      <div className="container">
        <div class="main3">
          <h1 class="head1c">Work Allocation | Create Assignment</h1>
          <hr class="line1c"></hr>
          <div class="main33">
            <form>
              <p class="ic">Assignment Name: </p>
              <input
                type="text"
                class="icc"
                id="assignment_name"
                name="assignment_name"
                value={this.state.assignment_name}
                onChange={this.handleInputChange}
                required
              />
              <p class="iic">Client No: </p>
              <input
                type="text"
                class="iicc"
                id="client_no"
                name="client_no"
                value={this.state.client_no}
                onChange={this.handleInputChange}
                required
              />
              <p class="iiic">Executive ID: </p>
              <input
                type="text"
                class="iiicc"
                id="execid"
                name="execid"
                value={this.state.execid}
                onChange={this.handleInputChange}
                required
              />
              <p class="ivc">Location: </p>
              <input
                type="text"
                class="ivcc"
                id="place_of_engagement"
                name="place_of_engagement"
                value={this.state.place_of_engagement}
                onChange={this.handleInputChange}
                required
              />
              <p class="vc">Distance(km): </p>
              <input
                type="number"
                class="vcc"
                id="distance"
                name="distance"
                value={this.state.distance}
                onChange={this.handleInputChange}
                required
              />
              <p class="vic">Date Allocating: </p>
              <input
                type="date"
                class="vicc"
                id="date_of_allocation"
                name="date_of_allocation"
                value={this.state.date_of_allocation}
                onChange={this.handleInputChange}
                required
              />
              <p class="viic">Deadline: </p>
              <input
                type="date"
                class="viicc"
                id="deadline"
                name="deadline"
                value={this.state.deadline}
                onChange={this.handleInputChange}
                required
              />
              <div class="staff">
                <center>
                  <h4>Click on staff to check status</h4>
                  <input
                    type="text"
                    placeholder="Search Name"
                    name="searchQuery"
                    onChange={this.handleSearchArea}
                  />
                  {"\n"}
                  <ul>
                    {this.state.staff.map((staff, index) => (
                      <li style={{ backgroundColor: "#c4c4c4" }}>
                        {" "}
                        <strong>Emp No-</strong>
                        {staff.empno}
                        {"\t"} <strong>Name-</strong>
                        {staff.name}
                        {"\t"}
                        <a
                          href="#"
                          onClick={() => this.onCheck(staff.empno)}
                          style={{
                            backgroundColor: "#1687a7",
                            paddingRight: "5px",
                            color: "white"
                          }}
                        >
                          Check
                        </a>
                      </li>
                    ))}
                  </ul>
                </center>
              </div>
              <p class="viiic">Employee No(Staff): </p>
              <p class="ix">
                (Enter Employee numbers and save employees one by one, click
                Done after assigning all)
              </p>

              <input
                type="text"
                class="viiicc"
                id="emp_no"
                name="emp_no"
                value={this.state.emp_no}
                onChange={this.handleInputChange}
              />
              <center>
                <button
                  className="btn btn-success"
                  type="submit"
                  style={{ marginTop: "795px", width: "20%" }}
                  onClick={this.onSubmit}
                >
                  <i className="fas fa-save"></i>&nbsp;Save
                </button>
              </center>
            </form>
            <br />
            <center>
              <a href="/allassignments">
                <button className="btn btn-secondary" style={{ width: "20%" }}>
                  Done
                </button>
              </a>
              <br />
              <br />
              <br />
              <button type="button" class="btn btn-warning" onClick={this.demo}>
                Demo
              </button>
            </center>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"dark"}
          type="success"
        />
      </div>
    );
  }
}
