var contents = [];
$('#dynamicsite').hide();
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
var docs = document.querySelectorAll('.point');
docs.forEach(doc => {
    doc.innerHTML = "☉ "+doc.innerHTML;
});

function Search(e) {

}