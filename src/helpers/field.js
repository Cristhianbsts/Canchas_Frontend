const url = "http://localhost:3002/api/fields";

const getField = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.fields;
  } catch (error) {
    console.log(error);
  }
};
export { getField };
