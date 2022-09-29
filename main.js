$(function(){
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
    const changeSite = e => {HideContent();document.getElementById('dynamicsite').innerHTML=document.getElementById(e.target.id).innerHTML;$('#dynamicsite').show();lastsite=e.target.id}
    let docs = document.querySelectorAll('.section');
    docs.forEach(doc => {
        doc.addEventListener('click', changeSite);
    });
})