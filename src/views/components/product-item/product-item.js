import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../button';
import Icon from '../icon';

import './product-item.css';


export class ProductItem extends Component {
    constructor() {
        super(...arguments);

        this.state = { editing: false };

        this.edit = this.edit.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.remove = this.remove.bind(this);
        this.save = this.save.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        this.redirectPage = this.redirectPage.bind(this);
    }

    edit() {
        this.setState({ editing: true });
    }

    handleKeyUp( event ) {
        if (event.keyCode === 13) {
            this.save(event);
        }
        else if (event.keyCode === 27) {
            this.stopEditing();
        }
    }

    remove() {
        this.props.removeProduct(this.props.product);
    }

    save( event ) {
        if (this.state.editing) {
            const { product } = this.props;
            const title = event.target.value.trim();

            if (title.length && title !== product.title) {
                this.props.updateProduct(product, { title });
            }

            this.stopEditing();
        }
    }

    stopEditing() {
        this.setState({ editing: false });
    }

    redirectPage() {
        this.context.router.history.push(`/api/${this.props.product.key}`)
    }

    renderTitle( product ) {
        return (
            <div className="product-item__title" tabIndex="0">
                {product.title}
            </div>
        );
    }

    renderTitleInput( product ) {
        return (
            <input
                autoComplete="off"
                autoFocus
                className="product-item__input"
                defaultValue={product.title}
                maxLength="64"
                onKeyUp={this.handleKeyUp}
                type="text"
            />
        );
    }

    render() {
        const { editing } = this.state;
        const { product } = this.props;

        let containerClasses = classNames('product-item', {
            'product-item--completed': product.completed,
            'product-item--editing': editing
        });

        return (
            <div className={containerClasses} tabIndex="0">
                <div className="cell"/>
                <div className={`cell ${!editing ? 'cell-title' : ''}`} onClick={!editing && this.redirectPage}>
                    {editing ? this.renderTitleInput(product) : this.renderTitle(product)}
                </div>

                <div className="cell">
                    <Button
                        className={classNames('btn--icon', 'product-item__button', { 'hide': editing })}
                        onClick={this.edit}>
                        <Icon name="mode_edit"/>
                    </Button>
                    <Button
                        className={classNames('btn--icon', 'product-item__button', { 'hide': !editing })}
                        onClick={this.stopEditing}>
                        <Icon name="clear"/>
                    </Button>
                    <Button
                        className={classNames('btn--icon', 'product-item__button', { 'hide': editing })}
                        onClick={this.remove}>
                        <Icon name="delete"/>
                    </Button>
                </div>
            </div>
        );
    }
}

ProductItem.propTypes = {
    removeProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    updateProduct: PropTypes.func.isRequired,
};

ProductItem.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
}

export default ProductItem;
