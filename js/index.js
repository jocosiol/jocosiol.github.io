fetch("https://api.github.com/users/jocosiol")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.avatar_url);
    document.getElementById("profilePicture").src = data.avatar_url;
  });
