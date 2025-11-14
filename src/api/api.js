import axios from "axios";

const api = axios.create({
   baseURL: "https://talknet-tr7a.onrender.com/api/v1",
});

api.interceptors.request.use((config) => {
   const token = localStorage.getItem("accessToken");
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
   failedQueue.forEach((prom) => {
      if (error) {
         prom.reject(error);
      } else {
         prom.resolve(token);
      }
   });
   failedQueue = [];
};

api.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
         if (isRefreshing) {
            return new Promise((resolve, reject) => {
               failedQueue.push({ resolve, reject });
            })
               .then((token) => {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  return api(originalRequest);
               })
               .catch((err) => Promise.reject(err));
         }

         originalRequest._retry = true;
         isRefreshing = true;

         try {
            const refreshToken = localStorage.getItem("refreshToken");
            const res = await axios.post(
               "https://your-backend.com/api/refresh",
               { refreshToken }
            );

            const newAccessToken = res.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);

            processQueue(null, newAccessToken);

            return api({
               ...originalRequest,
               headers: { Authorization: `Bearer ${newAccessToken}` },
            });
         } catch (err) {
            processQueue(err, null);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
            return Promise.reject(err);
         } finally {
            isRefreshing = false;
         }
      }

      return Promise.reject(error);
   }
);

export default api;
