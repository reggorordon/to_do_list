import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class BreakdownCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { content:''}
    }
    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables:{
                content: this.state.content,
                taskId:this.props.taskId
            }
        }).then(() => this.setState({content:''}));
    }
render (){

    return(
        <div className= "">
            <form onSubmit={this.onSubmit.bind(this)}>
                <label> <p>Steps to follow</p></label>
                <input
                    onChange={event => this.setState({ content: event.target.value })}
                    value={this.state.content}
                />
            </form>
            </div>
        

    );
}
}

const mutation= gql `
mutation AddBreakdownToTask($content:String, $taskId: ID) {
    addBreakdownToTask(content:$content, taskId: $taskId) {
        id
        breakdowns {
            id
            content
            likes
        }
    }
}
`
;
export default graphql(mutation)(BreakdownCreate);