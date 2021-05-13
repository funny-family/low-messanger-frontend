import { FunctionComponent, ReactNode } from 'react';
import { createSlot } from './slots';

import './stepper.styles.css';
import './stepper.styles.layout.css';

interface Props {
  children?: ReactNode;
  amountOfSteps: number;
}

export const MySlot = createSlot();

// export const StepperSlots: any = {};

export const Stepper: FunctionComponent<Props> = (props: Props) => {
  // https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
  const amountOfSlots = [...Array(props.amountOfSteps).keys()];

  return (
    <div className="stepper-card">
      <span>amountOfSteps: {props.amountOfSteps}</span>

      {amountOfSlots.map((currentValue, index) => {
        const isArrayIterationDone = index + 1 === amountOfSlots.length;

        // const SlotName: any = [`Slot${slotId}`];
        // StepperSlots.SlotName = createSlot();

        // return <StepperSlots.SlotName.Renderer childs={props.children} key={slotId} />;
        return (
          <section
            key={currentValue}
            style={{
              border: '2px solid black'
            }}
          >
            <main>{currentValue}</main>
            <footer>
              <button type="button">Previous</button>
              {!isArrayIterationDone ? <button type="button">Next</button> : null}
            </footer>
          </section>
        );
      })}

      <MySlot.Renderer childs={props.children}>MySlot default text</MySlot.Renderer>
    </div>
  );
};

Stepper.defaultProps = {
  children: null
};
