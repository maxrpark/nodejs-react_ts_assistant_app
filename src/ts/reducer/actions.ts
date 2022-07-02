import { actionType } from "./actionType";
import { AlertMessege, Item } from "../interfaces";

interface GET_ALL_ITEMS {
  type: actionType.GET_ALL_ITEMS;
  payload: Item[];
}
interface FETCH_ERROR {
  type: actionType.FETCH_ERROR;
}
interface DISPLAY_ALERT {
  type: actionType.DISPLAY_ALERT;
  payload: AlertMessege;
}
interface HIDE_ALERT {
  type: actionType.HIDE_ALERT;
  payload: AlertMessege;
}
interface IS_LOADING {
  type: actionType.IS_LOADING;
}
interface UPDATE_INPUT {
  type: actionType.UPDATE_INPUT;
  payload: string;
}
interface ADD_ITEM {
  type: actionType.ADD_ITEM;
  payload: Item;
}
interface EDIT_ITEM {
  type: actionType.EDIT_ITEM;
  payload: string;
}

interface EDITING_ITEM {
  type: actionType.EDITING_ITEM;
  payload: string;
}
interface DELETE_ITEM {
  type: actionType.DELETE_ITEM;
  payload: string;
}
interface TOOGLE_COMPLETE {
  type: actionType.TOOGLE_COMPLETE;
  payload: string;
}
interface REMOVE_ALL {
  type: actionType.REMOVE_ALL;
}

export type Actions =
  | GET_ALL_ITEMS
  | FETCH_ERROR
  | DISPLAY_ALERT
  | HIDE_ALERT
  | UPDATE_INPUT
  | REMOVE_ALL
  | ADD_ITEM
  | EDIT_ITEM
  | EDITING_ITEM
  | TOOGLE_COMPLETE
  | DELETE_ITEM
  | IS_LOADING;
