import React from "react";
import { Badge, Button, Table } from "react-bootstrap";
import styled from "styled-components";
import jwt_decode from "jwt-decode";

import { getUserTodos } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { timeStringRefactor } from "../utils/helpers";

export const P = styled.p`
  font-size: 65%;
  margin-top: 80px;
  text-align: center;
`;

export const ToDoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  max-width: 1260px;
  margin-left: auto;
  margin-right: auto;
`;

const Dashboard = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const [jwtToken, usersTodosFromRedux]: [string, Array<Todo>] = useAppSelector((state: RootState) => [
    state?.auth?.authStatus?.jwtToken,
    state?.todos.userTodos,
  ]);

  const [token, setToken] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [usersTodos, setUsersTodos] = React.useState<Array<Todo> | null>(null);

  React.useEffect(() => {
    if (jwtToken) {
      setToken(jwtToken);
      const decodedToken = jwt_decode(jwtToken);
      const { name } = decodedToken as Token;
      setUserName(name);
    }
  }, [jwtToken]);

  React.useEffect(() => {
    if (token) {
      dispatch(getUserTodos());
    }
  }, [dispatch, token]);

  React.useEffect(() => {
    if (usersTodosFromRedux) {
      setUsersTodos(usersTodosFromRedux);
    }
  }, [usersTodosFromRedux]);

  const UsersTodoTable = (): JSX.Element => {
    return (
      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th style={{ width: "35px" }}>#</th>
            <th style={{ width: "auto" }}>Description</th>
            <th style={{ width: "175px" }}>Created At</th>
            <th style={{ width: "175px" }}>Updated At</th>
            <th style={{ width: "80px" }}>Update</th>
            <th style={{ width: "80px" }}>Delete</th>
            <th style={{ width: "35px" }}>Id</th>
          </tr>
        </thead>
        <tbody>
          {usersTodos &&
            usersTodos?.map((todo, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Badge bg="primary" pill={true}>
                      {index + 1}
                    </Badge>
                  </td>
                  <td>{todo.description}</td>
                  <td>{timeStringRefactor(todo.created_at)}</td>
                  <td>{todo.updated_at !== todo.created_at ? timeStringRefactor(todo.updated_at) : "---"}</td>
                  <td>
                    <Button variant="warning" size="sm">
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Badge bg="success">{todo.todo_id}</Badge>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  };

  return (
    <React.Fragment>
      <P>
        JWT Token: <span className="span_bold">{token}</span>
      </P>
      <ToDoDiv>
        <h1 style={{ textAlign: "center", marginTop: "80px" }}>
          <span className="span_bold">{userName}'s</span> Todos
        </h1>
        {usersTodos && <UsersTodoTable />}
      </ToDoDiv>
    </React.Fragment>
  );
};

export default Dashboard;
