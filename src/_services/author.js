import API from "../_api";

export const getAuthors = async () => {
  try {
    const { data } = await API.get("/authors");
    return data.data; // API kamu pakai data.data
  } catch (error) {
    console.error("Error getAuthors:", error);
    return [];
  }
};

export const createAuthor = async (payload) => {
  try {
    const { data } = await API.post("/authors", payload);
    return data;
  } catch (error) {
    console.error("Error createAuthor:", error);
    throw error;
  }
};
