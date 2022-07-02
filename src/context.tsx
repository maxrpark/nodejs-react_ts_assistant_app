import axios from "axios";
import React, { useContext, useReducer, useEffect } from "react";
import useTodoReducer from "./todoReducer";
import { Item, AlertMessege } from "./ts/interfaces";
import { actionType } from "./ts/reducer/actionType";
const API = "https://assistant-app-node-server.herokuapp.com/api/v1/tasks";

type Props = {
  children: React.ReactNode;
};

interface AppInterface {
  todo: [] | Item[];
  showAlert: boolean;
  isEditing: boolean;
  isError: boolean;
  alertMessege: AlertMessege;
  isLoading: boolean;
  ItemID: string;
  ItemValue: string;
  removeAll: () => void;
  formInput: (e: any) => void;
  completeItem: (id: string) => void;
  handleForm: (e: React.FormEvent) => void;
  editItem: (_id: string) => void;
  deleteItem: (_id: string) => void;
  displayAlert: (messege: string, type: string) => void;
}

export interface InitialState {
  todo: [] | Item[];
  showAlert: boolean;
  isEditing: boolean;
  alertMessege: AlertMessege;
  ItemID: string;
  ItemValue: string;
  isLoading: boolean;
  isError: boolean;
}

const InitialState = {
  todo: [],
  showAlert: false,
  isEditing: false,
  isLoading: true,
  ItemID: "",
  isError: false,
  ItemValue: "",
  alertMessege: {
    messege: "",
    type: "",
  },
};
const AppContext = React.createContext({} as AppInterface);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    useTodoReducer,
    InitialState as InitialState
  );

  // FETCH TASK
  const getAllTask = async () => {
    try {
      const res = await axios(`${API}`);
      const data = await res.data;
      dispatch({
        type: actionType.GET_ALL_ITEMS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.FETCH_ERROR,
      });
      console.log(error);
    }
  };

  // CHANGE INPUT VALUE
  const formInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: actionType.UPDATE_INPUT, payload: e.target.value });
  };

  // FORMSUBMIT
  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.ItemValue && state.ItemValue.trim() !== "") {
      if (state.isEditing && state.ItemValue) {
        try {
          await axios.patch(`${API}/${state.ItemID}`, {
            name: state.ItemValue,
          });
          dispatch({
            type: actionType.EDITING_ITEM,
            payload: state.ItemValue,
          });
          displayAlert("Task Edited", "success");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const newTask = await axios.post(`${API}`, {
            name: state.ItemValue,
          });

          dispatch({
            type: actionType.ADD_ITEM,
            payload: newTask.data,
          });
          displayAlert("Task Added", "success");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      displayAlert("Please Enter Task", "danger");
    }
  };

  // TOOGLE COMPLETE // done
  const completeItem = async (id: string) => {
    let isCompleted;
    state.todo.find((item: Item) => {
      if (item._id === id) {
        isCompleted = !item.completed;
        if (!item.completed) {
          displayAlert("Task Completed", "success");
        } else {
          displayAlert("Task UnCompleted", "danger");
        }
      }
    });
    try {
      await axios.patch(`${API}/${id}`, {
        completed: isCompleted,
      });
    } catch (error) {}
    dispatch({ type: actionType.TOOGLE_COMPLETE, payload: id });
  };

  // EDITING
  const editItem = (id: string) => {
    dispatch({ type: actionType.EDIT_ITEM, payload: id });
    displayAlert("Editing...", "warning");
  };
  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`${API}/${id}`);
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: actionType.DELETE_ITEM, payload: id });
    displayAlert("Task Deleted", "danger");
  };

  // REMOVE ALL
  const removeAll = async () => {
    try {
      await axios.delete(`${API}`);
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: actionType.REMOVE_ALL });
    displayAlert("All items removed", "danger");
  };

  // ALERT
  const displayAlert = (messege: string, type: string) => {
    const alert = {
      messege,
      type,
    };
    dispatch({ type: actionType.DISPLAY_ALERT, payload: alert });
  };

  useEffect(() => {
    // getAllTask();
    if (state.alertMessege.messege !== "Editing...") {
      let alertMessege = {
        messege: "",
        type: "",
      };
      let timeOut = setTimeout(() => {
        dispatch({ type: actionType.HIDE_ALERT, payload: alertMessege });
      }, 1500);
      return () => clearTimeout(timeOut);
    }
  }, [state.alertMessege]);
  useEffect(() => {
    getAllTask();
  }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        completeItem,
        formInput,
        editItem,
        deleteItem,
        displayAlert,
        removeAll,
        handleForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export const useAppContext = () => {
  return useContext(AppContext);
};
