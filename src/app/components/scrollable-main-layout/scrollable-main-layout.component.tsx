/* eslint-disable react/prop-types */

import { FC, ReactNode } from 'react';

import { createSlot } from '../slots';

import './scrollable-main-layout.styles.css';
import './scrollable-main-layout.styles.layout.css';

export const SmlSlotHeader = createSlot();
export const SmlSlotMain = createSlot();
export const SmlSlotFooter = createSlot();

export const ScrollableMainLayout: FC<{ children?: ReactNode }> = (props) => {
  // console.log('props.children:', props.children);
  // TODO: optimize it. Hide from the DOM slot is content is empty!

  return (
    <div className="sml-container">
      <div className="sml-header">
        <SmlSlotHeader.Renderer childs={props.children} />
      </div>

      <div className="sml-main">
        <SmlSlotMain.Renderer childs={props.children} />
      </div>

      <div className="sml-footer">
        <SmlSlotFooter.Renderer childs={props.children} />
      </div>
    </div>
  );
};
