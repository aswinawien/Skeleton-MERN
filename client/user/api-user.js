const create = user => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      return res.json();
    })
    .catch(e => console.log(e));
};

const list = () => {
  return fetch("/api/users", {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(e => console.log(e));
};

const read = (params, credentials) => {
  console.log("params", params);
  console.log("credentials", credentials);
  return fetch("/api/user/" + params.userId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(e => {
      console.log("error", e);
    });
};

const update = (params, credentials, user) => {
  return fetch("/api/user/" + params.userId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      return res.json();
    })
    .catch(e => {
      return e;
    });
};

const remove = (params, credentials) => {
  return fetch("/api/user/" + params.userId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(e => {
      return e;
    });
};

export { create, list, read, update, remove };
