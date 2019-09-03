import React, { Component } from 'react'

export default class Table extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <tr>
      <td>{this.props.obj.name}</td>
      <td>{this.props.obj.password}</td>
      <td>{this.props.obj.contact}</td>
      <td>
         <button type="submit" className="btn btn-primary">Edit</button>
      </td>
      <td>
        <button type="submit" className="btn btn-danger">Delete</button>
      </td>
    </tr>
    )
  }
}
