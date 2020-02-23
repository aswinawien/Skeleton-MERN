const signIn = user => {
  return fetch("/auth/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(user)
  })
    .then(res => {
      return res.json();
    })
    .catch(e => console.log(e));
};

const signOut = () => {
  return fetch("/auth/signout", {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(e => console.log(e));
};

export { signIn, signOut };
