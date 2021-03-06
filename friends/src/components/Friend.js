import React, { Component } from 'react';
import axios from 'axios';
import FriendCard from './FriendCard'
import {Link} from 'react-router-dom'

export default class Friend extends Component {
    constructor(props){
        super(props);
        this.state = {
            friend: [],     
            newName: '',
            newAge: null,
            newEmail: ''           
        };
    }

    componentDidUpdate() {
        const id = this.props.match.params.id;
        this.fetchFriend(id);
    }

    fetchFriend = id => {
        axios   
            .get(`http://localhost:5000/friends/${id}`)
            .then(response => {
                this.setState(() => ({ friend: response.data }));
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleName = e =>{
        this.setState({newName: e.target.value})
    }

    handleAge = e =>{
        this.setState({newAge: e.target.value})
    }

    handleEmail = e =>{
        this.setState({newEmail: e.target.value})
    }

    handleEdit = (event) => {    
        event.preventDefault();
        
        const id = this.props.match.params.id;
    
        const updatedFriend = {
          name: this.state.newName,
          age: this.state.newAge,
          email: this.state.newEmail
        }
    
        axios.put(`http://localhost:5000/friends/${id}`, updatedFriend)
        .then(response => {
          this.setState({
            friends: response.data
          })
        })
        .catch((err) => console.log(err))
    }

    handleDelete = (event) => {    
        event.preventDefault();
        
        const id = this.props.match.params.id;        

        axios.delete(`http://localhost:5000/friends/${id}`)
        .then(response => {
            this.setState({
            friends: response.data
            })
        })
        .catch((err) => console.log(err))
    }  

    render(){
        if(!this.state.friend){
            return <div>Friend is not here right now.</div>
        }
        return(
            <div className="friend">
                <FriendCard friend = {this.state.friend}/>
                <Link to = "/"><button>Add Friend</button></Link>
                <form className="edit">
                    <span>Name:</span>
                    <input onChange = {this.handleName} value = {this.state.name} />
                    <span>Age:</span>
                    <input onChange = {this.handleAge} value = {this.state.age} />
                    <span>Email:</span>
                    <input onChange = {this.handleEmail} value = {this.state.email} />
                    <div className="">
                        <button onClick = {this.handleEdit}>Edit Friend</button>
                        <button onClick = {this.handleDelete}>Delete Friend</button>
                    </div>
                    
                </form> 
            </div>
        )
    }
}