import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Product } from 'src/controllers/product';
import { createTestComponent } from 'src/utils/create-test-component';
import ProductItem from './product-item';


describe('ProductItem', () => {
  let props;
  let product;


  beforeEach(() => {
    product = new Product({title: 'test'});

    props = {
      product,
      removeProduct: sinon.spy(),
      updateProduct: sinon.spy()
    };
  });


  describe('component', () => {
    let productItem;

    beforeEach(() => {
      productItem = createTestComponent(ProductItem, props);
    });


    describe('instantiation', () => {
      it('should initialize #state.editing to be false', () => {
        expect(productItem.state.editing).toEqual(false);
      });

      it('should initialize #props.product with a Product instance', () => {
        expect(productItem.props.product instanceof Product).toBe(true);
      });
    });

    describe('#delete() method', () => {
      it('should call #productActions.deleteProduct', () => {
        productItem.remove();
        expect(productItem.props.removeProduct.callCount).toEqual(1);
        expect(productItem.props.removeProduct.calledWith(productItem.props.product)).toEqual(true);
      });
    });

    describe('#edit() method', () => {
      it('should set #state.editing to `true`', () => {
        productItem.edit();
        expect(productItem.state.editing).toEqual(true);
      });
    });

    describe('#stopEditing() method', () => {
      it('should set #state.editing to `false`', () => {
        productItem.state.editing = true;
        productItem.stopEditing();
        expect(productItem.state.editing).toEqual(false);
      });
    });

    describe('#save() method', () => {
      it('should do nothing if not editing', () => {
        productItem.stopEditing = sinon.spy();
        productItem.state.editing = false;
        productItem.save();
        expect(productItem.stopEditing.callCount).toEqual(0);
      });

      it('should set #state.editing to `false`', () => {
        productItem.state.editing = true;
        productItem.save({
          target: {value: ''}
        });
        expect(productItem.state.editing).toEqual(false);
      });

      it('should call #productActions.updateProduct', () => {
        productItem.state.editing = true;
        productItem.save({
          target: {value: 'foo'}
        });
        expect(productItem.props.updateProduct.callCount).toEqual(1);
        expect(productItem.props.updateProduct.args[0][0]).toEqual(product);
        expect(productItem.props.updateProduct.args[0][1].title).toEqual('foo');
      });
    });

    describe('#handleKeyUp() method', () => {
      describe('with enter key', () => {
        it('should call #save() with event object', () => {
          productItem.save = sinon.spy();
          productItem.handleKeyUp({keyCode: 13});
          expect(productItem.save.callCount).toEqual(1);
        });
      });

      describe('with escape key', () => {
        it('should set #state.editing to `false`', () => {
          productItem.state.editing = true;
          productItem.handleKeyUp({keyCode: 27});
          expect(productItem.state.editing).toEqual(false);
        });
      });
    });
  });


  describe('DOM', () => {
    describe('title', () => {
      it('should be rendered as a text input field when editing', () => {
        const wrapper = mount(<ProductItem {...props} />);
        wrapper.setState({editing: true});

        const titleInput = wrapper.find('input');
        const titleText = wrapper.find('.product-item__title');

        expect(titleInput.length).toBe(1);
        expect(titleInput.get(0).value).toBe('test');
        expect(titleText.length).toBe(0);
      });

      it('should be rendered as text when not editing', () => {
        const wrapper = mount(<ProductItem {...props} />);
        wrapper.setState({editing: false});

        const titleInput = wrapper.find('input');
        const titleText = wrapper.find('.product-item__title');

        expect(titleInput.length).toBe(0);
        expect(titleText.length).toBe(1);
        expect(titleText.text()).toBe('test');
      });
    });


    it('should set `onKeyUp` of input field to be #handleKeyUp()', () => {
      const wrapper = mount(<ProductItem {...props} />);
      wrapper.setState({editing: true});

      const component = wrapper.instance();
      const input = wrapper.find('input');
      expect(input.prop('onKeyUp')).toBe(component.handleKeyUp);
    });

    it('should set `onClick` of edit button to be #edit()', () => {
      const wrapper = mount(<ProductItem {...props} />);
      const component = wrapper.instance();
      const buttons = wrapper.find('Button');
      expect(buttons.at(0).prop('onClick')).toBe(component.edit);
    });

    it('should set `onClick` of clear button to be #stopEditing()', () => {
      const wrapper = mount(<ProductItem {...props} />);
      const component = wrapper.instance();
      const buttons = wrapper.find('Button');
      expect(buttons.at(1).prop('onClick')).toBe(component.stopEditing);
    });

    it('should set `onClick` of delete button to be #remove()', () => {
      const wrapper = mount(<ProductItem {...props} />);
      const component = wrapper.instance();
      const buttons = wrapper.find('Button');
      expect(buttons.at(2).prop('onClick')).toBe(component.remove);
    });
  });
});
