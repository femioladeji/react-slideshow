import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Zoom } from '../src';
import type { ZoomProps } from '../src';
import mdx from './ZoomIn.mdx';

const images = [
    "https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];

const meta: Meta = {
    title: 'Examples/ZoomIn',
    component: Zoom,
    parameters: {
        controls: { expanded: true },
        docs: {
            page: mdx,
        },
    },
};

export default meta;

const Template: Story<ZoomProps> = args => <Zoom {...args} scale={1.4} indicators={true}>
    {images.map((each, index) => (
        <div key={index} style={{ width: "100%" }}>
            <img style={{ objectFit: "cover", width: "100%" }} alt="Slide Image" src={each} />
        </div>
    ))}
</Zoom>;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
