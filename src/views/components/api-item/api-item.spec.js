import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Api } from 'src/controllers/apis';
import { createTestComponent } from 'src/utils/create-test-component';
import ApiItem from './api-item';


describe('ApiItem', () => {
  let props;
  let api;


  beforeEach(() => {
    api = new Api({title: 'test'});

    props = {
      api,
      removeApi: sinon.spy(),
      updateApi: sinon.spy()
    };
  });


  describe('component', () => {
    let apiItem;

    beforeEach(() => {
      apiItem = createTestComponent(ApiItem, props);
    });


    describe('instantiation', () => {
      it('should initialize #state.editing to be false', () => {
        expect(apiItem.state.editing).toEqual(false);
      });

      it('should initialize #props.api with a Api instance', () => {
        expect(apiItem.props.api instanceof Api).toBe(true);
      });
    });

    describe('#delete() method', () => {
      it('should call #apiActions.deleteApi', () => {
        apiItem.remove();
        expect(apiItem.props.removeApi.callCount).toEqual(1);
        expect(apiItem.props.removeApi.calledWith(apiItem.props.api)).toEqual(true);
      });
    });

    describe('#edit() method', () => {
      it('should set #state.editing to `true`', () => {
        apiItem.edit();
        expect(apiItem.state.editing).toEqual(true);
      });
    });

    describe('#stopEditing() method', () => {
      it('should set #state.editing to `false`', () => {
        apiItem.state.editing = true;
        apiItem.stopEditing();
        expect(apiItem.state.editing).toEqual(false);
      });
    });

    describe('#save() method', () => {
      it('should do nothing if not editing', () => {
        apiItem.stopEditing = sinon.spy();
        apiItem.state.editing = false;
        apiItem.save();
        expect(apiItem.stopEditing.callCount).toEqual(0);
      });

      it('should set #state.editing to `false`', () => {
        apiItem.state.editing = true;
        apiItem.save({
          target: {value: ''}
        });
        expect(apiItem.state.editing).toEqual(false);
      });

      it('should call #apiActions.updateApi', () => {
        apiItem.state.editing = true;
        apiItem.save({
          target: {value: 'foo'}
        });
        expect(apiItem.props.updateApi.callCount).toEqual(1);
        expect(apiItem.props.updateApi.args[0][0]).toEqual(api);
        expect(apiItem.props.updateApi.args[0][1].title).toEqual('foo');
      });
    });

    describe('#toggleStatus() method', () => {
      it('should call #apiActions.updateApi', () => {
        apiItem.toggleStatus({
          target: {checked: true}
        });

        expect(apiItem.props.updateApi.callCount).toEqual(1);
      });
    });

    describe('#handleKeyUp() method', () => {
      describe('with enter key', () => {
        it('should call #save() with event object', () => {
          apiItem.save = sinon.spy();
          apiItem.handleKeyUp({keyCode: 13});
          expect(apiItem.save.callCount).toEqual(1);
        });
      });

      describe('with escape key', () => {
        it('should set #state.editing to `false`', () => {
          apiItem.state.editing = true;
          apiItem.handleKeyUp({keyCode: 27});
          expect(apiItem.state.editing).toEqual(false);
        });
      });
    });
  });


  describe('DOM', () => {
    describe('title', () => {
      it('should be rendered as a text input field when editing', () => {
        const wrapper = mount(<ApiItem {...props} />);
        wrapper.setState({editing: true});

        const titleInput = wrapper.find('input');
        const titleText = wrapper.find('.api-item__title');

        expect(titleInput.length).toBe(1);
        expect(titleInput.get(0).value).toBe('test');
        expect(titleText.length).toBe(0);
      });

      it('should be rendered as text when not editing', () => {
        const wrapper = mount(<ApiItem {...props} />);
        wrapper.setState({editing: false});

        const titleInput = wrapper.find('input');
        const titleText = wrapper.find('.api-item__title');

        expect(titleInput.length).toBe(0);
        expect(titleText.length).toBe(1);
        expect(titleText.text()).toBe('test');
      });
    });


    it('should set `onKeyUp` of input field to be #handleKeyUp()', () => {
      const wrapper = mount(<ApiItem {...props} />);
      wrapper.setState({editing: true});

      const component = wrapper.instance();
      const input = wrapper.find('input');
      expect(input.prop('onKeyUp')).toBe(component.handleKeyUp);
    });

    it('should set `onClick` of status button to be #toggleStatus()', () => {
      const wrapper = mount(<ApiItem {...props} />);
      const component = wrapper.instance();
      const buttons = wrapper.find('Button');
      expect(buttons.at(0).prop('onClick')).toBe(component.toggleStatus);
    });

    it('should set `onClick` of edit button to be #edit()', () => {
      const wrapper = mount(<ApiItem {...props} />);
      const component = wrapper.instance();
      const buttons = wrapper.find('Button');
      expect(buttons.at(1).prop('onClick')).toBe(component.edit);
    });

    it('should set `onClick` of clear button to be #stopEditing()', () => {
      const wrapper = mount(<ApiItem {...props} />);
      const component = wrapper.instance();
      const buttons = wrapper.find('Button');
      expect(buttons.at(2).prop('onClick')).toBe(component.stopEditing);
    });

    it('should set `onClick` of delete button to be #remove()', () => {
      const wrapper = mount(<ApiItem {...props} />);
      const component = wrapper.instance();
      const buttons = wrapper.find('Button');
      expect(buttons.at(3).prop('onClick')).toBe(component.remove);
    });
  });
});
