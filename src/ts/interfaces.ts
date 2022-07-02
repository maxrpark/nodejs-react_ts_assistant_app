export interface Item {
  _id?: string;
  name: string;
  completed: boolean;
}

export interface Project {
  gitUrl: string;
  id: string;
  name: string;
  projectUrl: string;
  url: string;
}
export interface AlertMessege {
  messege: string;
  type: string;
}
