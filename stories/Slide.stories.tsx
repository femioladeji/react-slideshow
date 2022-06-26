import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Slide } from '../src';
import type { SlideProps } from '../src';

const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
];

const meta: Meta = {
    title: 'Examples/Slide',
    component: Slide,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<SlideProps> = args => <Slide>
    <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${images[0]})` }}>
            <span>Slide 1</span>
        </div>
    </div>
    <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${images[1]})` }}>
            <span>Slide 2</span>
        </div>
    </div>
    <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${images[2]})` }}>
            <span>Slide 3</span>
        </div>
    </div>
</Slide>;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
