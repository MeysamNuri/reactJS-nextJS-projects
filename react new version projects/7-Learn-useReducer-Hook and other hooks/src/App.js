/*
 * NOTE
 * Simple project to showcase all the hooks with examples in ReactJs
 * Created By : Younes Ghorbany
 * Contact Information : younes.gh@chmail.ir
 */

import Accordion from "./components/Accordion";
import {
  UseMemoExample,
  UseRefExample,
  UseCallbackExample,
  UseReducerExample,
  UseLayoutEffectExample,
  UseDeferredValueExample,
  UseTransition,
  UseImperativeHandleExample,
  CustomHooks,
} from "./hooks";

const App = () => {
  return (
    <div className="container">
      <div className="text-center mt-2">
        <h2>یادگیری و استفاده از هوک های ری اکت 🚀</h2>
      </div>
      <hr className="text-danger" />
      <Accordion title="مثال آموزشی هوک useRef" heading="headingOne">
        <UseRefExample />
      </Accordion>
      <hr className="text-primary" />
      <Accordion title="مثال آموزشی هوک useMemo" heading="headingTwo">
        <UseMemoExample />
      </Accordion>
      <hr className="text-success" />
      <Accordion title="مثال آموزشی هوک useCallback" heading="headingThree">
        <UseCallbackExample />
      </Accordion>
      <hr className="text-dark" />
      <Accordion title="مثال آموزشی هوک useReducer" heading="headingFour">
        <UseReducerExample />
      </Accordion>
      <hr className="text-info" />
      <Accordion title="مثال آموزشی هوک useLayoutEffect" heading="headingFive">
        <UseLayoutEffectExample />
      </Accordion>
      <hr className="text-warning" />
      <Accordion title="آشنایی با هوک useDeferredValue" heading="headingSix">
        <UseDeferredValueExample />
      </Accordion>
      <hr className="text-primary" />
      <Accordion title="آشنایی با هوک useTransition" heading="headingSeven">
        <UseTransition />
      </Accordion>
      <hr className="text-success" />
      <Accordion
        title="آشنایی با هوک useImperativeHandle"
        heading="headingEight"
      >
        <UseImperativeHandleExample />
      </Accordion>
      <hr className="text-danger" />
      <Accordion title="آشنایی با هوک های شخصی سازی شده" heading="headingNine">
        <CustomHooks />
      </Accordion>
      <hr className="text-dark" />
    </div>
  );
};

export default App;
