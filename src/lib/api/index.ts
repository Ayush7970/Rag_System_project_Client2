// API Configuration
const RAW_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// remove trailing slash from base URL so we don’t get double slashes
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

// normalize endpoint so we don’t miss leading/trailing slashes
const normalizeEndpoint = (endpoint: string) => {
  let e = endpoint.trim();

  // ensure it starts with /
  if (!e.startsWith("/")) e = `/${e}`;

  // ✅ Your backend defines these collection routes WITH trailing slash
  if (e === "/api/projects") e = "/api/projects/";
  if (e === "/api/chats") e = "/api/chats/";
  if (e === "/api/user/create") e = "/api/user/create"; // no slash in OpenAPI, keep as-is

  return e;
};

export const apiClient = {
  get: async (endpoint: string, token?: string | null) => {
    const headers: HeadersInit = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const url = `${API_BASE_URL}${normalizeEndpoint(endpoint)}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },

  post: async (endpoint: string, data: unknown, token?: string | null) => {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const url = `${API_BASE_URL}${normalizeEndpoint(endpoint)}`;

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },

  delete: async (endpoint: string, token?: string | null) => {
    const headers: HeadersInit = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const url = `${API_BASE_URL}${normalizeEndpoint(endpoint)}`;

    const response = await fetch(url, { headers, method: "DELETE" });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },

  put: async (endpoint: string, data: unknown, token?: string | null) => {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const url = `${API_BASE_URL}${normalizeEndpoint(endpoint)}`;

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },

  uploadToS3: async (url: string, file: File) => {
    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
    if (!response.ok) throw new Error(`S3 Upload Error: ${response.status}`);
    return response;
  },
};







// // API Configuration


// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// // Basic API Client function with authentication support

// export const apiClient = {
//   get: async (endpoint: string, token?: string | null) => {
//     const headers: HeadersInit = {};

//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//     }

//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       headers,
//     });

//     if (!response.ok) {
//       throw new Error(`API Error: ${response.status}`);
//     }

//     return response.json();
//   },

//   post: async (endpoint: string, data: unknown, token?: string | null) => {
//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//     };

//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//     }

//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       method: "POST",
//       headers,
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`API Error: ${response.status}`);
//     }

//     return response.json();
//   },

//   delete: async (endpoint: string, token?: string | null) => {
//     const headers: HeadersInit = {};

//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//     }

//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       headers,
//       method: "DELETE",
//     });

//     if (!response.ok) {
//       throw new Error(`API Error: ${response.status}`);
//     }

//     return response.json();
//   },

//   put: async (endpoint: string, data: unknown, token?: string | null) => {
//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//     };

//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//     }

//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       method: "PUT",
//       headers,
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`API Error: ${response.status}`);
//     }

//     return response.json();
//   },
//   uploadToS3: async (url: string, file: File) => {
//     const response = await fetch(url, {
//       method: "PUT",
//       body: file,
//       headers: { "Content-Type": file.type },
//     });
//     if (!response.ok) {
//       throw new Error(`S3 Upload Error: ${response.status}`);
//     }
//     return response; // S3 doesn't return JSON
//   },
// };
