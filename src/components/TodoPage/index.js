import React, { Component } from "react";
import axios from "axios";

import { fetch } from "../../store/actions/todos";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,Label,Input
} from "reactstrap";
import { edit } from "../../store/actions/todos";
import { connect } from "react-redux";
import {Redirect } from 'react-router'
class TodoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  toggle=()=> {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentWillMount() {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/todos/${
          this.props.match.params.todo_id
        }`
      )
      .then(response => {
        this.setState({ todo: response.data });
      });
      this.props.fetch()
  }
  edit = () => {
      
    console.log(this.props,"todos before edit")
    let todos = this.props.state.todos.todos;
    let title = document.getElementById("title").value
    let completed  = document.getElementById("check").checked
    
    todos = todos.map((todo)=>{
        if(todo.id==this.state.todo.id){
                todo.title = title;
                todo.completed = completed;
                return todo;
        }
        else{
            return todo
        }
    })
    this.setState({modal:false,todo:{...this.state.todo,title,completed}})
  };
  delete = ()=>{
      this.setState({redirect:true})
  }
  render() {
    console.log(this.state);
    return (
      <div>
          
        {this.state.redirect?<Redirect t0={"/"}/>:null}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
         <ModalBody>
         <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input defaultValue={this.state.todo?this.state.todo.title:null} type="text"  id="title" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input defaultChecked={this.state.todo?this.state.todo.completed:null} id="check" type="checkbox" />{' '}
            Completed
          </Label>
        </FormGroup>
        <Button onClick = {()=>{this.edit()}}>Edit </Button>
         </ModalBody>
         
        </Modal>
        {this.state.todo ? (
          <ListGroup>
            <ListGroupItem>
              Title : {"  " + this.state.todo.title}
            </ListGroupItem>
            <ListGroupItem>
              Completed : {"  " + this.state.todo.completed}
            </ListGroupItem>
          </ListGroup>
        ) : null}
        <div style={{ margin: "30px" }}>
          <Button
            color="primary"
            onClick={() => {
                this.setState({ modal: true });
              }}
          >
            Edit
          </Button>{" "}
          <Button
            color="danger"
            onClick={() => {
              this.delete();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
}

TodoPage.propTypes = {};
function bindActions(dispatch) {
  return {
    edit: data => {
      dispatch(edit(data));
    },
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
)(TodoPage);
