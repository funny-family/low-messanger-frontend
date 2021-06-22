import { makeAutoObservable } from 'mobx';

import axios from 'axios';
import { AxiosTuple, AxiosRequestConfig, AxiosError, baseURL } from '../api.instance';

interface UserData {
  data: {
    id: string;
    name: string;
    avatar?: string;
  };
  errors?: {
    fieldName: string;
    message: string;
  };
}

interface UserCreationForm {
  submittedSuccessfully: boolean;
  errors?: {
    name: {
      message: string;
    };
    avatar?: {
      message: string;
    };
  };
}

export class UserStore {
  user: UserData = {
    data: {
      id: '',
      name: '',
      avatar: ''
    }
  };

  userCreationForm: UserCreationForm = {
    submittedSuccessfully: false
  };

  constructor() {
    makeAutoObservable(this);
  }

  resetData(): void {
    this.user.data = {
      id: '',
      name: '',
      avatar: ''
    };
  }

  resetUserCreationForm() {
    this.userCreationForm = {
      submittedSuccessfully: false,
      errors: {
        name: {
          message: ''
        },
        avatar: {
          message: ''
        }
      }
    };
  }

  async create({ name, avatar }: { name: string; avatar?: string }): Promise<AxiosTuple> {
    this.resetUserCreationForm();

    try {
      const config: AxiosRequestConfig = {
        method: 'POST',
        url: `${baseURL}/user`,
        withCredentials: true,
        data: {
          name,
          avatar
        }
      };
      const response = await axios(config);
      const responseDate = response.data;

      return [responseDate, null];
    } catch (err) {
      const error: AxiosError = { ...err };

      return [null, error];
    }
  }

  async getById(id: string): Promise<void> {
    try {
      const input: RequestInfo = `http://localhost:8800/api/v1/user/${id}`;
      const init: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };
      const response = await fetch(input, init);
      const responseData = await response.json();

      if (!response.ok) {
        console.log('BAD REQUEST BE LIKE in "getById" method! ...', responseData);

        return;
      }

      this.user.data = {
        id: responseData.id,
        name: responseData.name,
        avatar: responseData.avatar
      };
    } catch (error) {
      console.error('Error in chat store "getById" method:', error);
    }
  }

  /* eslint-disable class-methods-use-this */
  async deleteById(id: string): Promise<void> {
    try {
      const input: RequestInfo = `http://localhost:8800/api/v1/chat/${id}`;
      const init: RequestInit = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };
      const response = await fetch(input, init);
      const responseData = await response.json();

      if (!response.ok) {
        console.log('BAD REQUEST BE LIKE in "deleteById" method! ...', responseData);

        return;
      }

      console.log('GOOOD REQUEST BE LIKE in "deleteById" method! ...', responseData);
    } catch (error) {
      console.error('Error in chat store "delete" method:', error);
    }
  }
}
