import { gql } from 'apollo-boost';

const getTasksQuery = gql`
{
  tasks {
  id
  title
  }
}`

const getProjectsQuery = gql
`{
  projects {
    id
    title
  }
}`

const addTaskMutation = gql
`mutation addProject {
  addProject(title: "Bootstrap", weight: 1, description: "Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development"){
    title,
    weight,
    description,
  }
}
`;

export { getTasksQuery, getProjectsQuery, addTaskMutation };
