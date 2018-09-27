import React, {Component} from 'react';
import {graphql} from 'react-apollo'
import fetchTask from '../queries/fetchTask';
import {Link} from 'react-router';

class Task extends Component {


    render(){
        /** this defines which task it is by destructuring the task object */
        const {task} =this.props.data

        if (!task) {return <div>...loading</div>}

        return(
            <div className="center-align">
            <h3>{task.title}</h3>
                <Link to="/" className="btn-floating btn-large red right">
                   Back 
                </Link>
            </div>

        )
    }
}
/**this is so ugly */

export default graphql(fetchTask, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(Task);
