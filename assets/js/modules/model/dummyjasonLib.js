
//Module for fetch commands for different endpoints of https://dummyjson.com

/*documentation --------------------------------------------------------------------

All functions ar e async so must be called as follows when imported:

getUserById('1').then((myUser)=>{
    console.log(myUser);
    // do stuff with returned data
});

----------------------------------------------------------
getAllUsers(myLimit,mySkip) 
myLimit integer limmits returned users. 
mySkip integer skips forward from 0
eks limmit=20 and skip=20 users from 21 to 41
returns an array with selected user data objects.
if error no return and error in log
----------------------------------------------------------

----------------------------------------------------------
getUserById(myId)
myId a string or integer representing user id in API 
returns selected user as a data object.
if error no return and error in log
----------------------------------------------------------

----------------------------------------------------------
getAllProducts(myLimit,mySkip) 
myLimit integer limmits returned users. 
mySkip integer skips forward from 0
eks limmit=20 and skip=20 users from 21 to 41
returns an array with selected product data objects.
if error no return and error in log
----------------------------------------------------------


----------------------------------------------------------
getProductCategories() 

returns an array with all categories as strings.
if error no return and error in log
----------------------------------------------------------
getProductsByCategory

----------------------------------------------------------
getProductsByCategory(category) 
category: string name of category to get. 
returns an array with selected product data objects.
if error no return and error in log
----------------------------------------------------------

----------------------------------------------------------
getProductById(id)
myId a string or integer representing product id in API 
returns selected product as a data object.
if error no return and error in log
----------------------------------------------------------


----------------------------------------------------------
getAllProducts(myLimit,mySkip) 
myLimit integer limmits returned users. 
mySkip integer skips forward from 0
eks limmit=20 and skip=20 products from 21 to 41
returns an array with selected products data objects.
if error no return and error in log
----------------------------------------------------------


*/

/* API endpoints */
let apiUserEndpoint='https://dummyjson.com/users';
let apiProductEndpoint='https://dummyjson.com/products';



// User functions -------------------------------------------------------------------
export  function getAllUsers(myLimit,mySkip){

    let apiUrl =`${apiUserEndpoint}?limit=${myLimit}&skip=${mySkip}`;
    return fetch(apiUrl)
    .then((response) => {
     
        // error checking
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      return response.json(); // Parse the response body as JSON
    })
  
    .then((data) => {
      // send data on to view functions
      return data.users;
    })
  
    .catch((error) => {
      console.error("Error:", error);
    });
}


export  function getUserById(myId){

  let apiUrl =`${apiUserEndpoint}/${myId}`;
  
  return fetch(apiUrl)
  .then((response) => {
   
      // error checking
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    return response.json(); // Parse the response body as JSON
  })

  .then((data) => {
    // send data on to view functions
    return data;
  })

  .catch((error) => {
    console.error("Error:", error);
  });
}

// product functions -------------------------------------------------------------------
export  function getAllProducts(myLimit,mySkip){

  let apiUrl =`${apiProductEndpoint}?limit=${myLimit}&skip=${mySkip}`;
  return fetch(apiUrl)
  .then((response) => {
   
      // error checking
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    return response.json(); // Parse the response body as JSON
  })

  .then((data) => {
    // send data on to view functions
    return data.products;
  })

  .catch((error) => {
    console.error("Error:", error);
  });
}


export  function getProductCategories(){

  let apiUrl =`${apiProductEndpoint}/categories`;
  return fetch(apiUrl)
  .then((response) => {
   
      // error checking
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    return response.json(); // Parse the response body as JSON
  })

  .then((data) => {
    // send data on to view functions
    return data;
  })

  .catch((error) => {
    console.error("Error:", error);
  });
}





export  function getProductsByCategory(category){

  let apiUrl =`${apiProductEndpoint}/category/${category}?limit=0`;
  return fetch(apiUrl)
  .then((response) => {
   
      // error checking
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    return response.json(); // Parse the response body as JSON
  })

  .then((data) => {
    // send data on to view functions
    return data.products;
  })

  .catch((error) => {
    console.error("Error:", error);
  });
}


export  function getProductById(id){

  let apiUrl =`${apiProductEndpoint}/${id}`;
  return fetch(apiUrl)
  .then((response) => {
   
      // error checking
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    return response.json(); // Parse the response body as JSON
  })

  .then((data) => {
    // send data on to view functions
    return data;
  })

  .catch((error) => {
    console.error("Error:", error);
  });
}


// cart functions -------------------------------------------------------------------
// post functions -------------------------------------------------------------------

