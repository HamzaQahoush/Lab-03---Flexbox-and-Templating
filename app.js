'use strict';
let imgArr=[];
let findArr = [];
let arrayData=[];

function ShowPhoto (images){
  this.image_url=images.image_url;
  this.title=images.title;
  this.description=images.description;
  this.keyword=images.keyword;
  this.horns=images.horns;
  findArr.push(this.keyword);
  imgArr.push(this);
}

//render function;
ShowPhoto.prototype.renderObj=function(){

  let template = $('#mustache-template').html();
  let mergedTemplate=Mustache.render(template,this);
  return mergedTemplate;
};


function getInfo(arr) {


  for (let i = 0; i < arr.length; i++) {
    if (arrayData.indexOf(arr[i]) === -1) {
      arrayData.push(arr[i]);
    }
  }

}


function selection(){
  $('select').append('<option value= "all" id= "option"> Keywords Search</option>');

  for (let i=0 ; i<arrayData.length;i++){
    let option = $('#option').clone();
    $('select').append(option);
    option.html(arrayData[i]);
    option.removeAttr('id');
    option.attr('value' , arrayData[i]);

  }

  $('#select').on('change', function () {
    $('div').css({ 'display': 'none' });

    $(`.${this.value}`).css({ 'display': 'inline-block' });
  });
}


ShowPhoto.getJson1 = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('data/page-1.json', ajaxSettings).then((data) => {



    data.forEach((element) => {
      let horn = new ShowPhoto (element);
      $('#Items').append(horn.renderObj());
    });
    getInfo(findArr);
    selection();
  });

};

ShowPhoto.getJson2 = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('data/page-2.json', ajaxSettings).then((data) => {


    data.forEach((element) => {
      let horn = new ShowPhoto(element);
      $('#Items').append(horn.renderObj());
    });
    getInfo(findArr);
    selection();
  });

};



$(() => ShowPhoto.getJson1());

function page1() {
  $('.all').remove();
  findArr = [];
  arrayData = [];
  $('option').remove();
  ShowPhoto.getJson1();
}

function page2() {
  $('.all').remove();
  findArr= [];
  arrayData = [];
  $('option').remove();
  ShowPhoto.getJson2();
}
