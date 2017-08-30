import { Simulate } from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import sinon from 'sinon';
import { createTestComponent } from 'src/utils/create-test-component';
import ProductForm from './product-form';


describe('ProductForm', () => {
  let productForm;


  beforeEach(() => {
    productForm = createTestComponent(ProductForm, {
      handleSubmit: sinon.spy()
    });
  });


  describe('component', () => {
    describe('instantiation:', () => {
      it('should set #state.title with an empty string', () => {
        expect(productForm.state.title).toEqual('');
      });
    });

    describe('#clearInput() method', () => {
      it('should set #state.title with an empty string', () => {
        productForm.state.title = 'foo';
        expect(productForm.state.title).toEqual('foo');

        productForm.clearInput();
        expect(productForm.state.title).toEqual('');
      });
    });


    describe('#handleChange() method', () => {
      it('should set #state.title with event.target.value', () => {
        const event = {target: {value: 'value'}};
        productForm.handleChange(event);
        expect(productForm.state.title).toEqual(event.target.value);
      });
    });


    describe('#handleKeyUp() method', () => {
      describe('with escape key', () => {
        it('should set #state.title with an empty string', () => {
          productForm.state.title = 'foo';
          productForm.handleKeyUp({keyCode: 27});
          expect(productForm.state.title).toEqual('');
        });
      });
    });


    describe('#handleSubmit() method', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        productForm.handleSubmit(event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should call productActions#handleSubmit with #state.title', () => {
        const event = {preventDefault: sinon.spy()};

        productForm.state.title = 'foo';
        productForm.handleSubmit(event);

        expect(productForm.props.handleSubmit.callCount).toEqual(1);
        expect(productForm.props.handleSubmit.calledWith('foo')).toEqual(true);
      });

      it('should set #state.title with an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        productForm.state.title = 'foo';
        productForm.handleSubmit(event);

        expect(productForm.state.title).toEqual('');
      });

      it('should not save if title evaluates to an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        productForm.state.title = '';
        productForm.handleSubmit(event);

        expect(productForm.props.handleSubmit.callCount).toBe(0);

        productForm.state.title = '    ';
        productForm.handleSubmit(event);

        expect(productForm.props.handleSubmit.callCount).toBe(0);
      });
    });
  });


  describe('DOM', () => {
    describe('`keyup` event triggered on text field with escape key', () => {
      it('should set #state.title with an empty string', () => {
        productForm.setState({title: 'foo'});
        Simulate.keyUp(productForm.titleInput, {keyCode: 27});
        expect(productForm.state.title).toEqual('');
      });

      it('should set text field value with an empty string', () => {
        productForm.setState({title: 'foo'});
        Simulate.keyUp(productForm.titleInput, {keyCode: 27});
        expect(productForm.titleInput.value).toEqual('');
      });
    });


    describe('`change` event triggered on text field', () => {
      it('should set #state.title with the value from the text field', () => {
        productForm.titleInput.value = 'foo';
        expect(productForm.state.title).toEqual('');
        Simulate.change(productForm.titleInput);
        expect(productForm.state.title).toEqual('foo');
      });
    });


    describe('`submit` event triggered on form', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        Simulate.submit(findDOMNode(productForm), event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should set text field value with an empty string', () => {
        const event = {preventDefault: sinon.spy()};
        productForm.setState({title: 'foo'});
        Simulate.submit(findDOMNode(productForm), event);
        expect(productForm.titleInput.value).toEqual('');
      });
    });
  });
});
