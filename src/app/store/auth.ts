let authToken = '';

export const setAuthToken = (newAuthToken: string): void => {
  authToken = newAuthToken;
};

export const getAuthToken = (): string => authToken;

export const resetAuthToken = (): void => {
  authToken = '';
};

export const isInAChat = {
  get(): boolean | null {
    const isInAChatValue = localStorage.getItem('isInAChat');

    if (!isInAChatValue) {
      return null;
    }

    if (isInAChatValue !== undefined && isInAChatValue === 'false') {
      return false;
    }

    if (isInAChatValue !== undefined && isInAChatValue === 'true') {
      return true;
    }

    return null;
  },

  set(value: boolean): void {
    localStorage.setItem('isInAChat', value.toString());
  }
};
