import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../button';
import Icon from '../icon';

import './api-item.css';


export class ApiItem extends Component {
  constructor() {
    super(...arguments);

    this.state = {editing: false};

    this.edit = this.edit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  edit() {
    this.setState({editing: true});
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.save(event);
    }
    else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  remove() {
    this.props.removeApi(this.props.api);
  }

  save(event) {
    if (this.state.editing) {
      const { api } = this.props;
      const title = event.target.value.trim();

      if (title.length && title !== api.title) {
        this.props.updateApi(api, {title});
      }

      this.stopEditing();
    }
  }

  stopEditing() {
    this.setState({editing: false});
  }

  toggleStatus() {
    const { api } = this.props;
    this.props.updateApi(api, {completed: !api.completed});
  }

  renderTitle(api) {
    return (
      <div className="api-item__title" tabIndex="0">
        {api.title}
      </div>
    );
  }

  renderTitleInput(api) {
    return (
      <input
        autoComplete="off"
        autoFocus
        className="api-item__input"
        defaultValue={api.title}
        maxLength="64"
        onKeyUp={this.handleKeyUp}
        type="text"
      />
    );
  }

  render() {
    const { editing } = this.state;
    const { api } = this.props;

    let containerClasses = classNames('api-item', {
      'api-item--completed': api.completed,
      'api-item--editing': editing
    });

    return (
      <div className={containerClasses} tabIndex="0">
        <div className="cell">
          <Button
            className={classNames('btn--icon', 'api-item__button', {'active': api.completed, 'hide': editing})}
            onClick={this.toggleStatus}>
            <Icon name="done" />
          </Button>
        </div>

        <div className="cell">
          {editing ? this.renderTitleInput(api) : this.renderTitle(api)}
        </div>

        <div className="cell">
          <Button
            className={classNames('btn--icon', 'api-item__button', {'hide': editing})}
            onClick={this.edit}>
            <Icon name="mode_edit" />
          </Button>
          <Button
            className={classNames('btn--icon', 'api-item__button', {'hide': !editing})}
            onClick={this.stopEditing}>
            <Icon name="clear" />
          </Button>
          <Button
            className={classNames('btn--icon', 'api-item__button', {'hide': editing})}
            onClick={this.remove}>
            <Icon name="delete" />
          </Button>
        </div>
      </div>
    );
  }
}

ApiItem.propTypes = {
  removeApi: PropTypes.func.isRequired,
  api: PropTypes.object.isRequired,
  updateApi: PropTypes.func.isRequired
};


export default ApiItem;
