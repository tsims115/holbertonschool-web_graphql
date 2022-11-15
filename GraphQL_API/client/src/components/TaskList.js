import {
  useState,
  //useEffect
} from "react";
// components
import TaskDetails from './TaskDetails';
import { graphql } from 'react-apollo'
import { getTasksQuery } from '../queries/queries';;


function TaskList(props) {
  const [state, setState] = useState({
    selected: null
  });

  console.log(props);
  return ( 
  <div>
    <ul id = "task-list" > {
      displayTasks()
    } </ul>
    <TaskDetails taskId={state.selected} /> 
  </div>
  );

  function displayTasks() {
    console.log(props.data);
    var data = props.data;

    if (data.loading) {
      return ( <div> Loading tasks... </div>);
      }
      else {
        return data.tasks.map(task => {
            return ( <li key = {
                task.id
              }
              onClick = {
                (e) => {
                  setState({
                    selected: task.id
                  });
                }
              }> {
                task.title
              } </li>);
            })
        }
     }
  }
export default graphql(getTasksQuery)(TaskList);