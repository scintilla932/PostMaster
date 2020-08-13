console.log('This is Project 6. Postman clone');

//Utility functions
//1. To get DOM element from string
function getElementFromString(string) {
  let div = document.createElement('div');
  div.innerHTML = string;
  return div.firstElementChild;
}

//Initialize no of parameters
let addedParamCount = 0;

//Hide the parameters bo initially.
let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none';

// If the user clicks on params box hide JSON box.
paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click', ()=>{
  document.getElementById('requestJsonBox').style.display = 'none';
  document.getElementById('parametersBox').style.display = 'block';

})

// If the user clicks on JSON box hide params box.
jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', ()=>{
  document.getElementById('requestJsonBox').style.display = 'block';
  document.getElementById('parametersBox').style.display = 'none';
})

// If the user clicks on + button add more parameters
let addParams = document.getElementById('addParams');
addParams.addEventListener('click', ()=>{
  let params = document.getElementById('params');
  let string = `<div class="form-row my-2">
                  <label for="params" class="col-sm-2 col-form-label" >Parameter ${addedParamCount + 2}</label>
                  <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                  </div>
                  <div class="col-md-4">
                    <input type="text" class="form-control"  id="parameterValue${addedParamCount + 2}" placeholder="Enter Value ${addedParamCount + 2} Key">
                  </div>
                  <button class="btn btn-primary deleteParam">-</button>
                </div>`;
  //Convert the element string to DOM node
  let paramElement = getElementFromString(string);
  // console.log(paramElement);
  params.appendChild(paramElement)
  addedParamCount ++;
  //Add an event listner to remove parameter on clicking - button
  let deleteParam = document.getElementsByClassName('deleteParam');
  for(item of deleteParam){
    item.addEventListener('click', (e)=>{
      //TODO: Add a confirmation box
      e.target.parentElement.remove();
    })
  }
})

// If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
  // Show please wait in the response box to request from the user.
  // document.getElementById('responseJsonText').value = 'Please wait.. Fetching Response....';
  document.getElementById('responsePrism').value = 'Please wait.. Fetching Response....';

  // Fetch all the values user has entered
  let url = document.getElementById('url').value;
  let requestType = document.querySelector("input[name='requestType']:checked").value;
  let contentType = document.querySelector("input[name='contentType']:checked").value;


  // If user has selected Params option collect all the parameters as an object.
  if(contentType == 'params'){
    data = {};
    for(i=0;i<addedParamCount+1;i++){
      if(document.getElementById('parameterKey'+(i+1)) != undefined){
        let key = document.getElementById('parameterKey'+(i+1)).value
        let value = document.getElementById('parameterValue'+(i+1)).value
        data[key] = value;
      }
    }
    data =JSON.stringify(data);
  }
  else {
    data= document.getElementById('requestJsonText').value;
  }

  // Log all the values in console for debugging.
  console.log("Url is", url);
  console.log("Request Type is", requestType);
  console.log("Content Type is", contentType);
  console.log(data);

  //If the request type is GET invoke fetch api to create a get request.
  if(requestType=='GET'){
    fetch(url, {
      method: 'GET',
    })
    .then(response=> response.text())
    .then((text) => {
      // document.getElementById('responseJsonText').value = text;
      document.getElementById('responsePrism').innerHTML = text;
      Prism.highlightAll();
    });
  } 

  //If the request type is POST invoke fetch api to create a post request.
  else{
    fetch(url, {
      method: 'POST',
      body: data,
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response=> response.text())
    .then((text) => {
      // document.getElementById('responseJsonText').value = text;
      document.getElementById('responsePrism').innerHTML = text;
      Prism.highlightAll();
    });
  }

})
