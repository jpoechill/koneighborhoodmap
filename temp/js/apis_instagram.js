// Javascript for Cat Clicker App

$.ajax({
  type: "GET",
  dataType: "jsonp",
  url: "https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=1244075344.38e8ba6.1000eab9f2674dd28f3981c3a0b585d9",
  success: function(data) {
    console.log(data);
  }
});

// https://instagram.com/oauth/authorize/?client_id=38e8ba69bfb04b029a7266db0192244f&redirect_uri=http://jpoechill.github.io&response_type=token
// https://api.instagram.com/oauth/authorize/?client_id=38e8ba69bfb04b029a7266db0192244f&redirect_uri=http://jpoechill.github.io&response_type=code

// 1244075344.38e8ba6.1000eab9f2674dd28f3981c3a0b585d9

// Works:
// https://api.instagram.com/v1/users/self/?access_token=1244075344.38e8ba6.1000eab9f2674dd28f3981c3a0b585d9&


// https://api.instagram.com/v1/tags/houses?access_token=1244075344.38e8ba6.1000eab9f2674dd28f3981c3a0b585d9&scope=scope=basic+likes+comments+relationships

// https://api.instagram.com/oauth/authorize/?client_id=38e8ba69bfb04b029a7266db0192244f&redirect_uri=http://jpoechill.github.io&response_type=code&scope=public_content

// https://api.instagram.com/v1/media/search?lat=48&lng=2&distance=1000&access_token=1244075344.38e8ba6.1000eab9f2674dd28f3981c3a0b585d9

// https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=1244075344.38e8ba6.1000eab9f2674dd28f3981c3a0b585d9

https://api.instagram.com/oauth/authorize/?client_id=38e8ba69bfb04b029a7266db0192244f&redirect_uri=http://jpoechill.github.io&response_type=code&scope=basic+comments+follower_list+likes+relationships+public_content

