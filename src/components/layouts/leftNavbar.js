import React from 'react'
import '../../css/header.css';
export class Navbar extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-default navbar-primary" style={{ backgroundColor: "#33344a", borderColor: "#33344a", width: "60px", height: "100%" }}>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Link 1</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link 2</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link 3</a>
          </li>
        </ul>
      </nav>
    )
  }
}
