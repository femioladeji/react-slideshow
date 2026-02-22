import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slide } from '../src';

const meta: Meta<typeof Slide> = {
  title: 'Examples/Vertical',
  component: Slide,
};

export default meta;

type Story = StoryObj<typeof Slide>;

export const Default: Story = {
  render: () => (
    <Slide vertical autoplay={false}>
      <div className="each-slide-effect">
        <div
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)',
          }}
        >
          <span>Slide 1</span>
        </div>
      </div>
      <div className="each-slide-effect">
        <div
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80)',
          }}
        >
          <span>Slide 2</span>
        </div>
      </div>
      <div className="each-slide-effect">
        <div
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)',
          }}
        >
          <span>Slide 3</span>
        </div>
      </div>
      <div className="each-slide-effect">
        <div
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)',
          }}
        >
          <span>Slide 4</span>
        </div>
      </div>
      <div className="each-slide-effect">
        <div
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80)',
          }}
        >
          <span>Slide 5</span>
        </div>
      </div>
    </Slide>
  ),
};
