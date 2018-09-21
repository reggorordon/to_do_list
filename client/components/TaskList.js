import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import { Link } from 'react-router'
import query from '../queries/fetchTasks'


class TaskList extends Component {

    //calls mutation to delete tasks
    onTaskDelete(id){
        this.props.mutate({ variables: { id } }).then(() => this.props.data.refetch())
    };

    renderTasks() {
        //bit of destructuring( still need to look this up)
        return this.props.data.tasks.map(({ title,id }) => {
            return (
                <li key={id} className="collection-item">
                    {title}
                    <i className="material-icons" onClick={() => this.onTaskDelete(id)}>delete</i>
                </li>
            );
        });
    }
    //display list of all tasks. using the loading  case prevents errors
    render() {
        if (this.props.data.loading) {
            return (
                <div>
                    ...loading
                </div>
            )
        }
        return (
            // the LINK comes from react Router and is pretty cool
            <div className="center-align">
                
                <h4>These are the tasks I need to do today:</h4>
                <h5 >{new Date().toDateString()} </h5> 
                <ul className ="collection">
                    {this.renderTasks()}
                </ul>
                <Link to="/tasks/new"className="btn-floating btn-large red right">
                    <i className ="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

//this needs to be created on the server
const mutation = gql`
mutation deleteTask($id:ID){
  deleteTask(id:$id){
    id
  }
}
`;


export default graphql(mutation)
            (graphql(query)(TaskList)); 
