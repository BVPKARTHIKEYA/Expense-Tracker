// src/utils/apiPaths.js

const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/api/v1/auth/login`,
    REGISTER: `${BASE_URL}/api/v1/auth/register`,
    GET_USER_INFO: `${BASE_URL}/api/v1/auth/me`,
  },
  DASHBOARD: {
    GET_DATA: `${BASE_URL}/api/v1/dashboard`,
  },
  INCOME: {
    GET_INCOME: `${BASE_URL}/api/v1/get`,
    GET_ALL_INCOME: `${BASE_URL}/api/v1/income/get`,
    DELETE_INCOME: (incomeId) => `${BASE_URL}/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: `${BASE_URL}/api/v1/income/downloadexcel`,
  },
  EXPENSE: {
    GET_EXPENSE: `${BASE_URL}/api/v1/expense/get`,
    ADD_EXPENSE: `${BASE_URL}/api/v1/expense/add`,
    DELETE_EXPENSE: (expenseId) => `${BASE_URL}/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: `${BASE_URL}/api/v1/expense/downloadexcel`,
  },
  IMAGE: {
    UPLOAD_IMAGE: `${BASE_URL}/api/v1/image/upload-image`,
  },
};

export { BASE_URL };
