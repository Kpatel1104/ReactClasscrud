import React, { Component } from "react";
import "./index.css";
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        languages: [],
        gender: "",
        city: "",
      },
      isEdit: false,
      editIndex: null,
      users: [],
    };
  }
  componentDidMount() {
    this.setState({ users: JSON.parse(localStorage.getItem("users")) || [] });
    localStorage.setItem("users", JSON.stringify(this.state.users));
  }
  componentDidUpdate() {
    localStorage.setItem("users", JSON.stringify(this.state.users));
  }
  id = null;
  handlechange = (e) => {
    let { name } = e.target;
    let value = e.target.value;
    if (name == "lang") {
      if (e.target.checked) {
        this.state.user.languages.push(value);
        this.setState({ user: { ...this.state.user, [name]: value } });
      } else {
        let a = this.state.user.languages.indexOf(e.target.value);
        this.state.user.languages.splice(a, 1);
        this.setState({ user: { ...this.state.user, [name]: value } });
      }
    } else {
      this.setState({ user: { ...this.state.user, [name]: value } });
    }
  };
  handleEdit = (item, index) => {
    console.log("e", index);
    this.setState({ editIndex: index });
    this.setState({
      user: {
        ...this.state.user,
        name: item?.name,
        email: item?.email,
        password: item?.password,
        languages: item?.languages,
        gender: item?.gender,
        city: item?.city,
        editIndex: index,
      },
    });
  };
  handleDelete = (index) => {
    // const { users } = this.state.users;
    const updatedUsers = [...this.state.users];
    updatedUsers.splice(index, 1);
    this.setState({ users: updatedUsers });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
  handleSubmitValue = (e) => {
    console.log("suers", this.state.users);
    e.preventDefault();
    if (this.state.editIndex === null || this.state.editIndex == undefined) {
      let users = [...this.state.users, this.state.user];
      this.setState({ users: [...users] });
      this.setState({ editIndex: null });
      localStorage.setItem("users", JSON.stringify(this.state.users));
    } else {
      this.state.users[this.state.editIndex] = this.state.user;
      this.setState({ users: [...this.state.users] });
      console.log("update", this.state.users);
      this.setState({ editIndex: null });
      localStorage.setItem("users", JSON.stringify(this.state.users));
    }
    this.setState({
      user: {
        name: "",
        email: "",
        password: "",
        languages: [],
        gender: "",
        city: "",
      },
    });
    const { name, email, password, languages, gender, city } = this.state.user;
    const newUser = { name, email, password, languages, gender, city };
    console.log("new User", newUser);
    this.setState({
      user: {
        name: "",
        email: "",
        password: "",
        languages: [],
        gender: "",
        city: "",
      },
    });
  };
  render() {
    return (
      <>
        <form className="fromdata">
          <div className="containar"><br/>
            <h2>Registation Form</h2>
            Name :
            <input
              type="text"
              name="name"
              onChange={(e) => {
                this.handlechange(e);
              }}
              value={this.state.user.name}
              required
            />
            <br />
            <br />
            Email :
            <input
              type="email"
              name="email"
              onChange={(e) => {
                this.handlechange(e);
              }}
              value={this.state.user.email}
            />
            <br />
            <br />
            Pass :
            <input
              type="password"
              name="password"
              onChange={(e) => {
                this.handlechange(e);
              }}
              value={this.state.user.password}
            />
            <br />
            <br />
            Languages :<br/>
            <input
              type="checkbox"
              name="lang"
              value="JAVA"
              onChange={(e) => {
                this.handlechange(e);
              }}
              checked={this.state.user.languages.includes("JAVA")}
            />
            JAVA
            <input
              type="checkbox"
              name="lang"
              value="HTML"
              onChange={(e) => {
                this.handlechange(e);
              }}
              checked={this.state.user.languages.includes("HTML")}
            />
            HTML
            <input
              type="checkbox"
              name="lang"
              value="CSS"
              onChange={(e) => {
                this.handlechange(e);
              }}
              checked={this.state.user.languages.includes("CSS")}
            />
            CSS
            <input
              type="checkbox"
              name="lang"
              value="REACTJS"
              onChange={(e) => {
                this.handlechange(e);
              }}
              checked={this.state.user.languages.includes("REACTJS")}
            />
            REACTJS
            <br />
            <br />
            Gender :
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={(e) => {
                this.handlechange(e);
              }}
              checked={this.state.user.gender == "Female"}
            />
            Female
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={(e) => {
                this.handlechange(e);
              }}
              checked={this.state.user.gender == "Male"}
            />
            Male
            <br />
            <br />
            <select
              name="city"
              value={this.state.user.city}
              onChange={(e) => {
                this.handlechange(e);
              }}
            >
              <option> </option>
              <option>Surat</option>
              <option>Ahmedabad</option>
              <option>Rajkot</option>
              <option>Valsad</option>
              <option>Navsari</option>
            </select>
            <br />
            <br />
            <button
              style={{ border: "1px Solid" }}
              onClick={(e) => this.handleSubmitValue(e)}
            >
              Submit
            </button>
          </div>
        </form><br/><br/>
        <div>
          <table className="tabledata">
            <thead className="t1">
              <tr>
                <th>Name</th>
                <th>Email Id</th>
                <th>Password</th>
                <th>Gender</th>
                <th>Languages</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users &&
                this.state.users.length > 0 &&
                this.state.users.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.gender}</td>
                    <td>{item.languages}</td>
                    <td>{item.city}</td>
                    <td>
                      <button onClick={(e) => this.handleEdit(item, index)}>
                        Edit
                      </button>
                      <button onClick={(e) => this.handleDelete(e, index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default Registration;
