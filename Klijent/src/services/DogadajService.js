import http from "../http-common";

class DogadajDataService {
  getAll() {
    return http.get("/dogadaji");
  }

  get(id) {
    return http.get(`/dogadaji/${id}`);
  }

  create(data) {
    return http.post("/dogadaji", data);
  }

  update(id, data) {
    return http.put(`/dogadaji/${id}`, data);
  }

  delete(id) {
    return http.delete(`/dogadaji/${id}`);
  }

  deleteAll() {
    return http.delete(`/dogadaji`);
  }

  findByTitle(title) {
    return http.get(`/dogadaji?title=${title}`);
  }
}

export default new DogadajDataService();