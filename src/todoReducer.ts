import { InitialState } from "./context";
import { Item } from "./ts/interfaces";
import { actionType } from "./ts/reducer/actionType";
import { Actions } from "./ts/reducer/actions";
const useTodoReducer = (state: InitialState, action: Actions): InitialState => {
  switch (action.type) {
    case actionType.GET_ALL_ITEMS:
      return { ...state, isLoading: false, todo: action.payload };
    case actionType.FETCH_ERROR:
      return { ...state, isLoading: true, isError: true };

    case actionType.DISPLAY_ALERT:
      return { ...state, showAlert: true, alertMessege: action.payload };

    case actionType.HIDE_ALERT:
      return { ...state, showAlert: false, alertMessege: action.payload };

    case actionType.IS_LOADING:
      return { ...state, isLoading: !state.isLoading };

    case actionType.UPDATE_INPUT:
      return { ...state, ItemValue: action.payload };

    case actionType.ADD_ITEM:
      return {
        ...state,
        todo: [...state.todo, action.payload],
        isEditing: false,
        ItemID: "",
        ItemValue: "",
      };

    case actionType.EDIT_ITEM:
      const specificItem = state.todo.find(
        (item: Item) => item._id === action.payload
      );
      return {
        ...state,
        ItemValue: specificItem!.name,
        isEditing: true,
        ItemID: action.payload,
      };

    case actionType.EDITING_ITEM:
      let tempList = state.todo.map((item: Item) => {
        if (item._id === state.ItemID) {
          return { ...item, name: action.payload };
        }
        return item;
      });
      return {
        ...state,
        todo: tempList,
        isEditing: false,
        ItemID: "",
        ItemValue: "",
      };

    case actionType.TOOGLE_COMPLETE:
      const completedList = state.todo.map((item: Item) => {
        if (item._id === action.payload) {
          if (!item.completed) {
          }
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      return { ...state, todo: completedList, isEditing: false, ItemValue: "" };

    case actionType.DELETE_ITEM:
      const todoList = state.todo.filter(
        (item: Item) => item._id !== action.payload
      );
      return { ...state, todo: todoList, isEditing: false, ItemValue: "" };

    case actionType.REMOVE_ALL:
      return { ...state, ItemValue: "", todo: [] };
    default:
      return state;
  }
};

export default useTodoReducer;
