import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './SideDrawer.css';

const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <div>
        <aside className="side-drawer" onClick={props.onClick}>
          {props.children}
        </aside>
      </div>
    </CSSTransition>
  );
  //render on the Portal
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};
export default SideDrawer;
