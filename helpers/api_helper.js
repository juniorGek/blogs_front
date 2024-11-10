import axios from "axios"

//apply base url for axios
const API_URL = process.env.backend_url + "api"

const axiosApi = axios.create({
    baseURL: API_URL,
    validateStatus: function (status) {
        return status >= 200 && status < 600 // default
    },
})

axiosApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
)

export async function get(url, data, config = {}) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token') ?? ''}`
    return await axiosApi.get(url, {...config, params: data}).then(response => response.data)
}

export async function post(url, data, config = {}) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token') ?? ''}`
    axiosApi.defaults.headers.common["Content-Type"] = "application/json"
    return axiosApi
        .post(url, data, {...config})
        .then(response => response.data)
}

export async function postForm(url, data, config = {}) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token') ?? ''}`
    axiosApi.defaults.headers.common["Content-Type"] = "multipart/form-data"
    let form = new FormData()
    for (let key in data) {
        form.append(key, data[key])
    }
    return axiosApi
        .post(url, form, {...config})
        .then(response => response.data)
}

export async function put(url, data, config = {}) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token') ?? ''}`
    return axiosApi
        .put(url, {...data}, {...config})
        .then(response => response.data)
}

export async function del(url, data, config = {}) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token') ?? ''}`
    return await axiosApi
        .delete(url, {...config, params: data})
        .then(response => response.data)
}

// export async function postFile(url, data, config = {}) {
//   console.log(data)
//   axiosApi.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token') ?? ''
//     }`;
//   axiosApi.defaults.headers.common['Content-Type'] = 'multipart/form-data';

//   let form = new FormData();
//   console.log(form)
//   for (let key in data) {

//     const image_name = 'image-0';
//     const fileBlob = new Blob([file], { type: file.type });
//     fileBlob.name = image_name;
//     form.append(key, data[key], image_name);

//   }
//   return axiosApi.post(url, form, { ...config }).then((response) => response.data);
// }


export async function postFile(url, data, config = {}) {
  axiosApi.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token') ?? ''}`;
  axiosApi.defaults.headers.common['Content-Type'] = 'multipart/form-data';

  let form = new FormData();

  for (let key in data) {
    let file = data[key];
    const image_name = 'image-0';
    const fileBlob = new Blob([file], { type: file.type });
    fileBlob.name = image_name;
    form.append(key, fileBlob, image_name); // Append the Blob object, not the file itself
  }

  return axiosApi.post(url, form, { ...config }).then((response) => response.data);
}

