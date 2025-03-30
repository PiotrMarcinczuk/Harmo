export interface LoginData {
  email: string;
  password: string;
}

export interface LoginValidationData {
  email: boolean;
  password: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  dateOfBirth: string;
  password?: string;
  surname: string;
  nickname: string;
  phone: string;
  repeatPassword?: string;
  timetableId?: number;
  userId?: number;
  assignedUserId?: number;
}

export interface RegisterValidationData {
  name: boolean;
  email: boolean;
  dateOfBirth: boolean;
  password: boolean;
  surname: boolean;
  nickname: boolean;
  phone: boolean;
  repeatPassword: boolean;
}

export interface Collaborator {
  user_id: number;
  name: string;
  surname: string;
  phone: string;
  created_at: string;
  email: string;
  nickname: string;
  dateofbirth: string;
}

export interface Event {
  eventName: string;
  eventStartTime: string;
  eventStartTimeH: string;
  eventEndTime: string;
  eventEndTimeH: string;
  isEventGroup: boolean;
  timetableId: number | any;
  description: string;
  assignedUsersId: number[];
  userId?: number;
}

export interface EventValidationData {
  eventName: boolean;
  startTime: boolean;
  endTime: boolean;
}
