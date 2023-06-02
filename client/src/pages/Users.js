import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { toast } from "react-hot-toast";
import axios from "axios";
import useLogger from "../hooks/useLooger";
import Spinner from "../components/Spinner";
import API_URLS from "../serverAPI";

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: 600,
    margin: "auto",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  bottomContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tableRow: {
    "& > *": {
      border: "1px solid black",
    },
  },
  tableHeadCell: {
    border: "1px solid black",
    fontWeight: "bold",
  },
});

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [actionsPerDay, setActionsPerDay] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useLogger();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URLS.getAllUsers);
        setIsLoading(false);
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const logAction = JSON.parse(localStorage.getItem("logs") || []);
    setActionsPerDay(logAction);
  }, []);

  return (
    <Layout title={"Users"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className={classes.header}>Users Table</h2>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                    Username
                  </TableCell>

                  <TableCell className={classes.tableHeadCell}>
                    Current Number Of Actions
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Maximum Number of Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user, index) => (
                  <TableRow key={index} className={classes.tableRow}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        backgroundColor:
                          actionsPerDay?.[index]?.actionAllowed ===
                            actionsPerDay?.[index]?.maxActions &&
                          actionsPerDay?.[index]?.actionAllowed !== undefined &&
                          actionsPerDay?.[index]?.maxActions !== undefined
                            ? "red"
                            : "green",
                        color: "white",
                      }}
                    >
                      {user?.Username}
                    </TableCell>

                    <TableCell
                      style={{
                        backgroundColor:
                          actionsPerDay?.[index]?.actionAllowed ===
                            actionsPerDay?.[index]?.maxActions &&
                          actionsPerDay?.[index]?.actionAllowed !== undefined &&
                          actionsPerDay?.[index]?.maxActions !== undefined
                            ? "red"
                            : "green",
                        color: "white",
                      }}
                    >
                      {actionsPerDay?.[index]?.actionAllowed}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor:
                          actionsPerDay?.[index]?.actionAllowed ===
                            actionsPerDay?.[index]?.maxActions &&
                          actionsPerDay?.[index]?.actionAllowed !== undefined &&
                          actionsPerDay?.[index]?.maxActions !== undefined
                            ? "red"
                            : "green",
                        color: "white",
                      }}
                    >
                      {actionsPerDay?.[index]?.maxActions}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Layout>
  );
};

export default Users;
