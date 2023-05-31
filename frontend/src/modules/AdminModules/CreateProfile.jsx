import React, { Component } from "react";
import axios from "axios";
import "./Review.css";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

export default class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exeno: "",
      name: "",
      email: "",
      contact: "",
      position: "",
      gender: "",
      dob: "",
      executive: [],
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get(`http://localhost:5000/checkexeno`).then((res) => {
      if (res.data.success) {
        this.setState({
          executive: res.data.exeno,
        });

        if (res.data.exeno.length === 0) {
          this.setState({ exeno: 2000 });
        } else {
          const maxExeno = Math.max(...res.data.exeno.map((e) => e.exeno));
          this.setState({ exeno: maxExeno + 1 });
        }
      }
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { exeno, name, email, contact, position, gender, dob } = this.state;

    const data = {
      exeno: exeno,
      name: name,
      email: email,
      contact: contact,
      position: position,
      gender: gender,
      dob: dob,
    };

    axios.post("http://localhost:5000/executive/save", data).then((res) => {
      if (res.data.success) {
        toast.success("Details saved successfully");
        this.setState({
          exeno: "",
          name: "",
          email: "",
          contact: "",
          position: "",
          gender: "",
          dob: "",
        });
        this.props.history.push("/profilepage");
      } else {
        toast.error("Error saving details");
      }
    });
  };

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1>User Executive Management | Add Executive Details</h1>
        <form className="need-validation" noValidate onSubmit={this.onSubmit}>
          <h2>Executive Details</h2>
          <hr></hr>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter full name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Position</label>
            <select
              defaultValue={"Manager"}
              className="form-select"
              onChange={this.handleInputChange}
              name="position"
              required
            >
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="Partner">Partner</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <br />

          <h2>Personal Details</h2>
          <hr></hr>

          <div class="d-flex justify-content-between">
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <div className="form-group " style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />
                <span id="errorMessageEmail" style={{ color: "red" }}></span>
              </div>
              <div className="form-group " style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact"
                  placeholder="Enter Contact Number"
                  value={this.state.contact}
                  onChange={this.handleInputChange}
                  required
                />
                <span id="errorMessageContact" style={{ color: "red" }}></span>
              </div>
              <label style={{ marginBottom: "5px" }}>Gender</label>
              <select
                defaultValue={"Male"}
                className="form-select"
                aria-label="Default select example"
                onChange={this.handleInputChange}
                name="gender"
                required
              >
                <option value="Male" disabled>
                  Male
                </option>
                <option name="male">Male</option>
                <option name="female">Female</option>
              </select>
              <span id="errorMessageName" style={{ color: "red" }}></span>
            </div>

            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            ></div>
          </div>
          <div>
            {/* <label style={{ marginBottom: "5px" }}>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              placeholder="Enter Date of Birth"
              value={this.state.dob}
              onChange={this.handleInputChange}
              required
            /> */}
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              placeholder="Date of Birth"
              name="dob"
              onChange={this.handleInputChange}
              max={moment().format("YYYY-MM-DD")}
            />

            <span id="errorMessageName" style={{ color: "red" }}></span>
          </div>

          <br />

          <div class="d-flex justify-content-center">
            <button
              className="btn btn-info"
              type="submit"
              style={{ backgroundColor: "#1687A7" }}
              onClick={this.onSubmit}
            >
              &nbsp;&nbsp;Save&nbsp;&nbsp;
            </button>{" "}
            &nbsp;&nbsp;
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
            <button className="btn btn-danger" type="cancel">
              <a href="/profilepage" style={{ textDecoration: "none" }}>
                Cancel
              </a>
            </button>
          </div>
          <div />
        </form>

        <br />
      </div>
    );
  }
}
