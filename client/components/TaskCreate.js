import React, {Component} from 'react';
import{Link, hashHistory} from 'react-router';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import query from '../queries/fetchTasks';


class TaskCreate extends Component {
    //set initial state of input

    constructor(props){
        super(props);
        this.state={title:''}
    }

//what to do onSubmit
    onSubmit(){
        //prevent it doing what it normally does
        event.preventDefault();
        //create a mutation based on what was already prepared
        this.props.mutate({
            variables:{ title: this.state.title}, 
            refetchQueries:[{query}],})
            .then(()=>hashHistory.push('/'));
        }

    render (){
        return(
            //steps: 
            // onChange pushes the change to the form ( sort of)
            //onSubmit pushes the data to the db

        <div>
            <form onSubmit={this.onSubmit.bind(this)}>
                    <label> <h4>Enter the task you need to complete:</h4></label>
                    <input
                        onChange={event => this.setState({ title: event.target.value })}
                        value={this.state.title}
                    />

            </form>
              {/* <Link
                    to="/"
                    className="btn-floating btn-large green right"
              > Home</Link> */}
        </div>
        )
    }
}

// define mutation here ( actual name doesnt mean much but facilitates tracking)
const mutation = gql `
mutation AddTask($title:String){
    addTask(title:$title){
        title
    }
}
`;



export default  graphql(mutation)(TaskCreate);