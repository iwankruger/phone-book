import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect, change } from 'react-redux';
import { createPost, updatePost, newForm, fetchPost, blankForm } from '../actions';
import validate from '../helpers/validate';

class PostsNew extends Component {

    componentDidMount(){

        const {id} = this.props.match.params;
        // fetch specific contact data if id is specified as parameter
        if (!isNaN(id)) return this.props.fetchPost(id);

        // clear fields
        this.props.change('name', '');
        this.props.change('surname', '');
        this.props.change('phoneNumbers', '');
        this.props.change('email', '');
        this.props.change('note', '');
    }

    renderField(field) {

        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    renderSelect(field) {

        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        const renderSelectOptions = (key, index) => {
            return (
                <option
                    key={`${index}-${key}`}
                    value={key}
                >
                    {field.options[key]}
                </option>
            );
        }

        return (
            <div className={className}>
                <label>{field.label}</label>
                <select className="form-control"
                    type="text"
                    {...field.input}
                >
                    {Object.keys(field.options).map(renderSelectOptions)}
                </select>
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }
    
    renderTextArea(field) {

        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <textarea className="form-control"
                    rows="4" cols="50" 
                    {...field.input}
                >
                </textarea>
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }


    onSubmit(values) {
        // get post data from form
        const formData = this.props.formData? this.props.formData : values;

        console.log('DATA ',formData);

        // check if this is a update or submit
        const {id} = this.props.match.params;
        if (!isNaN(id)) {
            this.props.updatePost(id, formData, () => {
                this.props.history.push('/');
            });
        } else {
            this.props.createPost(formData, () => {
                this.props.history.push('/');
            });
        }
    }

    renderPhoneNumbers = ({ fields, meta }) => {

        const errorMessage = meta.error;
        const submittedFlag = this.props.submitFailed;
        const errorClass = `form-group ${submittedFlag && errorMessage ? 'has-danger' : ''}`;

        // on first load the field will not contain any items (phone numbers)
        if (fields.length == 0) {
            // ensure that a phone number is rendered
            fields.push();
        }

        return (
            <div className="custom-field-array-container1">
                {fields.map((phoneNumber, index) => (

                    <div className={errorClass}>
                        <div key={index} className="row field-array-item1">
                            <div className="col-xs-7">
                                <Field className="form-control"
                                    name={`${phoneNumber}.number`}
                                    type="text"
                                    component="input"
                                />
                            </div>
                            <div className="col-xs-4">
                                <Field className="form-control"
                                    name={`${phoneNumber}.phoneTypeId`}
                                    component='select'
                                >
                                    <option></option>
                                    <option value="1">Home</option>
                                    <option value="2">Work</option>
                                    <option value="3">Mobile</option>
                                    <option value="4">Office</option>
                                </Field>
                            </div>
                            {fields.length > 1 ? (
                                <div className="col-xs-1">
                                    <button type="button" className="btn" onClick={() => fields.remove(index)}>&times;</button>
                                </div>
                            ) : ''}
                        </div>
                    </div>
                ))}

                <div className="form-group">
                    <button type="button" onClick={() => fields.push()} className="btn">Add Phone Number</button>
                </div>
                <div className={errorClass}>
                    <div className="text-help">{(errorMessage && submittedFlag) ? errorMessage : ''}</div>
                </div>
            </div>
        )
    };
 
    render() {
        const { handleSubmit } = this.props;
       
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Name"
                    name="name"
                    initValue={name}
                    component={this.renderField}
                />
                <Field
                    label="Surname"
                    name="surname"
                    component={this.renderField}
                />

                <label>Phone Number</label>
                <FieldArray label="Phone Number" name="phoneNumbers" component={this.renderPhoneNumbers} />

                <Field
                    label="Email"
                    name="email"
                    component={this.renderField}
                />                

                <Field
                    label="Note"
                    name="note"
                    component={this.renderTextArea}
                />               
                <div className="text-xs-right">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </div>
              
            </form>
        );
    }
}

function mapStateToProps(state) {
    let data = {};
    if(state.posts.data ) {
        data = {initialValues: state.posts.data, formData: state.form.ContactNewForm.values };
    } 
 
    return data
}

PostsNew = reduxForm({
    form: 'initializeFromState'
  })(PostsNew)

export default reduxForm({
    validate,
    form: 'ContactNewForm',
    enableReinitialize: true
})(
    connect(mapStateToProps, { createPost, updatePost, newForm, fetchPost, change, blankForm })(PostsNew)
);
