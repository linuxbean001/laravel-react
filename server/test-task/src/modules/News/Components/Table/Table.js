import React, { Component } from 'react'

export default class Table extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <tr>
      <td>{this.props.obj.firstName}</td>
      <td>{this.props.obj.lastName}</td>
      <td>{this.props.obj.cell}</td>
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
