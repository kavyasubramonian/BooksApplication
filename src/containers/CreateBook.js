import React, { Component } from 'react';
import { createBook } from '../actions/book.actions';
import { connect } from 'react-redux';
import './CreateBook.css';

class CreateBook extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            title: '',
            author: '',
            year: '',
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onAdd(this.state);
    }

    handleOnValueChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleReset(e){
        e.preventDefault();
        this.setState({
            title: '',
            author: '',
            year: '',
        });
    }

    componentWillMount(){
        const props = this.props;
        if(props.location && props.location.state){
            const book=props.location.state.book;
            this.setState({
                id: book.id,
                title: book.title,
                author: book.author,
                year: book.year,
            });
        }
    }

    render(){
        return(
            <div className="create-book">
                {this.props.error?
                <div className="alert alert-danger" role={alert}>
                    {this.props.error.message}
                </div>
                : ''
                }
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            name="title"
                            value={this.state.title}
                            placeholder="Enter Title"
                            onChange={this.handleOnValueChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            name="author"
                            value={this.state.author}
                            placeholder="Enter Author"
                            onChange={this.handleOnValueChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            name="year"
                            value={this.state.year}
                            placeholder="Enter Year Published"
                            onChange={this.handleOnValueChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                        <button type="button" className="btn btn-default"
                        onClick={this.handleReset.bind(this)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        error: state.booksData.error,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onAdd: (book) =>{
            dispatch(createBook(book));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateBook);