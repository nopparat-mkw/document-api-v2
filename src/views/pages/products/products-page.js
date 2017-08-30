import React, { Component } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getNotification, notificationActions } from 'src/notification';
import { getProductFilter, getVisibleProducts, productsActions } from 'src/controllers/product';
import Notification from '../../components/notification';
import ProductList from '../../components/product-list';
import ProductForm from "../../components/product-form/product-form";


export class ProductPage extends Component {
    static propTypes = {
        createProduct: PropTypes.func.isRequired,
        dismissNotification: PropTypes.func.isRequired,
        filterType: PropTypes.string.isRequired,
        loadProducts: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        notification: PropTypes.object.isRequired,
        removeProduct: PropTypes.func.isRequired,
        products: PropTypes.instanceOf(List).isRequired,
        undeleteProduct: PropTypes.func.isRequired,
        unloadProducts: PropTypes.func.isRequired,
        updateProduct: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.loadProducts();
    }

    componentWillUnmount() {
        this.props.unloadProducts();
    }

    renderNotification() {
        const { notification } = this.props;
        return (
            <Notification
                action={this.props.undeleteProduct}
                actionLabel={notification.actionLabel}
                dismiss={this.props.dismissNotification}
                display={notification.display}
                message={notification.message}
            />
        );
    }

    render() {
        return (
            <div className="g-row">
                <div className="g-col">
                    <ProductForm handleSubmit={this.props.createProduct} />
                </div>
                <div className="g-col">
                    <ProductList
                        removeProduct={this.props.removeProduct}
                        products={this.props.products}
                        updateProduct={this.props.updateProduct}
                    />
                </div>

                {this.props.notification.display ? this.renderNotification() : null}
            </div>
        );
    }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
    getNotification,
    getProductFilter,
    getVisibleProducts,
    (notification, filterType, products) => ({
        notification,
        filterType,
        products
    })
);

const mapDispatchToProps = Object.assign(
    {},
    productsActions,
    notificationActions
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductPage);
