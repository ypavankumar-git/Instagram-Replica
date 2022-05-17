export const get = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await setTimeout(10000);
    const data = await response.json();
    return data;
  } catch (err) {
    window.alert('Network connection error, please try again after sometime');
  }
};

export const post = async (url, reqBody) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });

    const data = await response.json();

    return data;
  } catch (err) {
    window.alert('Network connection error, please try again after sometime');
  }
};

export const put = async (url, reqBody) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export default get;
