import React, { useEffect } from "react";
import { getReviews } from "../http/reviewAPI";

function AdminReviews() {
  const fetchReviewsForAdmin = async () => {
    try {
        const data = getReviews("false")
    } catch (e) {
        throw(e)
    }
  };

  useEffect(() => {
    fetchReviewsForAdmin();
  }, []);

  return <></>;
}

export default AdminReviews;
