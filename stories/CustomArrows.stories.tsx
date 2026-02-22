import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slide } from '../src';

const buttonStyle = {
  background: 'none',
  border: '0px',
  width: '30px',
};

const meta: Meta<typeof Slide> = {
  title: 'Examples/CustomArrows',
  component: Slide,
};

export default meta;

type Story = StoryObj<typeof Slide>;

export const Default: Story = {
  render: () => (
    <Slide
      nextArrow={
        <button style={buttonStyle}>
          <svg fill="#fff" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
          </svg>
        </button>
      }
      prevArrow={
        <button style={buttonStyle}>
          <svg fill="#fff" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
          </svg>
        </button>
      }
    >
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
    </Slide>
  ),
};
