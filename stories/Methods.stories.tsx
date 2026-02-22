import React, { useRef } from 'react';
import { Meta, Story } from '@storybook/react';
import { Slide, SlideshowRef } from '../src';
import type { SlideProps } from '../src';

const meta: Meta = {
    title: 'Examples/Methods',
    component: Slide,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<SlideProps> = args => {
    const slideRef = useRef<SlideshowRef>(null)
    return <>
        <Slide indicators={true} ref={slideRef}>
            <div style={{textAlign: 'center', background: 'red', padding: '200px 0', fontSize: '30px'}}>First Slide</div>
            <div style={{textAlign: 'center', background: 'orange', padding: '200px 0', fontSize: '30px'}}>Second Slide</div>
            <div style={{textAlign: 'center', background: 'yellow', padding: '200px 0', fontSize: '30px'}}>Third Slide</div>
            <div style={{textAlign: 'center', background: 'green', padding: '200px 0', fontSize: '30px'}}>Fourth Slide</div>
        </Slide>
        <div style={{display: 'flex', justifyContent: 'center', margin: '50px 0'}}>
            <button type="button" style={{marginRight: '20px'}} onClick={() => slideRef.current.goBack()}>Back</button>
            <button type="button" style={{marginRight: '20px'}} onClick={() => slideRef.current.goNext()}>Next</button>
            <select onChange={(event) => slideRef.current.goTo(parseInt(event.currentTarget.value))}>
                <option>--Select--</option>
                <option value="0">First</option>
                <option value="1">Second</option>
                <option value="2">Third</option>
                <option value="3">Fourth</option>
            </select>
        </div>
    </>
}

export const Default = Template.bind({});

Default.args = {};
