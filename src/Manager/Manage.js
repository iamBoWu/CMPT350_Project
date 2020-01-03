import React, {Component} from 'react';
import AddItem from "./AddItem"
import DeleteItem from "./DeleteItem"
class Manage extends Component {
    render() {
        return (
            <div>
                <AddItem/>
                <br/>
                <br/>
                <br/>
                <br/>
                <DeleteItem/>
            </div>
        );
    }
}

export default Manage;