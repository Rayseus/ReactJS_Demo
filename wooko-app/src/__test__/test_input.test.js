import React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {TextInput} from '../components.js'

enzyme.configure({ adapter: new Adapter() })
describe('Text input testing', () =>{
    let props;
    let mount_component;

    const mountComponoent = () =>{
        if (!mount_component) {
            mount_component = enzyme.mount(
            <TextInput {...props} />
            );
        }
        return mount_component;    
    }
//run before each component test
    beforeEach(() =>{
        props = {};
        mount_component = undefined;
    });

    describe('Email testing', () =>{
        // const email_vaildate = render.create(
        //     <TextInput id={"Email"} name={"email"} type={"email"}/>
        // );
        // describe('Text input as Email', () =>{
        //     beforeEach(() =>{
        //         props = {
        //             id: 'email',
                    
        //         }
        //     });
        // });

        // describe('Test onChange', () =>{
        //     beforeEach(() =>{
        //         Object.assign(props, {onChange: jest.fn()});
        //     });
        // });

        describe('Test input is entered', () =>{
            beforeEach(() =>{
                Object.assign(props, {value: '123@123.com', name: 'email', onChange: jest.fn(), callback_valid: jest.fn()});
            });

            test('Test Email', () =>{
                mountComponoent().find('input').first().simulate('change', {target: {value: 'abc@wooko.ca'}});
                expect(props.onChange).toHaveBeenCalled();
                // expect(mountComponoent().find('input').first.node.value).toBe('123@123.com');
            })
        });

        
    })
})