import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slide } from '../src';

const meta: Meta<typeof Slide> = {
  title: 'Examples/MultipleSlides',
  component: Slide,
};

export default meta;

type Story = StoryObj<typeof Slide>;

export const Default: Story = {
  render: () => (
    <Slide slidesToScroll={2} slidesToShow={2} indicators={true}>
      <div style={{ textAlign: 'center', background: 'red', padding: '200px 0', fontSize: '30px' }}>First Slide</div>
      <div style={{ textAlign: 'center', background: 'orange', padding: '200px 0', fontSize: '30px' }}>Second Slide</div>
      <div style={{ textAlign: 'center', background: 'yellow', padding: '200px 0', fontSize: '30px' }}>Third Slide</div>
      <div style={{ textAlign: 'center', background: 'green', padding: '200px 0', fontSize: '30px' }}>Fourth Slide</div>
      <div style={{ textAlign: 'center', background: 'blue', padding: '200px 0', fontSize: '30px' }}>Sixth Slide</div>
      <div style={{ textAlign: 'center', background: 'indigo', padding: '200px 0', fontSize: '30px' }}>Seventh Slide</div>
      <div style={{ textAlign: 'center', background: 'violet', padding: '200px 0', fontSize: '30px' }}>Eight Slide</div>
    </Slide>
  ),
};
