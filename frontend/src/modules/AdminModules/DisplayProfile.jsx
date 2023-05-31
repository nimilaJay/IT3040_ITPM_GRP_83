import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default class DisplayReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      executive: {}
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/executive/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          executive: res.data.executive
        });

        console.log(this.state.executive);
      }
    });
  }

  generatePDF = () => {
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#reportContent"), {
      callback: function(doc) {
        doc.save("executive report.pdf");
      }
    });
  };

  render() {
    const {
      exeno,
      name,
      position,
      email,
      contact,
      gender,
      dob
    } = this.state.executive;
    return (
      <div
        id="reportContent"
        style={{ marginTop: "20px", padding: "25px", paddingRight: "25px" }}
      >
        <div className="row">
          <h4 className="col-10">Details of {name}</h4>
          <button
            type="primary"
            className="btn btn-warning text-light col-2 float-right"
            onClick={this.generatePDF}
          >
            Generate PDF
          </button>
        </div>
        <hr />
        <dl className="row1">
          <dt className="col-sm-3">Position</dt>
          <dd className="col-sm-9">{position}</dd>

          <dt className="col-sm-3">Email Address</dt>
          <dd className="col-sm-9">{email}</dd>
          <dt className="col-sm-3">Contact Number</dt>
          <dd className="col-sm-9">{contact}</dd>
          <dt className="col-sm-3">Gender</dt>
          <dd className="col-sm-9">{gender}</dd>
          <dt className="col-sm-3">Date of Birth</dt>
          <dd className="col-sm-9">{dob}</dd>
        </dl>
      </div>
    );
  }
}
