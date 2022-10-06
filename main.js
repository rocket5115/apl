var contents = [];
$('#dynamicsite').hide();
var search = [];
const HideContent = e => {
    $('#incontainer').hide();
}
const ShowContent = e => {
    $('#incontainer').show();
}
var lastsite = "";
document.addEventListener('keydown', e => {
    if(lastsite!=""&&e.key=='Escape'){
        lastsite="";
        document.getElementById('dynamicsite').innerHTML = '';
        ShowContent();
    };
});
function changeSite(e) {
    if(typeof(e)=='object'&& e.target.id!=""){
        HideContent();
        document.getElementById('dynamicsite').innerHTML=contents[e.target.id]
        $('#dynamicsite').show();
        lastsite=e.target.id
    } else if(typeof(e)!='object') {
        HideContent();
        document.getElementById('dynamicsite').innerHTML=contents[e]
        $('#dynamicsite').show();
        lastsite=e
    }
}
var hg=[];

var docs = document.querySelectorAll('.section');
docs.forEach(doc => {
    hg[doc.firstElementChild.textContent]=doc.id;
    $('#la').append(`<div onclick="GoTo('${doc.firstElementChild.textContent}')" class="hg">*${doc.firstElementChild.textContent}</div>`)
});

function GoTo(e) {
    document.getElementById(hg[e]).scrollIntoView(true);
};

var docs = document.querySelectorAll('.point');
docs.forEach(doc => {
    doc.innerHTML = "☉ "+doc.innerHTML;
});

var docs = document.querySelectorAll('.text');
docs.forEach(doc => {
    search[search.length]={parent:doc.parentNode,data:doc.textContent};
});

function Search(e) {
    let doc = document.getElementById('search');
    if(doc.value!=""){
        for(var i=0;i<search.length;i++){
            if(search[i].data.match(doc.value)){
                search[i].parent.scrollIntoView(true)
                break
            };
            console.log(doc.value)
        };
    };
}