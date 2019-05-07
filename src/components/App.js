import React from "react";
import Task from "../components/Task";

//import shortid from "shortid";

let nextTaskId = 100;

class App extends React.Component {
  state = {
    nextTitle: "Titre",
    search: "",
    tasks: [
      {
        id: 0,
        title: "First Task",
        done: false,
        hidden: false
      },
      {
        id: 1,
        title: "Second Task",
        done: false,
        hidden: false
      },
      {
        id: 2,
        title: "Third Task",
        done: false,
        hidden: false
      },
      {
        id: 3,
        title: "Another Third Task",
        done: false,
        hidden: false
      }
    ]
  };

  focusInput = e => {
    if (this.state.nextTitle === "Titre") {
      this.setState({ nextTitle: "" });
    }
  };

  blurInput = e => {
    if (this.state.nextTitle === "") {
      this.setState({ nextTitle: "Titre" });
    }
  };

  render() {
    return (
      <div>
        <h1>To-Do list</h1>
        {this.state.tasks
          .map(task => {
            return {
              ...task
            };
          })
          .sort(function(x, y) {
            // false values first
            return x.done === y.done ? 0 : x.done ? 1 : -1;
          })
          .map((task, index) => (
            <Task
              key={task.id}
              title={task.title}
              done={task.done}
              hidden={task.hidden}
              onCloseClick={() => {
                const modTasks = [...this.state.tasks];

                // for (let i = 0; i < modTasks.length; i++) {
                //   if (modTasks[i].id === task.id) {
                //     modTasks.splice(i, 1);
                //     break;
                //   }
                // }

                const idx = modTasks.findIndex(element => {
                  return element.id === task.id;
                });
                modTasks.splice(idx, 1);

                this.setState({ tasks: modTasks });
              }}
              onTitleClick={() => {
                const modTasks = [...this.state.tasks];

                // for (let i = 0; i < modTasks.length; i++) {
                //   if (modTasks[i].id === task.id) {
                //     modTasks[i] = {
                //       ...this.state.tasks[i],
                //       done: !this.state.tasks[i].done
                //     };
                //     break;
                //   }
                // }

                const idx = modTasks.findIndex(element => {
                  return element.id === task.id;
                });
                modTasks[idx].done = !modTasks[idx].done;

                this.setState({ tasks: modTasks });
              }}
            />
          ))}
        <input
          value={this.state.nextTitle}
          onFocus={this.focusInput}
          onBlur={this.blurInput}
          onChange={e => {
            this.setState({ nextTitle: e.target.value });
          }}
        />
        <button
          onClick={e => {
            const newTask = {
              id: nextTaskId++,
              title:
                this.state.nextTitle === "Titre"
                  ? "Tâche " + nextTaskId
                  : this.state.nextTitle,
              done: false
            };
            this.setState({
              nextTitle: "Titre",
              tasks: [...this.state.tasks, newTask]
            });
          }}
        >
          AJOUTER UNE TÂCHE
        </button>
        <p>Votre recherche</p>
        <input
          className="search-bar"
          value={this.state.search}
          onChange={e => {
            const curSearch = e.target.value;
            const modTasks = [...this.state.tasks];
            modTasks.forEach(task => {
              task.hidden = task.title
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .includes(
                  curSearch
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                )
                ? false
                : true;
            });
            console.log(modTasks);
            this.setState({ search: curSearch, tasks: modTasks });
          }}
        />
      </div>
    );
  }
}

export default App;
