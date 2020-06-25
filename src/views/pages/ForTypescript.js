import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ForTypescript = () => {
  const codeString1 = `
  "typeRoots": [
    "./types",
    "./node_modules/@types"
  ]
  `;
  const codeString2 = `
  declare module 'react-slideshow-image' {
    export class Zoom extends React.Component<ZoomProps & any, any> {
        goBack(): void;
        goNext(): void;
        goTo(index: number): void;
    }
    export class Fade extends React.Component<SlideshowProps & any, any> {
        goBack(): void;
        goNext(): void;
        goTo(index: number): void;
    }
    export class Slide extends React.Component<SlideshowProps & any, any> {
        goBack(): void;
        goNext(): void;
        goTo(index: number): void;
    }
    export interface SlideshowProps {
        duration?: number,
        transitionDuration?: number,
        defaultIndex?: number,
        indicators?: boolean | function,
        prevArrow?: object | function,
        nextArrow?: object | function,
        arrows?: boolean,
        autoplay?: boolean,
        infinite?: boolean,
        onChange?(oldIndex: number, newIndex: number): void,
        pauseOnHover?: boolean
    }
    export interface ZoomProps extends SlideshowProps {
        scale: number
    }
  }`;

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <h1>Typescript</h1>
      <div>
        <p>1. In your tsconfig.json file add this to the compiler options</p>
        <div>
          <SyntaxHighlighter language="javascript" style={dark}>
            {codeString1}
          </SyntaxHighlighter>
        </div>
        <p>
          Create a file in this directory types/react-slideshow-image/index.d.ts
        </p>
        <p>Copy and paste this into it</p>
        <div>
          <SyntaxHighlighter language="javascript" style={dark}>
            {codeString2}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default ForTypescript;
