import chai from 'chai'
import { mount } from '@vue/test-utils';
import Question from './Question.vue';
import moxios from 'moxios';

const expect = chai.expect

describe('Question', () => {
    let wrapper;

    beforeEach (() => {
        moxios.install();

        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body'
                }
            }
        });
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it ('presents the title and the body', () => {
        see('The title');
        see('The body');
    });

    it ('can trigger edit mode', () => {
        expect(wrapper.contains('input[name=title]')).to.be.false

        click('#edit');

        expect(wrapper.find('input[name=title]').element.value).to.equal('The title');
        expect(wrapper.find('textarea[name=body]').element.value).to.equal('The body');
    });

    it ('hides the edit button during edit mode', () => {
        expect(wrapper.contains('#edit')).to.be.true

        click('#edit');

        expect(wrapper.contains('#edit')).to.be.false
    });

    it ('updates the question after being edited - 01', (done) => {
        click('#edit');

        type('Changed title', 'input[name=title]');
        type('Changed body', 'textarea[name=body]');

        moxios.stubRequest(/questions\/\d+/, {
            status: 200,
            response: {
                // title: 'Changed title',
                // body: 'Changed body'
            }
        });

        click('#update');

        see('Changed title');
        see('Changed body');

        moxios.wait(() => {
            see('Your question has been updated.');
            done();
        });
    });

    it ('updates the question and succed a error (http 500) - 02', (done) => {
        click('#edit');

        // type('Changed title', 'input[name=title]');
        // type('Changed body', 'textarea[name=body]');

        moxios.stubRequest(/questions\/\d+/, {
            status: 500,
            response: {
              // title: 'The title',
              // body: 'The body'
            }
        });

        click('#update');

        // see('The title');
        // see('The body');

        moxios.wait(() => {
            see('A error was produced.');
            done();
        });
    });

    it ('updates the question after being edited - 03', (done) => {
        click('#edit');

        type('Changed title', 'input[name=title]');
        type('Changed body', 'textarea[name=body]');

        moxios.stubRequest(/questions\/\d+/, {
            status: 200,
            response: {
                title: 'Changedxx title',
                body: 'Changedxx body'
            }
        });

        click('#update2');

        moxios.wait(() => {
            see('Changedxx title');
            see('Changedxx body');
            see('Your question has been updated.');
            done();
        });

        // wrapper.vm.$nextTick(function () {
        //     see('Changed title');
        //     see('Changed body');
        //     see('Your question has been updated.');
        //     done();
        // })
    });

    it ('can cancel out of edit mode', () => {
        click('#edit');
        type('Changed title', 'input[name=title]');
        click('#cancel');
        see('The title');
    });

    // Helper Functions

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;

        expect(wrap.html()).contain(text);
    };

    let type = (text, selector) => {
        let node = wrapper.find(selector);

        node.element.value = text;
        node.trigger('input');
    };

    let click = selector => {
        wrapper.find(selector).trigger('click');
    };
});
