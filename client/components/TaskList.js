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
        //bit of destructuring
        return this.props.data.tasks.map(({ title,id }) => {
            return (
                <li key={id} className="collection-item">
                    {title}
                    <i className="material-icons" onClick={() => this.onTaskDelete(id)}>delete</i>
                </li>
            );
        });
    }
    //display list of all tasks
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
            <div>
                
                <h3>These are the tasks I need to do today</h3>
                <ul className ="collection">
                    {this.renderTasks()}
                </ul>
                <Link to="/tasks/new"className="btn-floating btn-large red right">
                    add
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
