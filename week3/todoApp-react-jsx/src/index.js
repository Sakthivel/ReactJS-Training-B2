import ReactDom from 'react-dom';
import React, {Fragment} from 'react';

const todoList = [
    "Complete Assignment on time",
    "Start ReactJS with JSX",
    "Todo list creation with JSX"
];

let inputElement = null;

const ListItems = ({items}) => <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;

const AddItems = () => {
        return (<form onSubmit={addItem}>
            <input type="text" className="form-control" placeholder="Add Item" ref={node => inputElement = node}/>
            <input type="submit" className="btn btn-primary" />
        </form>);
    }

const addItem = e => {
    e.preventDefault();
    const newItem = inputElement.value;
    if (newItem == '') {
        return false
    }
    inputElement.value = "";
    todoList.push(newItem);
    render();
}

const render = () => {
    ReactDom.render(
        <Fragment>
        <AddItems />
        <ListItems items={todoList} />
        </Fragment>,
        document.getElementById('root')
    );
}

//Render Method to show list on page load
render();

/*
// Concept 3
// ---------
const App = (props) => <ul>
        {props.items.map(i => <li>{i}</li>)}
    </ul>

ReactDom.render(
    <App items={todoList}/>,
    document.getElementById('root')
);
*/

/*
// Concept 2
// ---------
const app = <ul>
        {todoList.map(i => <li>{i}</li>)}
    </ul>
ReactDom.render(app, document.getElementById('root'));
*/

/*
// Concept 1
// ---------
const todoItems = todoList.map(i => <li>{i}</li>);

const app = <ul>
        {todoItems}
    </ul>
ReactDom.render(app, document.getElementById('root'));
*/
