import API from "../_api";

export const getGenres = async () => {
  try {
    const { data } = await API.get("/genres");
    return data.data; // API kamu pakai data.data
  } catch (error) {
    console.error("Error getGenres:", error);
    return [];
  }
};

export const createGenre = async (payload) => {
  try {
    const { data } = await API.post("/genres", payload);
    return data;
  } catch (error) {
    console.error("Error createGenre:", error);
    throw error;
  }
};
