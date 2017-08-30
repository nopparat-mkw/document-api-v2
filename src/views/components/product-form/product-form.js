import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './product-form.css';


export class ProductForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  constructor() {
    super(...arguments);

    this.state = {title: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearInput() {
    this.setState({title: ''});
  }

  handleChange(event) {
    this.setState({title: event.target.value});
  }

  handleKeyUp(event) {
    if (event.keyCode === 27) this.clearInput();
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = this.state.title.trim();
    if (title.length) this.props.handleSubmit(title);
    this.clearInput();
  }

  render() {
    return (
      <form className="product-form" onSubmit={this.handleSubmit} noValidate>
        <input
          autoComplete="off"
          autoFocus
          className="product-form__input"
          maxLength="64"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          placeholder="New Product Name"
          ref={e => this.titleInput = e}
          type="text"
          value={this.state.title}
        />
      </form>
    );
  }
}


export default ProductForm;
