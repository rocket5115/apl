var contents = [];
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
var docs = document.querySelectorAll('.section');
docs.forEach(doc => {
    doc.addEventListener('click', changeSite);
    let start=doc.firstElementChild.innerHTML;
    let desc=doc.getElementsByTagName('div')[1].innerHTML;
    let temp=`<p class="stitle" onclick="changeSite('${doc.id}')">${start}</p><p class="stext" onclick="changeSite('${doc.id}')">${desc.substring(0,232)+"..."}</p>`
    contents[doc.id]=doc.innerHTML;
    doc.innerHTML = temp+doc.innerHTML;
});
