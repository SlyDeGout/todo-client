import React from "react";

// class Task extends React.Component {
//   //let { index, title, done, onCloseClick, onTitleClick } = props;
//   state = {
//     done: false
//   };

//   render() {
//     return (
//       <p>
//         <button
//           onClick={e => {
//             console.log("TASK INSIDE CLOSE CLICKED");
//           }}
//         >
//           X
//         </button>
//         <span
//           onClick={e => {
//             console.log(
//               "TASK INSIDE TITLE CLICKED : pour le moment => " + this.state.done
//             );
//             this.setState(prevState => {
//               return { done: !prevState.done };
//             });
//           }}
//         >
//           {this.props.title}
//         </span>
//       </p>
//     );
//   }
// }

class Task extends React.Component {
  render() {
    const {
      //index,
      title,
      done,
      hidden,
      onCloseClick,
      onTitleClick
    } = this.props;
    return (
      <p className={`task ${hidden ? "hidden" : ""}`}>
        <button
          onClick={e => {
            onCloseClick();
          }}
        >
          X
        </button>
        <span
          style={
            done
              ? { textDecorationLine: "line-through" }
              : { textDecorationLine: "none" }
          }
          onClick={e => {
            onTitleClick();
          }}
        >
          {title}
        </span>
      </p>
    );
  }
}

export default Task;
