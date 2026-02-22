import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Fade } from '../src';
import type { FadeProps } from '../src';

const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
];

const meta: Meta = {
    title: 'Examples/Fade',
    component: Fade,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<FadeProps> = args => <Fade {...args}>
    <div className="each-slide">
        <div>
            <img src={images[0]} alt='First image' />
        </div>
        <p>First Slide</p>
    </div>
    <div className="each-slide">
        <p>Second Slide</p>
        <div>
            <img src={images[1]} alt='Second image' />
        </div>
    </div>
    <div className="each-slide">
        <div>
            <img src={images[2]} alt='Third image' />
        </div>
        <p>Third Slide</p>
    </div>
</Fade>;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
