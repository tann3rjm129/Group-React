import React from 'react';
import "./Donate.css";
import API from "./../utils/API";
import { Link } from "react-router-dom";


class Donate extends React.Component {

  state = {
    users: {},
    name: "",
    projectName: '',
    githubLink: "",
    email: "",
    synopsis: "",
    image1: "",
    image2: "",
    image3: "",
    donationGoal: "",
    reasonForDonation: '',
    donationUsedFor: '',
    donationCurrent: '',
    donationAdded: 0,
    text: ''
  };


  componentDidMount() {
    // console.log("~~~~compoenet mounted~~~~")
    this.getUser(); // match.params.user to get the id
  }

  getUser = () => { // recieve user id as parameter
    // console.log("~~~~getuser CLIENT was called~~~~")

    API.getUser(this.props.match.params.id)
      .then(res => this.setState({
        users: res.data
      }))

      .catch(err => console.log(err));

  };

  // Put on Post project page to simplify post route code
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    // Do this later for text
    // let text = this.setState.text.trim();
    // let donationAdded = this.donationAdded.trim();
    let donationAdded = (parseInt(this.state.users.donationCurrent) + parseInt(this.state.donationAdded));
    if (!donationAdded) {
      return alert("No donation recognized in the form! Please enter a numerical donation.");
    }
    API.updateDonation(this.props.match.params.id, { donationCurrent: donationAdded })
      .then(res => this.setState({
        users: res.data
      }))
      .catch(err => console.log(err))

    this.setState({ donationAdded: '', text: '' });
  };

  // API.updateDonation({
  //   id: this.props.match.params.id,
  //   data: {
  //     donationCurrent: add + this.state.users.donationCurrent
  //   }
  // })
  //   .then(res => {
  //     console.log(res);
  //     console.log(res.data);
  //   })
  //   .catch(err => console.log(err));


  render() {
    return (
      <div>
        {/* Jumbotron */}
        <div className="jumbotron text-center Jumbo-height">
          <div className="row">
            <div className="col-md-12">
              <h1 className="h1-reponsive mb-3 font">
                <br />
                <strong>Fund this Project:</strong>
              </h1>

              <div className="row">
                <h3 className="h1-reponsive mb-3 font">
                  <strong>{this.state.users.name}</strong>
                </h3>
                <br />
                <p className="h1-reponsive mb-3 font">
                  <strong>Project Name Small Summary: </strong>{this.state.users.synopsis}
                </p>

                <div className="row col-md-3">
                  <p><strong>Donation Goal:</strong> {this.state.users.donationGoal}</p>
                </div>
                <div className="col-md-3">
                  <p><strong>Current Donation Level: </strong>{this.state.users.donationCurrent}</p>
                </div>

                <div className="col-md-3">
                  <p><strong>Reason wanting donation: </strong>{this.state.users.reasonForDonation}</p>
                </div>
                <div className="col-md-3">
                  <p><strong>Donation used for: </strong>{this.state.users.donationUsedFor}</p>
                </div>

                <form onSubmit={this.handleFormSubmit}>
                  <label htmlFor="defaultFormContactNameEx" class="grey-text">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="donationAdded"
                    value={this.state.donationAdded}
                    onChange={this.handleInputChange}
                    id="defaultFormContactNameEx"
                    className="form-control"
                  />

                  <br />

                  <label htmlFor="defaultFormContactEmailEx" class="grey-text">
                    Paypal or CC #
                  </label>
                  <input
                    type="text"
                    name="text"
                    value={this.state.text}
                    onChange={this.handleInputChange}
                    id="defaultFormContactEmailEx"
                    className="form-control"
                  />

                  <div className="text-center mt-4">

                    {/* disabled={!(this.state.author && this.state.title)} set requirments for fields */}
                    <button class="btn btn-primary-post" type="submit" value="Post"
                    >
                      {/* <Link to="/thankyou"> */}
                      Fund
                      {/* </Link> */}
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Donate;
