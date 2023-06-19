import { $authHost, $host } from "./index";

export const createReview = async (reviewData) => {
  const { data } = await $host.post("/api/review/", reviewData);
  return data;
};

export const updateReview = async (id, reviewData) => {
  const { data } = await $authHost.put("api/review/" + id, reviewData);
  return data;
};

export const deleteReview = async (id) => {
  const { data } = await $authHost.delete("api/review/" + id);
  return data;
};

export const getReviews = async () => {
  const { data } = await $host.get("api/review/");
  return data;
};

export const getReview = async (id) => {
  const { data } = await $host.get("api/review/" + id);
  return data;
};
