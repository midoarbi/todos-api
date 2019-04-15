import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { fetch } from "./store/actions/todos";
import { ListGroup, ListGroupItem } from "reactstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Button, ButtonGroup, Form, FormGroup, Label, Input } from "reactstrap";
class App extends Component {
  componentWillMount = () => {
    this.props.fetch();
  };
  state = { todos: [] };
  componentWillReceiveProps = nextProps => {
    console.log(nextProps);
    this.setState({ todos: nextProps.state.todos.todos });
  };
  filter = code => {
    let todos = [];
    switch (code) {
      case "Active":
        todos = this.props.state.todos.todos;
        todos = todos.filter(todo => {
          return todo.completed;
        });
        this.setState({ todos, rSelected: 2 });
        break;
      case "Done":
        todos = this.props.state.todos.todos;
        todos = todos.filter(todo => {
          return !todo.completed;
        });
        this.setState({ todos, rSelected: 3 });
        break;
      default:
        this.props.fetch();
        this.setState({ rSelected: 1 });
        break;
    }
  };
  toggleOne = (e,id) =>{
    e.preventDefault()
    let todos = this.props.state.todos.todos;
        todos = todos.map(todo => {
         if(todo.id===id){
           todo.completed= !todo.completed
           return todo
         }
         else{
           return todo
         }
        });
        this.setState({todos})
  }
  handleChange = e => {
    e.preventDefault();
    let searchString = e.target.value;
    let todos = this.props.state.todos.todos;
    todos = todos.filter(todo => {
      return todo.title.includes(searchString);
    });
    this.setState({ todos });
  };
  toggleAll  =()=>{
    let todos = this.state.todos
    todos = todos.map((todo)=>{
      todo.completed = !todo.completed
      return todo
    })
    this.setState({todos})
  }
  render() {
    console.log(this.state, "state");
    return (
      <div className="App">
        <div className="options">
          <div className="filters">
            Filters
            <ButtonGroup>
              <Button
                color="primary"
                onClick={() => this.filter("All")}
                active={this.state.rSelected === 1}
              >
                All
              </Button>
              <Button
                color="primary"
                onClick={() => this.filter("Active")}
                active={this.state.rSelected === 2}
              >
                Active{" "}
              </Button>
              <Button
                color="primary"
                onClick={() => this.filter("Done")}
                active={this.state.rSelected === 3}
              >
                Done
              </Button>
            </ButtonGroup>
          </div>
          <div >
          <Button
                color="primary"
                onClick={() => this.toggleAll()}
                
              >
              Toggle All
              </Button>
          </div>
          <div className="search">
            <FormGroup>
              <Input
                onChange={e => {
                  this.handleChange(e);
                }}
                type="text"
                n
                placeholder="Search"
              />
            </FormGroup>
          </div>
        </div>

        {this.state.todos.length > 0 ? (
          <ListGroup>
            {this.state.todos.map((todo, index) => {
              return (
                <ListGroupItem key={index}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {todo.title}
                    {todo.completed ? (
                      <IoIosCheckmarkCircleOutline size={25} color="green" />
                    ) : (
                      <IoIosCloseCircleOutline
                        size="25"
                        size={25}
                        color="red"
                      />
                    )}
                    <FormGroup check>
                      <Label check>
                        <Input onChange={(e)=>{
                            this.toggleOne(e,todo.id)
                        }} type="checkbox" defaultChecked={todo.completed} checked={todo.completed} /> Toggle Completed
                      </Label>
                    </FormGroup>
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        ) : null}
      </div>
    );
  }
}
function bindActions(dispatch) {
  return {
    fetch: () => {
      dispatch(fetch());
    }
  };
}

const mapStateToProps = (state, props) => {
  return {
    state
  };
};

export default connect(
  mapStateToProps,
  bindActions
)(App);
