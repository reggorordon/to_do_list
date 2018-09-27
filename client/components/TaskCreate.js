import React, {Component} from 'react';
//allow multi page communication using react router
import{Link, hashHistory} from 'react-router';
//wire in middleware to allow communication with backend
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
//call and name the grapohql query from the folder
import query from '../queries/fetchTasks';


class TaskCreate extends Component {
    //set initial state of input
    constructor(props){
        super(props);
        this.state={title:''}
    }

//what to do onSubmit here
    onSubmit(){
        //prevent it doing what it normally does( not sure why need to look that up)
        event.preventDefault();
        //create a mutation based on the mutation on the server 
        this.props.mutate({
            variables:{ 
                title: this.state.title,    
            }, 
            refetchQueries:[{query}],})
            .then(()=>hashHistory.push('/'));
        }

    render (){
        return(
            /**steps: 
            onChange pushes the change to the form ( sort of)
            onSubmit pushes the data to the DB
            */
            <div>
            <br/>
            <br/>
            <div className="center-align">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label> <h4>Enter the task you need to complete:</h4></label>
                    <input
                        onChange={event => this.setState({ title: event.target.value })}
                        value={this.state.title}
                    />
                        <input type="submit" className="btn-floating btn-large green type right" />
                        <Link to="/" className="btn-floating btn-large red left">
                            BACK
                </Link>
                </form>
                </div>
            <div>

            </div >
        </div>
        )
    }
}

// define mutation here ( actual name of mutation doesnt mean much but facilitates tracking)
const mutation = gql `
mutation AddTask($title:String){
    addTask(title:$title){
        title
    }
}
`;

export default  graphql(mutation)(TaskCreate);