import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { fetchContacts, deletePost } from '../actions';

class ContactList extends Component {

    componentDidMount() {
        const { limit, offset } = this.props.posts;
        this.props.fetchContacts(limit, offset);
    }

    renderInfo(post) {
        
        const renderPhoneNumbers = (phone, index) => {
            return (
                <div>
                    <div className="col-sm-4">
                            Phone {phone.type}
                    </div>

                    <div className="col-sm-8">  
                        {phone.number}
                    </div>
                </div>
            );
        };

        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        {post.phoneNumbers.map(renderPhoneNumbers)}
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                                Email
                        </div>
            
                        <div className="col-sm-8">  
                            {post.email}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                                Note
                        </div>
            
                        <div className="col-sm-8">  
                            {post.note}
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }

    deleteContact(id) {
        this.props.deletePost(id, () => {
            const { limit, offset } = this.props.posts;
            this.props.fetchContacts(limit, offset);
        });
    }

    renderContacts() {
        return _.map(this.props.posts.contacts, post => {

            
            return (
                <li className="list-group-item" key={post.id} onClick={() => this.itemSelected(post.id).bind(this)}>
                    <div className="row">
                        <div className="col-xs-8">
                            <div className="form-inline">
                                {post.name} {post.surname}
                            </div>
                        </div>
                        <div className="col-xs-2">
                            <button onClick={() => this.deleteContact(post.id)} className="btn btn-warning btn-block">Delete</button>
                        </div>
                        <div className="col-xs-2">
                            <Link  to={`/posts/${post.id}`} className="btn btn-primary btn-block">View / Edit</Link>  
                        </div>
                    </div>

                    
                    
                   
                </li>
            );
        });
    }

    handlePageChange(pageNumber) {
        const { limit } = this.props.posts;
        // calculate offset from page selected
        const newOffset = pageNumber * limit - limit;
        this.props.fetchContacts(limit, newOffset);  
    }

    render() {
        const { activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed } = this.props.posts;
    
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Contact
                    </Link>
                </div>
                <h3>Contacts</h3>
                <ul className="list-group">
                    {this.renderContacts()}
                </ul>
                <div className="text-xs-right">
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={activePage}
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={pageRangeDisplayed}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts }; 
}

export default connect(mapStateToProps, { fetchContacts, deletePost })(ContactList);
