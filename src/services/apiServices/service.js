import showToast from "../toasterService/showToast";
import toastTypeConstants from "../../constants/toastTypeConstants";

export const get = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      return data;
    } else {
      showToast(
        toastTypeConstants.ERROR,
        response.status + " : " + response.statusText,
        2500
      );
    }
  } catch (err) {}
};

export const post = async (url, reqBody) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      return data;
    } else {
      showToast(
        toastTypeConstants.ERROR,
        response.status + " : " + response.statusText,
        2500
      );
    }
  } catch (err) {}
};

export const put = async (url, reqBody) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const deletecall = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export default get;
